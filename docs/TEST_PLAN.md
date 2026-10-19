# Test plan and results

**Build under test:** this repository as of 19 October 2026 · **Live URL:** https://uki-smb-outbound-engine.ayomideahmedcp.workers.dev

Three layers: unit tests on the data model and built page, browser end-to-end tests, and manual checks on the live deployment and the walkthrough video. Everything below was run, and the results are recorded as observed.

## How to run

```bash
npm test             # unit tests (node:test, no dependencies)
npm run test:e2e     # builds, then runs the browser tests (needs Playwright + Chromium)
```

## 1. Unit tests: `tests/unit.test.mjs`

| ID | What it proves | Result |
|---|---|---|
| U1 | Board holds 40 accounts with unique ids and names | Pass |
| U2 | Every account is UK or IE with 10–200 staff | Pass |
| U3 | All three segments have at least 10 accounts; every account has a dated signal and at least one country abroad | Pass |
| U4 | Score weights sum to 100; every component is within its weight; total equals the sum of its parts | Pass |
| U5 | Scoring is deterministic (two runs give identical output) | Pass |
| U6 | Tier thresholds (75 / 60) are exact and all three tiers appear | Pass |
| U7 | Reasons only state facts the record supports (the country, market or contractor count appears; "sweet spot" only when staff is 25–150; no "a" before a vowel) | Pass |
| U8 | Three sequences × three touches; every merge field resolves for every account in its segment (no `{{`, `undefined` or `null`) | Pass |
| U9 | Every email is 140 words or fewer and signed "Ayo"; touch 1 asks a question | Pass |
| U10 | Funnel is cumulative (each stage ≤ the previous) and never goes backwards week to week; sample replies come after contact, meetings after replies | Pass |
| U11 | Built page: sample notice appears exactly once, above the content; footer credit and "Unofficial concept" are present; no AI or tool names; no network calls, storage or randomness in the front end | Pass |
| U12 | Worker bundle exists and embeds the same page | Pass |

**Run result:** 12/12 passed.

## 2. Browser end-to-end tests: `tests/e2e.mjs` (Chromium)

| ID | Scenario | Result |
|---|---|---|
| E1 | Board loads 40 rows, sorted by score descending | Pass |
| E2 | Segment filter (Contractor-heavy) shows 13 rows and the tiles update | Pass |
| E3 | Tier and search filters combine; a search with no match shows the empty state | Pass |
| E4 | Clicking a row opens the drawer; the five parts add up to the shown score | Pass |
| E5 | The drawer's button opens that account's personalised sequence, which names the company | Pass |
| E6 | Template view shows merge fields; personalised view leaves none unfilled | Pass |
| E7 | Every account in every segment renders three touches with no unfilled fields (40 accounts × 3 touches) | Pass |
| E8 | Week buttons W1–W6 give a monotonic funnel; Play runs through to week 6; the stage board totals 40 | Pass |
| E9 | Weekly rhythm shows Mon–Fri and the inputs list | Pass |
| E10 | Sample notice appears exactly once; footer reads "Ayo Ahmed, independent concept"; logo pill reads "Unofficial concept" | Pass |
| E11 | Keyboard: Enter on a row opens the drawer; Escape closes it | Pass |
| E12 | No console or page errors across the whole run | Pass |
| E13 | At 390px wide, no tab scrolls horizontally | Pass |

**Run result:** 13/13 passed.

Defects found and fixed while writing these tests:
- **E9 / E11 failed on the first run.** The test checked the view before the asynchronous `hashchange` had rendered it. Fixed in the test by waiting for the visible view. The app itself was correct.
- **E5 failed on the first run.** The expansion sequence names the company in the subject line, not the body. The assertion now checks the whole first touch.

## 3. Manual checks: live deployment

| ID | Check | Result |
|---|---|---|
| M1 | `GET /` returns 200, `text/html; charset=utf-8`, and contains the footer credit | Pass: checked from a network outside the build machine, with no cookies or login |
| M2 | `GET /healthz` returns `ok` | Pass |
| M3 | Unknown paths redirect to `/` (302) | Pass |
| M4 | Desktop (1440×900) and mobile (390×844) screenshots of all four tabs plus the drawer look right: no overlap or clipping, brand colours correct | Pass, after one fix: the full hero pushed content below the fold on non-landing tabs, so it now collapses to a slim title bar there |
| M5 | Content-Security-Policy blocks everything except inline code and Google Fonts | Pass (set in `dist/worker.js` headers) |

## 4. Manual checks: walkthrough video

The video was watched in full before it was published: frames sampled every 2 seconds, plus full-resolution frames at key moments, and the audio track was checked for timing and level.

| ID | Check | Result |
|---|---|---|
| V1 | Length is about 90 seconds | Pass: 90.5 s |
| V2 | Order is prospects → sequence → dashboard (then the weekly rhythm and credit) | Pass |
| V3 | Visible moving cursor, with a click ripple on every click | Pass |
| V4 | Voiceover lines up with what's on screen | Pass, after a fix. **Defect found in take 1:** the screen recording ran about 10% slower than real time, so by the end the picture lagged the voice by about 10 s (the Rhythm narration played over the Pipeline view). **Fix:** a coloured sync bar is painted at each scene start in a strip that's cropped from the final frame. Each scene is located by that colour in the recording and retimed to real time. Measured speech onsets in the final file are 1.1, 13.3, 32.9, 41.2, 61.1 and 78.2 s, each within 0.3 s of its scene start. |
| V5 | The footer credit is on screen while "Ayo Ahmed, independent concept" is spoken | Pass (from about 86 s) |
| V6 | Audio level is sensible with no clipping | Pass: mean −22 dB, peak −4 dB |
| V7 | File metadata carries no tool names (encoder banner and tags stripped) | Pass |
| V8 | Drive link opens for anyone with the link and no login | Pass: permission is `anyone / reader`; an anonymous request loads the viewer with no sign-in redirect |
| V9 | Every voiceover line is present, complete and in the right place | Pass: each of the six narration clips was cross-correlated against the final audio track. All six were found at their planned start (0.9, 13.07, 32.64, 41.01, 60.84, 78.0 s) with similarity 1.000, and the last line ends at 89.0 s, before the fade-out starts at 89.65 s |

## 5. Not covered (known gaps)

- Browsers other than Chromium were not run automatically. The page uses only standard CSS and DOM APIs.
- Screen-reader testing was limited to semantic checks (landmarks, labelled controls, dialog roles, keyboard paths). There was no full assistive-technology pass.
