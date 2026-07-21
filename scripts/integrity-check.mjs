#!/usr/bin/env node
/**
 * HeavyHiker integrity check — runs before every build (npm run build) and in CI.
 * The build FAILS if any rule below is violated. Agents: these rules are
 * non-negotiable and may never be weakened (see agents/05-meta.md hard limits).
 *
 * Rules enforced here (from the site's §5 integrity rules):
 *  1. No fabricated first-hand experience in article content.
 *  2. Affiliate disclosure present in every template that renders products,
 *     and <AffiliateLink> carries rel="sponsored nofollow noopener".
 *  3. No invented specs: commercial articles must reference an existing
 *     research doc; null weights are legal, guessed strings are not.
 *  4. No fake urgency/scarcity language anywhere in content or pages.
 *  5. No hardcoded dollar amounts in article bodies (price bands only).
 *  +  No duplicate primaryKeyword across published articles.
 *  +  Every product affiliateUrl resolves to a registry key; no raw
 *     merchant/affiliate hrefs in article bodies.
 */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import matter from 'gray-matter';

const ROOT = process.cwd();
const errors = [];
const warnings = [];

const fail = (file, rule, msg) => errors.push(`✗ [${rule}] ${file}: ${msg}`);
const warn = (file, msg) => warnings.push(`⚠ ${file}: ${msg}`);

function walk(dir, ext) {
  if (!existsSync(dir)) return [];
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p, ext));
    else if (ext.some((e) => name.endsWith(e))) out.push(p);
  }
  return out;
}

/* ---------------- rule definitions ---------------- */

// Rule 1 — fabricated first-hand experience (article content only)
const FABRICATED_EXPERIENCE = [
  /\bwe(?:'ve| have)? tested\b/i,
  /\bwe test(?:ed)? (?:it|this|them|these|each)\b/i,
  /\bin our test(?:s|ing)?\b/i,
  /\bour (?:own )?testing\b/i,
  /\bwe (?:personally )?used\b/i,
  /\bI (?:personally )?used\b/i,
  /\bafter \d[\d,]* miles\b/i,
  /\bwe wore\b/i,
  /\bwe carried\b/i,
  /\bwe took (?:it|them|this|these) (?:out|on|into)\b/i,
  /\bour testers?\b/i,
  /\bhands-on (?:test|review)/i,
  /\bwe field-?tested\b/i,
  /\bput (?:it|them|this) through its paces\b/i,
];

// BRAND.md banned hype words (content + pages)
const HYPE = [
  /\bgame[- ]chang(?:er|ing)\b/i,
  /\bmust-have\b/i,
  /\brevolutionary\b/i,
  /\bultimate\b/i,
  /\bepic\b/i,
  /\binsane(?:ly)?\b/i,
  /\bunbeatable\b/i,
  /\bbest-in-class\b/i,
  /\bworld-class\b/i,
  /\bcutting-edge\b/i,
  /\bnext-level\b/i,
  /\btop-notch\b/i,
];

// Rule 4 — fake urgency/scarcity (content + pages)
const URGENCY = [
  /\blimited time\b/i,
  /\bact now\b/i,
  /\bselling fast\b/i,
  /\bonly \d+ left\b/i,
  /\bwhile supplies last\b/i,
  /\bdon'?t miss out\b/i,
  /\bhurry\b/i,
  /\border (?:now|today) before\b/i,
];

// raw merchant/affiliate hrefs never belong in article bodies (registry only)
const RAW_MERCHANT_LINK = [
  /\]\(https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.to|rei\.com|backcountry\.com|avantlink\.com|shareasale\.com|awin1\.com)/i,
  /href=["']https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|amzn\.to|rei\.com|backcountry\.com|avantlink\.com|shareasale\.com|awin1\.com)/i,
];

const scanPatterns = (file, text, patterns, rule, label) => {
  for (const re of patterns) {
    const m = text.match(re);
    if (m) fail(file, rule, `${label}: "${m[0]}"`);
  }
};

/* ---------------- load registry ---------------- */

const registryPath = join(ROOT, 'src/data/affiliate-links.json');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const registryKeys = new Set(Object.keys(registry.links ?? {}));

for (const [key, entry] of Object.entries(registry.links ?? {})) {
  if (entry.url === 'PENDING_AFFILIATE_ID') {
    if (!entry.fallbackUrl) fail('src/data/affiliate-links.json', 'registry', `"${key}" is PENDING with no fallbackUrl`);
    else warn('src/data/affiliate-links.json', `"${key}" awaiting real affiliate link (PENDING_AFFILIATE_ID)`);
  }
}

/* ---------------- scan articles ---------------- */

const articleFiles = walk(join(ROOT, 'src/content/articles'), ['.mdx', '.md']);
const keywordOwners = new Map();

for (const file of articleFiles) {
  const rel = relative(ROOT, file);
  const raw = readFileSync(file, 'utf8');
  const { data, content } = matter(raw);

  scanPatterns(rel, content, FABRICATED_EXPERIENCE, 'rule-1', 'fabricated first-hand experience');
  scanPatterns(rel, content, HYPE, 'brand', 'banned hype word');
  scanPatterns(rel, content, URGENCY, 'rule-4', 'fake urgency/scarcity');
  scanPatterns(rel, content, RAW_MERCHANT_LINK, 'rule-6', 'raw merchant/affiliate href (must route through AffiliateLink + registry)');

  // Rule 5 — hardcoded dollar figures in body copy
  const dollar = content.match(/\$\s?\d[\d,.]*/);
  if (dollar) fail(rel, 'rule-5', `hardcoded price "${dollar[0]}" — use price bands ($/$$/$$$)`);

  // duplicate primaryKeyword
  if (data.primaryKeyword) {
    const kw = String(data.primaryKeyword).toLowerCase().trim();
    if (!data.draft) {
      if (keywordOwners.has(kw)) fail(rel, 'seo', `primaryKeyword "${kw}" already used by ${keywordOwners.get(kw)}`);
      else keywordOwners.set(kw, rel);
    }
  } else {
    fail(rel, 'schema', 'missing primaryKeyword');
  }

  // products: registry membership + no guessed specs
  for (const p of data.products ?? []) {
    if (!registryKeys.has(p.affiliateUrl)) {
      fail(rel, 'rule-6', `product "${p.name}" affiliateUrl "${p.affiliateUrl}" not in affiliate-links.json registry`);
    }
    if (typeof p.weightOz === 'string') {
      fail(rel, 'rule-3', `product "${p.name}" weightOz is a string — unknown weights must be null (renders "not published")`);
    }
  }

  // Rule 3 — commercial content must trace to a research doc that exists
  if (data.contentType !== 'guide') {
    if (!data.researchDoc) fail(rel, 'rule-3', 'commercial article missing researchDoc reference');
    else if (!existsSync(join(ROOT, data.researchDoc))) fail(rel, 'rule-3', `researchDoc not found: ${data.researchDoc}`);
  }
}

/* ---------------- scan page/component templates ---------------- */

const pageFiles = walk(join(ROOT, 'src/pages'), ['.astro']);
for (const file of pageFiles) {
  const rel = relative(ROOT, file);
  const text = readFileSync(file, 'utf8');
  scanPatterns(rel, text, HYPE, 'brand', 'banned hype word');
  scanPatterns(rel, text, URGENCY, 'rule-4', 'fake urgency/scarcity');
}

// Rule 2 — disclosure must be wired into every template that renders products
const mustDisclose = [
  'src/layouts/ArticleLayout.astro',
  'src/pages/gear/[category]/index.astro',
];
for (const rel of mustDisclose) {
  const p = join(ROOT, rel);
  if (!existsSync(p)) {
    fail(rel, 'rule-2', 'expected template missing');
    continue;
  }
  if (!readFileSync(p, 'utf8').includes('AffiliateDisclosure')) {
    fail(rel, 'rule-2', 'template renders products but does not include <AffiliateDisclosure>');
  }
}

// Rule 2/6 — AffiliateLink must hard-code the required rel and new-tab behavior
const affLink = join(ROOT, 'src/components/AffiliateLink.astro');
const affText = readFileSync(affLink, 'utf8');
if (!/rel=["']sponsored nofollow noopener["']/.test(affText)) {
  fail('src/components/AffiliateLink.astro', 'rule-6', 'missing rel="sponsored nofollow noopener"');
}
if (!/target=["']_blank["']/.test(affText)) {
  fail('src/components/AffiliateLink.astro', 'rule-6', 'affiliate links must open in a new tab');
}
if (!/resolveAffiliate|affiliate-links\.json/.test(affText)) {
  fail('src/components/AffiliateLink.astro', 'rule-6', 'must resolve URLs via the central registry');
}

// Rule 3 — comparison table must render null weights as "not published"
const table = readFileSync(join(ROOT, 'src/components/ComparisonTable.astro'), 'utf8');
if (!table.includes('not published')) {
  fail('src/components/ComparisonTable.astro', 'rule-3', 'null specs must render as "not published"');
}

/* ---------------- report ---------------- */

for (const w of warnings) console.warn(w);
if (errors.length > 0) {
  console.error(`\nIntegrity check FAILED — ${errors.length} violation(s):\n`);
  for (const e of errors) console.error(e);
  process.exit(1);
}
console.log(`\n✓ Integrity check passed (${articleFiles.length} articles, ${registryKeys.size} registry links, ${warnings.length} warnings)`);
