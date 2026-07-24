# Research brief — Backpacking headlamps (rechargeable & hybrid)

- **Date:** 2026-07-24
- **Agent run:** 2026-07-24-research
- **Cluster:** Backpacking headlamps (sub-100 g trail headlamps, different brands)
- **Category:** navigation-safety
- **Target article:** roundup — `/gear/navigation-safety/best-backpacking-headlamps/`
- **Primary keyword:** best backpacking headlamp
- **Status:** UNCONSUMED

> ⚠️ Sourcing caveat (degradation this run): direct fetch of manufacturer spec pages
> (blackdiamondequipment.com, nitecore.com, petzl.com) and rei.com returned HTTP 403 to the
> agent fetcher. Every spec below is the **manufacturer-published** figure as surfaced via
> domain-scoped web search of the manufacturer's own site (source URL recorded per row). Treat
> each numeric spec as **VERIFY at source** before the writer publishes it — re-open the recorded
> spec-page URL and confirm. Where manufacturer/secondary sources disagree, both values are printed
> as "conflicting" and NOT reconciled (numbers-sacred rule).

## Products & sourced claims

### Black Diamond Spot 400 (registry: `black-diamond-spot-400`)

| Claim | Value | Source |
|---|---|---|
| Max output | 400 lm (High); 200 lm (Med); 6 lm (Low) | blackdiamondequipment.com/products/spot-400-headlamp — VERIFY |
| Max beam distance | 100 m (High) | blackdiamondequipment.com/products/spot-400-headlamp — VERIFY |
| Weight | 86 g / 3.0 oz | blackdiamondequipment.com Spot 400 page (config: 3 AAA) — VERIFY |
| Power | Dual-Fuel: 3× AAA (included) **or** optional BD 1500 mAh Li-ion rechargeable | blackdiamondequipment.com Spot 400 page |
| Waterproof rating | IPX8 (per BD-domain listing) — **conflicting:** generic search summary reported IP67 | blackdiamondequipment.com (IPX8) vs general search (IP67) — VERIFY, do not reconcile |
| Max burn time | High 4 hrs / Med 8 hrs / Low 225 hrs | blackdiamondequipment.com Spot 400 page — VERIFY |
| PowerTap + brightness memory + digital lock | listed features | blackdiamondequipment.com Spot 400 page |

### Nitecore NU25 UL (registry: `nitecore-nu25-ul`)

| Claim | Value | Source |
|---|---|---|
| Max output | 400 lm | nitecore.com/product/nu25ul — VERIFY |
| Max beam distance | 132 m | nitecore.com/product/nu25ul — VERIFY |
| Weight | 45 g / 1.59 oz | nitecore.com/product/nu25ul — VERIFY (note: standard NU25 MCT is heavier, ~50 g — do not conflate variants) |
| Battery | Built-in Li-ion, **not user-replaceable**; USB-C recharge | nitecore.com/product/nu25ul |
| Battery capacity | **conflicting:** 650 mAh and 700 mAh both reported across Nitecore listings | nitecore.com / nitecorelights.com — VERIFY, do not reconcile |
| Waterproof rating | IP66 | nitecore.com/product/nu25ul — VERIFY |
| Runtime | ~2 hr 40 min (High); up to 45 hr (ultralow, manufacturer claim) | nitecore.com + CleverHiker/MightyGadget review — VERIFY, manufacturer claim not independently measured |

### Petzl Actik Core (registry: `petzl-actik-core`)

| Claim | Value | Source |
|---|---|---|
| Max output | **conflicting:** 600 lm (model name / prior spec) vs 625 lm (current Petzl/updated spec) | petzl.com/US/en/Sport/Headlamps/ACTIK-CORE (625) vs model-600 branding — VERIFY, do not reconcile |
| Weight | 88 g / 3.1 oz | petzl.com ACTIK CORE page + Switchback Travel ("3.1 oz") — VERIFY (config: with 3 AAA) |
| Power | HYBRID CONCEPT: CORE rechargeable battery **or** 3× AAA/LR03; ships with 3 AAA, not the CORE cell | petzl.com ACTIK CORE page + CleverHiker |
| CORE battery capacity | 1250 mAh | petzl.com CORE page — VERIFY |
| Charging | USB-C (on CORE battery) | petzl.com ACTIK CORE page |
| Waterproof rating | IPX4 (weather-resistant, not submersible) | petzl.com + Switchback Travel/CleverHiker (both state IPX4) |
| Max beam distance | not sourced this run (Petzl page 403; not surfaced cleanly) → record `not published` until VERIFY at source | petzl.com ACTIK CORE page — VERIFY |

### Category-level claims

| Claim | Source |
|---|---|
| Price band within cluster: Nitecore NU25 UL `$`, BD Spot 400 `$`–`$$`, Petzl Actik Core `$$` (Actik Core street price ≈ $10 above Spot 400) | current retailer listings + Switchback Travel comparison — VERIFY band at publish |
| Rechargeable Li-ion has displaced 3×AAA as the default; hybrid (AAA + rechargeable) is the fallback-friendly middle | The Trek / SectionHiker headlamp guides — recurring third-party pattern |
| Red-light mode preserves night vision / avoids waking tent-mates; a key backcountry buying factor | The Trek headlamp guide + owner-review pattern |
| Lockout mode prevents pack-drain from accidental activation | The Trek / manufacturer feature lists (BD digital lock; Nitecore/Petzl lock) |

## Pros / cons (patterns across owner reviews + published third-party testing)

### Black Diamond Spot 400
- **Pro — reliability & battery flexibility:** dual-fuel means you can swap AAAs anywhere; noted as a durable all-rounder. Evidence: Treeline Review Spot 400 test ("still humming along" after 10 nights / 5 alpine starts); The Trek (AZT 800-mi thru-hike, never replaced batteries).
- **Pro — genuinely waterproof + comfortable band:** Evidence: Switchback Travel / Treeline (fully waterproof, user-friendly headband).
- **Con — heaviest of the three at 86 g:** ounce-counters feel it vs the NU25 UL. Evidence: cross-review weight comparison (Switchback/Treeline).

### Nitecore NU25 UL
- **Pro — best-in-class weight-to-output (45 g, 400 lm):** repeatedly named the ultralight/thru-hiker default. Evidence: CleverHiker, The Trek, MightyGadget, Backpacking Light forum consensus.
- **Con — non-replaceable built-in battery:** dead battery on trail = dead headlamp (no AAA fallback). Evidence: recurring in reviews (MightyGadget, CleverHiker) and owner discussion.
- **Con — red-light too bright / not dimmable:** flagged for in-tent use. Evidence: MightyGadget review; echoed in owner threads.

### Petzl Actik Core
- **Pro — hybrid power (CORE cell or 3 AAA) + bright mixed beam:** flexible for long trips. Evidence: CleverHiker Actik Core review; Petzl HYBRID CONCEPT.
- **Con — only IPX4 (not fully waterproof):** falls short of Spot 400/NU25 UL water ratings. Evidence: Switchback Travel comparison ("IPX4 … falls short of fully waterproof competitors").
- **Con — heaviest + CORE battery sold separately:** 88 g and you pay extra for the rechargeable cell; ultralight hikers "look elsewhere." Evidence: Switchback Travel.

## People-also-ask questions (searcher intent)
1. How many lumens do I need for backpacking / thru-hiking? (source pattern: The Trek, SectionHiker — "300–600 lm covers most")
2. Rechargeable vs AAA headlamp — which is better for backpacking? (The Trek / SectionHiker guides)
3. Why does a red-light mode matter on a headlamp? (The Trek guide)
4. Is the Nitecore NU25 UL's built-in battery a dealbreaker on a thru-hike?
5. Is the Petzl Actik Core waterproof? (IPX4 vs IPX8 distinction)
6. How much does a good backpacking headlamp weigh? (45–88 g across this cluster)

## Also considered (excluded, with reasons — feeds the article's "competition" block)

| Product | Exclusion reason | Basis |
|---|---|---|
| Nitecore NU27 | Newer/brighter (~600 lm) but heavier and pricier than the NU25 UL; overlaps the same brand's ultralight pick | Treeline Review / CleverHiker 2026 roundups — VERIFY specs |
| Black Diamond Storm 500-R | Heavier, more feature-dense (IP67, brighter) than a minimalist backpacking pick needs | Switchback Travel — VERIFY specs |
| Petzl Swift RL | Reactive-lighting premium (`$$$`); overkill and over-budget for general backpacking | Switchback Travel — VERIFY specs |
| BioLite HeadLamp 425/800 | Low-profile comfort but heavier and mixed durability reports vs the three picks | CleverHiker / owner-review pattern — VERIFY |

## Cluster rationale (why this cluster won)
- **Three different brands, same product type, one category** ✔ (Black Diamond, Nitecore, Petzl — all headlamps, all `navigation-safety`).
- **Category balance — strongest reason:** `navigation-safety` currently has **zero** published articles (index has shelters/water/cooking roundups + backpacks/sleep-systems guides). This is the thinnest possible category.
- **Editorial fit:** a headlamp is a pure spec object (weight g/oz, lumens, beam distance, IP rating, battery) — ideal for HeavyHiker's "weighed and verified" ledger lens.
- **Search opportunity:** "best backpacking headlamp" and "Actik Core vs Spot 400" are standing high-volume comparison queries with dense 2026 comparison coverage (CleverHiker, Switchback Travel, Treeline Review, The Trek, OutdoorGearLab, 99Boulders) — evidence people actively compare exactly these products.
- **Seasonality:** evergreen core-ten gear; no fall/winter mismatch on a late-July run.
- **Affiliate coverage:** all three buyable through programs already in the registry (BD & Petzl → REI; Nitecore → Amazon). No new program signup required.

### Runners-up (scored, and why they lost)
1. **Backpacking sleeping pads** (sleep-systems: NeoAir XLite NXT / Nemo Tensor / Sea to Summit) — very high search + clean spec cluster, but `sleep-systems` already has a guide, so category balance is weaker than navigation-safety's zero-content state. Hold for a near-term run.
2. **Trail-running shoes** (footwear: Altra Lone Peak / Hoka Speedgoat / Topo) — footwear is also zero-content, but fit/sizing (not weight) dominates the buying decision and per-size return variance weakens a numbers-first roundup; the "weighed and verified" lens is a cleaner fit on headlamps. Hold.

## Explicitly NOT claimed (integrity rule 1)
- **No first-hand testing or field use.** All performance language is attributed to owner-review patterns and published third-party testing.
- **Runtime / beam-distance figures are manufacturer claims, not independently measured** — labeled as such.
- **Direct-fetch degradation:** manufacturer spec pages 403'd the agent this run; specs are the manufacturer's published figures surfaced via search and are marked VERIFY. The writer/publisher must re-confirm each number at its recorded source URL before publishing.
- **Unreconciled discrepancies preserved, not smoothed:** Spot 400 water rating (IPX8 vs IP67), Actik Core output (600 vs 625 lm), NU25 UL battery capacity (650 vs 700 mAh) are printed as conflicting. Petzl Actik Core beam distance recorded as `not published` this run rather than estimated.
