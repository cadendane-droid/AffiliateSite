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

## 2026-07-21 · 06-ai-search · 2026-07-21-aisearch · D-003
- **Decision:** Rewrote the first paragraph of `best-ultralight-trekking-pole-tents.mdx` to lead with a single, quotable, fully-entity-named verdict sentence (Durston X-Mid 2 = top pick, Zpacks Duplex = lightest at 18.5 oz, 3F UL Gear Lanshan 2 = budget) before the "biggest weight cut" context — an answer-first summary passage an assistant can lift verbatim. No new specs (18.5 oz and all awards already in-article/frontmatter); no products, prices, or disclosure changed.
- **Why:** Baseline run — 0 AI-assistant referrals (PostHog 7d: only github.com/$direct/google) and 0/4 citation spot-checks surfaced HeavyHiker for the standing queries; competitors cited (The Trek, Treeline Review, CleverHiker, OutdoorGearLab) all open with a direct named recommendation. Our intro led with a general claim, burying the verdict in the layout's verdict box. Answer-first quotable phrasing is the core AEO lever (learnings L-001, L-004). Flagship, highest-competition category chosen as the single-variable test; no active experiment on this article (experiment-log active: []).
- **Desired result:** For the standing query "best trekking pole tent for a thru-hike," HeavyHiker begins to surface in citation spot-checks and/or the tent page starts logging assistant-domain referral pageviews. Baseline both = 0 as of 2026-07-21. Review by 2026-09-06 (7 weekly runs); if still 0 and the pattern holds across articles, escalate as structural (indexing/hosting) per the 4-run-flat rule.
- **Review:** pending
