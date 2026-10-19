# Design sheet

How the page mirrors Deel's brand. Every value below was read from deel.com's live HTML and CSS on 19 October 2026 (homepage markup, the five `_next/static/css` bundles and the inline Emotion styles). Nothing is guessed from screenshots.

## Colour

Deel publishes its palette as CSS custom properties. The ones this page uses:

| Role on this page | Deel token | Hex |
|---|---|---|
| Ink (text, primary buttons, active tab) | `--color-surface-dark` / button background | `#1B1B1B` |
| Secondary text | `--color-neutral-700` | `#404040` |
| Muted text | (button/label grey in CSS) | `#616161` |
| Hairlines | `--color-neutral-200` | `#E6E6E6` |
| Page background | `--color-surface-secondary` (latte 25) | `#FFFBF4` |
| Card warm fill | `--color-surface-latte-light` | `#F7F5F2` |
| Subtle warm fill | `--color-surface-highlight-01` | `#FAF4EE` |
| Hero background | `--color-purple-gradient-dark` | `linear-gradient(118deg, #5938b700 48.33%, #5938b7 92.96%), #201547` |
| Hero accent text | `--color-purple-525` (Deel uses it for `<em>` in the hero H1) | `#A98DF6` |
| Brand purple (score bars, focus rings) | `--color-purple-750` | `#5938B7` |
| Tier A fill | `--color-surface-brand-purple-01` | `#E1D7FB` |
| Tier B fill | `--color-blue-175` | `#DBEEFF` |
| "Unofficial concept" pill | `--color-cornbread-300` | `#FFE27C` |
| Sample-data notice | `--color-surface-brand-yellow-01` / `--color-cornbread-400` border | `#FFEBA6` / `#FFCF25` |
| Text on dark | `--color-content-on-dark` | `#FAF4EE` |

### Data colours

The three trigger segments need a categorical palette. I took three Deel ramp steps and ran them through a colour-vision check (lightness band, chroma floor, deuteranopia/protanopia/tritanopia separation, contrast against white). All checks pass:

| Segment | Deel token | Hex |
|---|---|---|
| Hiring abroad | `--color-purple-750` | `#5938B7` |
| Contractor-heavy | `--color-blue-600` | `#2187CF` |
| International expansion | `--color-tangelo-600` | `#CD4311` |

Worst adjacent pair: purple/blue, ΔE 14.1 under deuteranopia (target is 8 or more). Segment colour is never the only cue: every dot sits next to its text label.

The funnel uses one hue (purple) stepping from light to dark (`#C4B1F9` → `#A98DF6` → `#724EC9` → `#201547`) because it encodes one measure at four stages, not four categories.

## Type

| Deel uses | Licence | This page uses |
|---|---|---|
| **Bagoss Condensed / Bagoss Standard** (headings, buttons) | Commercial, self-hosted by Deel | **Inter Tight** 500/600 as the stand-in: same grotesque skeleton, slightly condensed, free on Google Fonts |
| **Inter** (body, UI) | Open (OFL) | **Inter** 400–700, the same face |

Type scale taken from Deel's CSS: body 15–16px with `-0.08px` tracking; buttons 14px, weight 500, `0.21px` tracking; H1 42–60px at `line-height: 1.05`, weight 500, slight negative tracking.

## Shape and components

- **Buttons:** pill radius (`border-radius: 200px`), 40px tall, `8px 16px` padding. Primary is `#1B1B1B` fill with white text and a `#4E4E4E` hover. Secondary is transparent with a `2px solid rgba(27,27,27,.16)` border that darkens to `.40` on hover. Both come straight from Deel's nav "Book a demo" and "Log in" buttons.
- **Cards and panels:** white on latte, 1px `#E6E6E6` border, 12–16px radius.
- **Hero:** the dark purple gradient band Deel uses behind its homepage hero.
- **Motion:** 0.1s ease-in-out on hover, matching Deel's button transitions. All motion is switched off under `prefers-reduced-motion`.

## Logo usage

- Deel's current wordmark (`logo_revamp_164ddaed0c.svg`, 78×27) is inlined as SVG, top-left, at 66px wide on its native ink colour.
- It's always paired with a yellow **"Unofficial concept"** pill, so nobody mistakes the page for a Deel property.
- No recolouring, stretching, outlines or effects. Clear space is at least the height of the "d" bowl on every side.
- The footer states that the page is not affiliated with or endorsed by Deel, and that the name and logo belong to their owner.

## What I deliberately didn't copy

- Deel's licensed Bagoss fonts. I used a free stand-in instead.
- Product photography, customer logos and testimonials. They would imply an endorsement that doesn't exist.
- Any Deel claims or statistics. The emails talk about the prospect's situation, not Deel's numbers.
