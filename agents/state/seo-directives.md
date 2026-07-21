# SEO Directives — read by 02-writer on every run

Owned by **04-seo** (05-meta may also edit). 02-writer treats every directive here as binding
unless it conflicts with `scripts/integrity-check.mjs` rules or the schema — integrity always
wins, and a conflicting directive should be flagged in the run log, not obeyed.

## Canonical roundup structure (the tried-and-true affiliate pattern — see learnings.md L-001…L-006)

Render order (layout handles 1–3 and 8–10 automatically from frontmatter; the writer supplies
4–7 in the MDX body):

1. Title + meta line + affiliate disclosure (above the fold)
2. Jump-link table of contents (JumpNav — automatic)
3. **Verdict box** (top pick / budget pick / lightweight pick) + sortable spec table
   (`verdictPosition: top` unless an experiment says otherwise)
4. Intro: primary keyword and the direct answer within the first 100 words; who this
   comparison is for
5. Per-product `<ProductSection>` blocks — image renders automatically from the registry;
   narrative names the trade-off
6. `<Methodology>` (how we picked, with this article's actual criteria)
7. "How to choose" H2 with buying advice + internal links; closing sourcing caveat
8. **The competition** — `alsoConsidered` frontmatter, from the brief's excluded products
9. FAQ (people-also-ask phrasing, 3–5 questions)
10. Related articles

## Current directives

1. **Title pattern:** Lead with "Best {product type}"; include head-to-head names ("X vs Y")
   when natural; ≤ 60 chars where possible.
2. **Meta description:** 140–165 chars, primary keyword once, states the honest angle.
3. **Answer-first intro:** the first paragraph must contain a direct, quotable answer to the
   title's question — for readers AND for AI assistants extracting passages (see 06-ai-search).
4. **FAQ:** 3–5 questions in people-also-ask phrasing, answers 40–80 words.
5. **Internal links:** 3–5 per article; guides link INTO money pages; roundups link nearest
   category-mates + relevant guides.
6. **Word count:** roundups 1,400–2,200; guides 1,000–1,800.
7. **Keyword:** in title, H1, first 100 words, exactly one H2, meta description; density < 1.5%.
8. **alsoConsidered:** 2–4 entries per roundup, from the brief's runners-up, each with an
   honest one-sentence exclusion reason.
9. **CTA discipline:** one CTA per product section + the verdict box. No extra inline
   affiliate links in prose (L-005).
10. **Before writing anything, read `learnings.md`** and scan `decision-log.md` for prior
    decisions about this category or article type.

## Directive changelog

| Date | Directive | Change | Evidence |
|---|---|---|---|
| 2026-07-21 | 1–7 | Seeded at launch | launch spec defaults |
| 2026-07-21 | structure, 3, 8–10 | Canonical roundup structure codified; answer-first intro; competition block; CTA discipline; learnings-first workflow | learnings.md L-001…L-006 (external priors, to be validated by our own experiments) |
