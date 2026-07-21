# Ounce Ledger

> Backpacking gear, weighed and verified.

An autonomous affiliate site about backpacking gear — exclusively gear carried on-foot into the
backcountry — maintained by five scheduled Claude Code agents. Astro + Tailwind, static output,
deployed to GitHub Pages, measured with PostHog, guarded by an integrity check that fails the
build on fabricated experience, invented specs, duplicate keywords, or unregistered affiliate
links.

- **Brand definition:** [`BRAND.md`](./BRAND.md)
- **Agent system:** [`agents/README.md`](./agents/README.md)
- **Integrity rules (enforced in CI):** [`scripts/integrity-check.mjs`](./scripts/integrity-check.mjs)

## Setup

```bash
npm install
npm run dev        # http://localhost:4321/AffiliateSite/
npm run build      # integrity check → astro check → astro build (all must pass)
npm run integrity  # integrity check alone
npm run preview    # serve dist/
```

Node 20+ (built on 22). `npm run build` is the publishing gate — if it's red, nothing ships.

## Environment variables

Copy `.env.example` to `.env`:

| Var | Purpose |
|---|---|
| `PUBLIC_POSTHOG_KEY` | PostHog **project** key (write-only). Absent → analytics silently disabled; site works fine. |
| `PUBLIC_POSTHOG_HOST` | PostHog host, default `https://us.i.posthog.com` |
| `SITE_URL` | Deploy origin. Default `https://cadendane-droid.github.io` |
| `BASE_PATH` | Deploy base path. Default `/AffiliateSite`. Set to `/` when a custom domain is live. |

In GitHub: add `PUBLIC_POSTHOG_KEY` as an **Actions secret**; `SITE_URL`/`BASE_PATH`/
`PUBLIC_POSTHOG_HOST` as **Actions variables** (optional — defaults work for Pages).

Deploys run via `.github/workflows/deploy.yml` on every push to `main`. Enable Pages once:
repo **Settings → Pages → Source: GitHub Actions**.

## Affiliate program signup (manual, one-time each)

Every monetized link resolves through `src/data/affiliate-links.json`. All 9 seed entries are
`PENDING_AFFILIATE_ID` (the site renders their manufacturer `fallbackUrl` until then — still
tagged `rel="sponsored"`). To activate earnings:

1. **AvantLink** (Zpacks and many cottage brands): apply at avantlink.com/affiliates — needs a
   live site with real content (you have one) and a traffic story.
2. **REI Co-op** (via AvantLink): apply through REI's affiliate page; approval is separate from
   AvantLink membership.
3. **Amazon Associates**: affiliate-program.amazon.com — note the 180-day/3-sale qualification
   window; don't apply until you expect actual clicks.
4. **ShareASale** (Garage Grown Gear and others): shareasale.com.

When approved, replace the matching `"url": "PENDING_AFFILIATE_ID"` with your tagged deep link.
Never inline affiliate URLs in articles — the integrity check will fail the build.

Also replace the collective author in `src/data/authors.ts` with a real named human when
possible — it's both an honesty measure and an E-E-A-T signal, and the file says so.

## Scheduling the five agents

The agent prompts live in `agents/01-research.md` … `agents/05-meta.md`; shared state in
`agents/state/`. Full loop description, file-ownership matrix, and escalation rules:
[`agents/README.md`](./agents/README.md).

Recommended cron (UTC), on any machine with this repo, `claude` CLI, `gh` authenticated, and
PostHog access:

```cron
0 8  */5 * *  cd /path/to/repo && claude -p "$(cat agents/05-meta.md)"
0 9  * * *    cd /path/to/repo && claude -p "$(cat agents/01-research.md)"
0 10 * * *    cd /path/to/repo && claude -p "$(cat agents/02-writer.md)"
0 11 * * *    cd /path/to/repo && claude -p "$(cat agents/03-publisher.md)"
0 13 * * *    cd /path/to/repo && claude -p "$(cat agents/04-seo.md)"
```

Never run two agents concurrently — they share git state. Claude Code's scheduled-agent
(routines) feature works as an alternative to raw cron; keep the same times and ordering.

## Repository map

```
BRAND.md                     brand, voice, banned words
agents/                      the five agent prompts + README + image policy
agents/state/                shared state: indexes, logs, experiments, directives
content-pipeline/research/   research briefs (source of truth for every spec)
content-pipeline/drafts/     writer output awaiting the publisher
scripts/integrity-check.mjs  the build-failing integrity gate
src/content/articles/        published MDX (strict Zod schema in src/content.config.ts)
src/data/affiliate-links.json  the ONLY place affiliate URLs live
src/components|layouts|pages/  the design system and templates (human-owned)
.github/workflows/deploy.yml   CI: integrity → check → build → Pages deploy
```
