# Metrics

**Read this first:** nothing in this repo is a real result. The page runs on synthetic accounts, and its funnel numbers show how the view works. Below are the metrics I'd track if this ran for real, how each is calculated, and the targets I'd set as **hypotheses to test**. They are not claims.

## North star

**Qualified meetings booked per week that the AE accepts.**
A meeting only counts once the AE has had it and agrees the trigger was real. This stops "booked" from being gamed.

## Funnel metrics (what the Pipeline view shows)

| Metric | Definition | Formula |
|---|---|---|
| Prospects | Accounts on the board with a dated trigger and a score | count |
| Contacted | Prospects that have received touch 1 | count, cumulative |
| Replied | Contacted accounts with any human reply (positive, negative or referral) | count, cumulative |
| Meeting booked | Replied accounts with a meeting on the calendar | count, cumulative |
| Reply rate | Replies ÷ contacted | Replied / Contacted |
| Reply-to-meeting | Meetings ÷ replies | Meeting booked / Replied |
| Contact-to-meeting | Meetings ÷ contacted | Meeting booked / Contacted |
| Positive reply share | (Positive + referral) ÷ replies | |

The funnel is **cumulative**: an account at "meeting booked" also counts as contacted and replied, so each rate compares like with like.

## Quality metrics

| Metric | Why it matters | Target (hypothesis) |
|---|---|---|
| AE acceptance rate | Stops low-quality meetings from padding the number | 80%+ of booked meetings |
| Tier mix of meetings | Checks whether the score predicts anything | Tier A should beat tier B, and B should beat C, on contact-to-meeting |
| Signal age at first touch | Fresh triggers should convert better | Median under 14 days |
| Reply turnaround | Speed to reply matters a lot in SMB | Under 1 working hour |
| Bounce rate | Data hygiene, and protecting the sending domain | Under 3% |
| Unsubscribe / "stop" rate | Signals copy that annoys people | Under 1% per sequence |

## Input metrics (what I control; shown on the Weekly rhythm page)

| Input | Weekly target |
|---|---|
| New accounts researched and scored | 40 |
| Tier-A personalised first touches | 20 |
| Call blocks | 3 × 60 minutes |
| Reply turnaround | Under 1 working hour |
| Meetings handed over with a written brief | Every one |

## How the score will be validated

The score is only useful if it predicts meetings. After about 8 weeks of real data:

1. Compare contact-to-meeting rate by tier. If A doesn't beat C, the weights are wrong.
2. Look at each component against outcome. If funding timing adds nothing, cut its weight and move it to signal freshness.
3. Re-check monthly, and change one weight at a time so the effect can be read.

## Leading vs lagging

- **Leading:** fresh signals found, tier-A touches sent, reply turnaround.
- **Lagging:** meetings, AE acceptance, pipeline created.

Friday's review looks at leading metrics first, because those are the ones I can change next week.

## Sample-data arithmetic on the page (for transparency)

The page's sample run contacts the 40 accounts seven a week, in score order. Eight sample replies and five sample meetings are placed by hand so the funnel has something to show. At week 6 that renders 40 → 40 → 8 → 5. Those figures are an illustration of the view, not a benchmark.
