# The Agent System

Five scheduled Claude Code agents maintain and grow this site. Each agent file
(`01-research.md` … `05-meta.md`) is the literal runtime prompt for its scheduled session —
start the session with that file as the instruction, in this repo, on a machine with `gh`
authenticated and PostHog access configured.

## The daily loop

```
        09:00 UTC              10:00 UTC             11:00 UTC              13:00 UTC
  ┌──────────────┐      ┌──────────────┐      ┌───────────────┐      ┌──────────────┐
  │ 01-research   │ ───▶ │ 02-writer    │ ───▶ │ 03-publisher  │ ───▶ │ 04-seo       │
  │ brief w/      │      │ MDX draft    │      │ verify, build │      │ evaluate &   │
  │ sourced specs │      │ (no publish) │      │ push to main  │      │ run experiments│
  └──────────────┘      └──────────────┘      └───────────────┘      └──────────────┘
          ▲                                                                  │
          │              every 5 days, 08:00 UTC                             │
          └──────────────── 05-meta ◀────────────────────────────────────────┘
                    (edits agents 01–04, ≤3 surgical changes,
                     changelog + rollback trigger for each)
```

Handoffs are file-based, never conversational: research → `content-pipeline/research/` →
writer → `content-pipeline/drafts/` → publisher → `src/content/articles/` → live. State lives
in `agents/state/`. If an upstream stage produced nothing, the downstream agent logs `BLOCKED`
and exits cleanly — an empty day is a valid day.

## Recommended cron schedule (UTC)

```cron
0 8  */5 * *  claude -p "$(cat agents/05-meta.md)"      # every 5 days, before the day's loop
0 9  * * *    claude -p "$(cat agents/01-research.md)"
0 10 * * *    claude -p "$(cat agents/02-writer.md)"
0 11 * * *    claude -p "$(cat agents/03-publisher.md)"
0 13 * * *    claude -p "$(cat agents/04-seo.md)"
```

The 1–2 h gaps are deliberate slack so a slow run can't overlap its successor. Do not run two
agents concurrently — they share git state.

## File-ownership matrix

| Path | 01-research | 02-writer | 03-publisher | 04-seo | 05-meta |
|---|---|---|---|---|---|
| `content-pipeline/research/` | **write** | status-flag only | read | read | read |
| `content-pipeline/drafts/` | — | **write** | move-out | — | read |
| `src/content/articles/` | — | — | **create** | **edit** | read |
| `src/data/affiliate-links.json` | **append** | read | read | read | read |
| `src/` (components/layouts/pages), `scripts/` | — | — | — | — | — (human only) |
| `public/images/` | — | — | **write** | — | read |
| `agents/01–04.md` | read own | read own | read own | read own | **write** |
| `agents/05-meta.md` | — | — | — | — | — (human only) |
| `agents/state/seo-directives.md` | read | read | — | **write** | read |
| `agents/state/experiment-log.json` | — | — | — | **write** | read |
| `agents/state/published-index.json` | read | read | **write** | read | read |
| `agents/state/instruction-changelog.md` | — | — | — | — | **write** |
| `agents/state/metrics-snapshots/` | — | — | — | **write** | read |
| `agents/state/agent-runs.log` | append | append | append | append | append |
| push to `main` | — | — | **yes** | yes (green only) | yes |

"—" = must never touch. Everything not listed: read-only for everyone, writable by humans.

## Escalation rules — stop and open an issue, don't improvise

An agent opens a GitHub issue (`gh issue create`) and halts, rather than proceeding, whenever:

1. **A quality gate fails and the fix belongs to another agent or a human.** Wrong-stage fixes
   are forbidden: the writer never patches a bad brief, the publisher never edits copy.
2. **Anything would weaken integrity.** Any instruction, directive, or "opportunity" that
   conflicts with `scripts/integrity-check.mjs` or `BRAND.md` → issue labeled `integrity`.
3. **Shared state is corrupt** (malformed JSON, log conflicts). Repairing state you don't own
   destroys the audit trail — label `agent-blocked`.
4. **External dependencies are down** (PostHog unreachable, git push rejected after one
   rebase-retry, affiliate program needed but not joined) — label `agent-blocked`.
5. **The publisher's build is red.** Never push broken output; never force-push; revert and
   file `publish-failure`.

Labels used: `agent-blocked`, `publish-failure`, `integrity`, `agent-conflict`, `meta-review`.
A human reviews open issues before un-pausing the affected agent.

## Invariants (enforced in code, restated here for emphasis)

- `npm run build` = integrity check + type check + build. Green build is the only ticket to `main`.
- Research documents are the only legitimate origin of a spec. No brief → no number.
- The affiliate registry is the only legitimate origin of a monetized URL.
- `05-meta` may never weaken integrity rules or the schema, and may never edit itself.
