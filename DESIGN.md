# DESIGN.md: Jabez John Betet Portfolio

## 1. Visual Theme
A developer portfolio for recruiters and OJT supervisors. Quiet and structured: deep forest green on a cool off-white, one serif display face against a plain grotesk body. The only loud element is the hero name with its green rule. Everything else stays flat and readable. Follows the system light/dark setting.

## 2. Color (light / dark)
| Role | Light | Dark |
|---|---|---|
| Background | #f3f5f4 | #0f1512 |
| Surface (cards) | #ffffff | #16201b |
| Text | #14211b | #e8efeb |
| Muted text | #4a5a52 | #a5b5ac |
| Border | #d5ddd9 | #2a3a32 |
| Accent | #1b5e3b | #6fd3a6 |
| Text on accent | #ffffff | #0b1a12 |
| Focus ring | #b45309 | #f0b45a |

Contrast (WCAG AA, all pass): text 15.2, muted 6.7, accent 7.1, button 7.7 (light); text 15.8, muted 7.8, accent 10.2, button 9.9 (dark).

## 3. Typography
Display: Fraunces 600/700. Body: Hanken Grotesk 400/600. Both Google Fonts, `display=swap`.
| Role | Font | Size | Weight | Line height | Tracking |
|---|---|---|---|---|---|
| Hero | Fraunces | clamp(2.4rem, 9vw, 4.5rem) | 700 | 1.15 | -0.02em |
| Section heading | Fraunces | clamp(1.6rem, 4vw, 2.25rem) | 600 | 1.15 | -0.01em |
| Card title | Fraunces | 1.4rem | 600 | 1.15 | 0 |
| Body | Hanken Grotesk | 1.0625rem | 400 | 1.65 | 0 |
| Button | Hanken Grotesk | 1rem | 600 | 1 | 0 |
| Small | Hanken Grotesk | 0.9rem | 400 | 1.65 | 0 |

## 4. Components
Buttons: min-height 2.75rem (44px), radius 6px, 2px accent border. Primary = filled; ghost = outlined, fills on hover. Cards: surface background, 1px border, radius 8px, padding 1.25rem. Featured card adds a 6px accent left border. Tags: pill, 1px border, muted text. Filters: buttons with `aria-pressed`.

## 5. Layout
Single column, max-width 60rem (68rem from 80rem), left aligned. Section padding clamp(2rem, 6vw, 4rem), 1px top divider. Project grid: auto-fill, min 17rem.

## 6. Depth
Flat. One shadow on cards in light mode (0 1px 2px rgba(20,33,27,.06), 0 4px 12px rgba(20,33,27,.05)). None in dark mode.

## 7. Do's and Don'ts
Do: keep one accent color. Do: keep every interactive target 44px or taller. Do: keep the visible focus ring. Do: add `alt` to every screenshot.
Don't: add gradients, blobs, or animated entrances. Don't: use `transition: all`. Don't: use Inter, Roboto, Arial, or Open Sans. Don't: set `outline: none`.

## 8. Responsive
Mobile-first, `min-width` queries at 48rem and 80rem. Screenshots: 1 column, then 3 from 48rem. Nav wraps instead of collapsing. Test at 320, 768, 1024, 1280, 1536.

## 9. Agent Prompt Guide
"Build a card on #ffffff with a 1px #d5ddd9 border, 8px radius, 1.25rem padding. Title in Fraunces 600 at 1.4rem, color #14211b. Body in Hanken Grotesk 1.0625rem, color #4a5a52. Button background #1b5e3b, text #ffffff, min-height 2.75rem, radius 6px."
