# UKI SMB Outbound Engine for Deel

**An unofficial concept by Ayo Ahmed for the Sales Development Representative (SMB, UK & Ireland) seat at Deel.** It shows the top-of-funnel machine I'd build and run, not just work.

- **Live demo (no login):** https://uki-smb-outbound-engine.ayomideahmedcp.workers.dev
- **90-second walkthrough:** https://drive.google.com/file/d/1KtjxywqAI-B_NX6QHScWrzY38GBB1wBf/view

> **Sample data.** Every company, contact, signal and number in this repo is synthetic. None of it is a real account or a real result.

## What's in it

| Tab | What it shows |
|---|---|
| **Prospects** | 40 named UK and Irish SMBs (10–200 staff), segmented by trigger: *hiring abroad*, *contractor-heavy* and *international expansion*. Each has a 0–100 fit score, a five-part breakdown and a one-line reason. |
| **Sequences** | Three outbound sequences, one per segment, three emails each (days 1, 4 and 9). Written in my voice to earn a meeting, not to pitch. Each can be previewed personalised for any account, or as the raw template. |
| **Pipeline** | Prospect → contacted → replied → meeting booked over a six-week sample run. Press play to watch accounts flow through, with conversion between stages and a stage board. |
| **Weekly rhythm** | How the engine runs every week: Mon–Fri time blocks, the inputs I hold myself to, the rules, and the AE handoff brief. |

## How the fit score works

Five rules, 100 points in total:

| Component | Points | Full marks when |
|---|---|---|
| Headcount fit | 20 | 25–150 staff |
| Signal freshness | 25 | Trigger is 14 days old or less |
| Cross-border footprint | 30 | Several countries and people abroad |
| Funding timing | 15 | Raised in the last 6 months |
| Entity gap | 10 | People in a country with no local entity |

Tier A is 75+, tier B is 60–74 and tier C is under 60. Reasons are generated from each record's own fields, so they can't claim something the data doesn't support.

## Docs

| Doc | |
|---|---|
| [PRD](docs/PRD.md) | Problem, users, requirements and acceptance criteria |
| [ELI5](docs/ELI5.md) | The whole idea explained with a lemonade stand |
| [5 Whys](docs/FIVE_WHYS.md) | Why generic SMB outbound underperforms, down to the root cause |
| [Jobs to be done](docs/JTBD.md) | The prospect's, the SDR's and the AE's jobs |
| [Metrics](docs/METRICS.md) | Funnel definitions, quality and input metrics, how the score gets validated |
| [Test plan and results](docs/TEST_PLAN.md) | Unit, browser and manual checks, with recorded results |
| [Viability memo](docs/VIABILITY_MEMO.md) | Why this approach fits the SDR seat, and a 90-day plan |
| [v2 roadmap](docs/ROADMAP_V2.md) | From synthetic demo to running on real accounts |
| [Design sheet](docs/DESIGN_SHEET.md) | Deel's colours, type and logo usage, read from deel.com |

## Run it locally

```bash
npm run build        # writes dist/index.html and dist/worker.js
npm test             # unit tests
npm run test:e2e     # browser tests (needs Playwright with Chromium)
npm run dev          # serves dist/ on http://localhost:8787
```

There are no runtime dependencies. The page is one self-contained HTML file with no network calls, storage or randomness, so it renders the same way every time.

## Deploy

It runs on the Cloudflare Workers free tier. `dist/worker.js` serves the built page with security headers.

```bash
npm run deploy       # build + wrangler deploy (uses wrangler.toml)
```

## Structure

```
src/model.js      accounts, scoring, sequences, pipeline flow, weekly rhythm (all data lives here)
src/app.js        UI: routing, board, drawer, sequences, pipeline, rhythm
src/styles.css    Deel-mirrored design tokens and components
src/index.html    page shell
src/logo.svg      Deel wordmark (used under an "Unofficial concept" label)
scripts/build.mjs inlines everything into dist/index.html and dist/worker.js
tests/            unit and browser tests
docs/             product and operating docs
```

## Notes

Not affiliated with or endorsed by Deel. The Deel name and logo belong to their owner and are used only to show the concept in context. Company names are invented; any resemblance to a real business is unintended.

---

Ayo Ahmed, independent concept
