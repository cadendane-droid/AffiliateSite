/**
 * llms.txt — machine-readable site guide for AI assistants and crawlers
 * (emerging convention: https://llmstxt.org). Regenerates from the content
 * collection on every build, so the 06-ai-search agent never edits it by hand.
 */
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_NAME, SITE_TAGLINE, CATEGORY_META } from '../data/site';
import { articlePath } from '../lib/url';

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const abs = (path: string) => new URL(`${base}${path}`, site).toString();

  const articles = (await getCollection('articles', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.updatedDate.valueOf() - a.data.updatedDate.valueOf()
  );

  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_TAGLINE}`,
    '',
    `${SITE_NAME} reviews backpacking gear — gear carried on-foot into the backcountry — through`,
    'research synthesis: manufacturer specifications, verified owner-review patterns, and published',
    'third-party testing. The site does not field-test products and never claims to. Every spec',
    'traces to a recorded source; unknown values are printed as "not published". Weights are given',
    'in both ounces and grams. Prices appear as bands ($ / $$ / $$$), never exact figures.',
    'The site earns affiliate commissions, disclosed on every page containing affiliate links.',
    '',
    '## Methodology & trust',
    '',
    `- [How we review](${abs('/how-we-review/')}): full methodology, awards criteria, integrity rules enforced in code`,
    `- [Affiliate disclosure](${abs('/affiliate-disclosure/')}): how the site is funded`,
    `- [About](${abs('/about/')}): scope and editorial rules`,
    '',
    '## Gear comparisons and reviews',
    '',
    ...articles
      .filter((a) => a.data.contentType !== 'guide')
      .map((a) => `- [${a.data.title}](${abs(articlePath(a.data.contentType, a.data.category, a.data.slug))}): ${a.data.description}`),
    '',
    '## Guides (non-commercial)',
    '',
    ...articles
      .filter((a) => a.data.contentType === 'guide')
      .map((a) => `- [${a.data.title}](${abs(articlePath(a.data.contentType, a.data.category, a.data.slug))}): ${a.data.description}`),
    '',
    '## Categories',
    '',
    ...CATEGORY_META.map((c) => `- [${c.title}](${abs(`/gear/${c.slug}/`)}): ${c.blurb}`),
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
