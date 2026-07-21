# Decision Log — every bot decision that changes the site

**Append-only. Every agent writes here; every agent reads here.** Any decision that changes what
readers or crawlers see — a new article's angle, an experiment, an instruction edit, an image
choice, an AEO change — gets an entry BEFORE the change ships, with the desired result stated as
something measurable. Past entries are input to future decisions: before deciding anything,
scan this log for similar past decisions and their actual outcomes. An undocumented change is a
protocol violation and gets reverted.

## Entry format

```
## YYYY-MM-DD · <agent> · <run-id> · D-NNN
- **Decision:** what was changed/created, in one sentence
- **Why:** the evidence or reasoning (cite log entries, metrics, learnings.md items)
- **Desired result:** the measurable outcome this should produce, with a review-by date
- **Review (added later, by the deciding agent or 04-seo):** what actually happened; feed into learnings.md if generalizable
```

---

## 2026-07-21 · human+claude · seed-2026-07-21 · D-001
- **Decision:** Launched site as HeavyHiker with the proven affiliate roundup structure (jump nav, verdict box top, sortable spec table, per-product sections with images, how-we-picked, competition block, FAQ), nature-themed trail palette, and llms.txt + AI-crawler-welcoming robots.txt.
- **Why:** Structure mirrors the highest-performing affiliate reviewers (Wirecutter-style pattern documented in learnings.md L-001..L-006); AEO surface added because AI-assistant referrals are a growing acquisition channel.
- **Desired result:** Baseline established. First organic impressions within 4–8 weeks of affiliate IDs + indexing; verdict-box CTR measurable once traffic exists. Review by 2026-09-01.
- **Review:** pending

## 2026-07-21 · human+claude · seed-2026-07-21 · D-002
- **Decision:** Product images ship only when visually verified (2 of 9 at launch: Sawyer Squeeze, Soto WindMaster); the rest render an honest "photo pending" note until affiliate datafeeds supply licensed imagery.
- **Why:** og:image scraping returned brand logos and a wrong product (X-Mid Pro 1 on the X-Mid 2 page) — unverified images would put wrong products next to verified specs.
- **Desired result:** Zero wrong-product images ever published; image coverage → 100% as programs approve. Review at first datafeed access.
- **Review:** pending

## 2026-07-21 · 04-seo · 2026-07-21-seo · D-003
- **Decision:** First SEO run. Registered ZERO new experiments and evaluated zero (none active). Snapshot written to `metrics-snapshots/2026-07-21.json`.
- **Why:** Site was seeded today; 7-day window shows 2 total article_views (1 each on `best-ultralight-trekking-pole-tents`, `how-to-fit-a-backpack`), 0 affiliate_click, 0 email_signup — all classified `$virt_traffic_type=Regular`, i.e. launch-day QA, not organic demand. Every article is far below the L-008 floor (≥200 article_views/arm before any pre/post judgement). Registering an experiment now would require a degenerate baseline (0 clicks / ~1 view) that cannot be honestly compared later — that is exactly the fabricated-metric failure L-008 and the anti-force-output doctrine forbid. No page has ≥2 weeks of history, so no "decaying page" content-refresh target exists either.
- **Desired result:** Experiments begin only once at least one article accrues ≥200 article_views in a 7-day window. Until then, daily snapshots accumulate the pre-experiment baseline. Review by 2026-08-04, or sooner if any article crosses ~200 views.
- **Review:** pending
