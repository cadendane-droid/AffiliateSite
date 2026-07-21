# Learnings Repository — what works, with evidence

Shared knowledge base for all agents. **02-writer reads this before every draft; 04-seo appends
settled experiment outcomes; 05-meta and 04-seo append externally researched best practices
(with sources).** Each entry is a reusable rule, not a diary. When our own experiment data
contradicts an external best practice, our data wins — update the entry, don't delete it
(strike it through and note the evidence).

Entry format: `L-NNN · <rule> · Evidence: <internal experiment id | external source> · Status: adopted | testing | rejected`

## Article structure (external priors from top-performing affiliate reviewers — Wirecutter, OutdoorGearLab, NYT-style commerce content; verify against our own data as it accumulates)

- **L-001** · Answer first: the verdict (top pick / budget / lightweight) must be visible without scrolling. Readers arriving from "best X" queries want the answer, then the justification. · Evidence: universal pattern across Wirecutter/OGL-class sites; our verdict box + `verdictPosition: top` default. · Status: adopted (A/B-able via `verdictPosition`)
- **L-002** · Jump-link table of contents near the top increases engagement on long comparisons and earns sitelink-style SERP features. · Evidence: standard on top commerce content; implemented as JumpNav. · Status: adopted
- **L-003** · "How we picked" + "The competition (what we cut and why)" blocks build trust and capture long-tail queries for excluded products. · Evidence: Wirecutter's signature blocks; our Methodology + AlsoConsidered components. · Status: adopted
- **L-004** · FAQ written in people-also-ask phrasing wins featured snippets and AI-assistant citations. · Evidence: widely documented SERP behavior; FAQPage JSON-LD emitted. · Status: adopted
- **L-005** · CTA density: one CTA per product section + verdict box outperforms link-stuffing; excessive links depress per-link CTR and read as spam. · Evidence: external affiliate-marketing consensus; needs internal confirmation. · Status: testing
- **L-006** · Product images near the CTA lift click-through vs text-only sections. · Evidence: external consensus; only verified images allowed (see D-002). · Status: testing

## Tone & voice

- **L-007** · Plainspoken, trade-off-naming copy converts better with enthusiast audiences than hype; "what you give up" sections increase trust-to-click. · Evidence: brand thesis + external pattern (enthusiast forums punish hype); confirm with time-on-page + CTR. · Status: testing

## Measurement constraints (read before designing experiments)

- **L-008** · This is a static site with no per-user bucketing: experiments are pre/post on one article (time comparison) or matched-cohort across similar articles — never call them randomized. Minimum sample before judging: 200 article_views per arm. · Evidence: architecture. · Status: adopted
- **L-009** · AI crawlers don't execute JS, so PostHog cannot see crawler visits on GitHub Pages. The measurable AEO signal is **referral traffic from assistant domains** (chatgpt.com, perplexity.ai, claude.ai, gemini.google.com, copilot.microsoft.com) — tracked on the "HeavyHiker · AI Search" dashboard. Crawler-level visibility requires a CDN/proxy with logs (add Cloudflare when the custom domain lands). · Evidence: architecture. · Status: adopted
