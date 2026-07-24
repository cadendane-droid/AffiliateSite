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

## 2026-07-24 · 05-meta · 2026-07-24-meta · D-004
- **Decision:** First 05-meta run — made ZERO instruction changes and ZERO reverts.
- **Why:** (1) Regression tripwire cannot have fired — it requires regression across two consecutive meta runs, and this is the first meta run (agent-runs.log shows only seed + one 04-seo, both 2026-07-21; meta-audits/ empty). (2) No traffic signal exists to diagnose any content/gate/CTA pattern: snapshot `metrics-snapshots/2026-07-21.json` shows 2 article_views, 0 affiliate_click, launch-day QA — orders of magnitude below the L-008 200-view floor; `experiment-log.json` is empty (no win/loss history). Changing instructions on one launch day of QA traffic is exactly the "single bad day is noise" trap. (3) The only live problem — open issue #3 (`agent-blocked`): a session-wide egress denial where all WebFetch returns 403 (control host `example.com` re-confirmed 403 today, 2026-07-24) blocking `01-research` on 07-22 and 07-23 — is an **infrastructure fault, not an instruction defect.** No edit to 01–04/06 can restore WebFetch connectivity, and 01-research already behaved correctly under it (right cluster, right primary sources, correctly refused blog-blended WebSearch numbers per its integrity rule, logged BLOCKED, added to one issue instead of duplicating). The only conceivable instruction "fix" — loosening the primary-source requirement so research proceeds off WebSearch summaries — would weaken the "never copy a number from a blog" integrity rule (a hard-limit violation), so per the meta doctrine the diagnosis is wrong: the block is environmental. Issue #3 already escalates it to the human; a duplicate meta-review issue would be noise.
- **Desired result:** System integrity preserved with no premature tuning. Re-evaluate at the next meta run: if the egress block persists AND 01-research begins thrashing (repeated same-cluster re-selection burning runs), consider a short-circuit instruction ("on confirmed session-wide egress denial, verify the open agent-blocked issue and BLOCK without re-selecting"). Not warranted at 2 data points. Review 2026-07-31 (next meta run).
- **Review:** pending
