# DESIGN.md: Portfolio v4 (clean professional)

Soft neutral background, white cards with a subtle shadow, one blue accent, one typeface. Light and dark themes via `data-theme` on `<html>` (system default, saved in localStorage).

| Role | Light | Dark |
|---|---|---|
| Background | #f6f7f9 | #0e1116 |
| Surface | #ffffff | #161b22 |
| Text | #111827 | #f0f3f6 |
| Muted | #4b5563 | #9aa4b2 |
| Border | #e3e6eb | #262d36 |
| Accent | #1d4ed8 | #6ea8fe |
| Accent soft | #e8eefc | #15233b |

Font: Plus Jakarta Sans 400 to 800 (Google). Headings 800, tight tracking (-0.03em hero, -0.02em h2). Root size scales 100% to 118% with viewport width.

Layout: sticky blurred top bar, 72rem container, split hero from 64rem, auto-fill card grid, featured card spans full width from 48rem. Radius 18px cards, 10px buttons. Touch targets 44px or taller.

Motion: loader once per session, hero fade-up after load, scroll reveal, card lift on hover, theme knob. Transform and opacity only; off under prefers-reduced-motion.

Don't: add gradients, a second accent, `transition: all`, or remove focus outlines.
