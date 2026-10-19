# PRD: UKI SMB Outbound Engine

**Owner:** Ayo Ahmed · **Status:** v1 shipped as a concept · **Data:** synthetic only

## 1. Problem

An SMB SDR covering the UK and Ireland has a huge addressable market. There are tens of thousands of companies with 10–200 staff, and most of them don't need Deel this quarter. The expensive mistake is spending prospecting hours on companies with no reason to talk now. Generic sequences ("we help companies hire globally") get ignored because they could have been sent to anyone.

The accounts worth calling this week are the ones showing a **public, dated trigger** that forces a cross-border employment or payment decision:

1. **Hiring abroad.** A job ad for someone in a country where the company has no entity.
2. **Contractor-heavy.** Several overseas contractors paid invoice by invoice.
3. **International expansion.** A new market, office or partner announced.

## 2. Goal

Show a working top-of-funnel system an SDR can run every week. It should find trigger-led accounts, rank them, contact them with messages that earn a meeting, and keep the pipeline honest. It also proves I can build the machine as well as work it.

## 3. Users

| User | Need |
|---|---|
| SDR (me) | Know who to contact this week and why, with copy ready to send |
| AE | Receive meetings with a written brief, not just a calendar invite |
| SDR manager | See where the funnel is leaking and what the SDR is changing in response |
| Hiring panel (this audition) | Judge the thinking quickly, from one link, with no login |

## 4. Scope (v1)

| # | Requirement | Acceptance criteria | Status |
|---|---|---|---|
| R1 | Named-account board of about 40 UK/IE SMBs | 40 accounts, 10–200 staff, country UK or IE, each with segment, signal, signal age, fit score and plain-English reason | Done |
| R2 | Segmentation by trigger | Three segments, filterable, with counts; at least 10 accounts each | Done (14/13/13) |
| R3 | Explainable fit score | 0–100 from five weighted components; breakdown visible per account; deterministic | Done |
| R4 | Three sequences, three touches each | One per segment; days 1, 4, 9; personalised from the account record; template view shows merge fields | Done |
| R5 | Pipeline dashboard | Prospect → contacted → replied → meeting booked; sample data flows week by week; cumulative funnel, conversion rates, stage board | Done |
| R6 | Weekly operating rhythm | Mon–Fri blocks, input targets, rules, AE handoff brief | Done |
| R7 | Honesty | Sample data flagged once, up front; no metric presented as a real result | Done |
| R8 | Brand | Mirrors Deel's tokens; Deel logo top-left labelled "Unofficial concept" | Done |
| R9 | Access | Public URL on Cloudflare Workers free tier, no login | Done |
| R10 | Credit | Footer: "Ayo Ahmed, independent concept" and nothing else | Done |

## 5. Non-goals

- Live data enrichment, a CRM integration or sending real email. v1 is deterministic and front-end only (see the [v2 roadmap](ROADMAP_V2.md)).
- Real companies or people. Every account is invented, so nobody gets prospected without consent.
- Claims about Deel's product, pricing or customers beyond what's on its public site.

## 6. Design decisions

- **One self-contained page served by a Worker.** There's no build-time framework, no network calls and no storage, so it loads instantly and always looks the same.
- **Score is rules, not a model.** Five components a manager can argue with: headcount fit (20), signal freshness (25), cross-border footprint (30), funding timing (15) and entity gap (10). Tiers are A (75+), B (60–74) and C (under 60).
- **Reasons are generated from fields, not written by hand.** A reason can't claim something the record doesn't support. Unit tests check this.
- **Sequences ask before they pitch.** Touch 1 asks one question about the trigger. Touch 2 offers something useful with no call attached. Touch 3 closes the loop and asks for a referral.
- **Funnel is cumulative.** An account that replied also counts as contacted, so conversion rates are honest.

## 7. Risks

| Risk | Mitigation |
|---|---|
| Reader mistakes sample numbers for results | Banner up front, a "Sample" tag on the funnel, and the copy says "illustrative, not a forecast" |
| Brand misuse | "Unofficial concept" pill, a not-affiliated line in the footer, and no Deel claims or customer logos |
| Synthetic names collide with real firms | Names were chosen to be generic. The footer and banner say everything is invented. |
| Score feels arbitrary | Breakdown drawer and a method note under the board; weights are documented here and in [METRICS.md](METRICS.md) |

## 8. Success measures

For the concept, success means a reviewer can understand the system in about 90 seconds from the video, and in about 5 minutes from the page. Operating metrics for a live version are in [METRICS.md](METRICS.md).
