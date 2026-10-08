# DESIGN.md: Portfolio v3

Concept: a fixed left rail (name, numbered nav, theme switch, links) beside a scrolling content column. Large type, mono labels, one orange accent, flat surfaces. Light and dark themes via `data-theme` on `<html>`, defaulting to the system setting and saved in localStorage.

| Role | Light | Dark |
|---|---|---|
| Background | #e9ecee | #0c100f |
| Surface | #f7f8f9 | #131a18 |
| Text | #0f1412 | #eaf0ee |
| Muted | #4b5652 | #9fb0aa |
| Border | #c9d0d3 | #25312d |
| Accent | #b23a0b | #ff8a4c |

Fonts (Google): Bricolage Grotesque 500/700/800 (display), Hanken Grotesk 400/600 (body), JetBrains Mono 400/500 (labels). Root size scales from 100% to 125% with viewport width, so everything in rem grows on large screens.

Layout: under 64rem the rail becomes a sticky top bar with a scrolling nav row. From 64rem it is a 100vh left column (15 to 22rem). Touch targets are 44px or taller.

Motion: loader (once per session), hero letter rise, scroll reveal, marquee, theme knob. All transform and opacity only, and all disabled under prefers-reduced-motion.

Don't: add gradients or blobs, use `transition: all`, remove focus outlines, or add a second accent color.
