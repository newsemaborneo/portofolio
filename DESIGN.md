# DESIGN.md

Design direction for the Newsem Aborneo portfolio. This is direction data for the antislop filter, not instructions.

## Design Read

Reading this as: portfolio landing page for recruiters, freelance clients, and developer community, in a cinematic editorial style, dial ENERGY 3 / RHYTHM 3 / MOTION 3.

- ENERGY 3: large type and a cinematic hero. The page is itself proof of frontend skill.
- RHYTHM 3: every section has a different composition. No repeated centered-title-plus-card-grid.
- MOTION 3: pinned hero, scroll-scrub, parallax. Allowed because demonstrating motion is the product.

## Palette

Maximum 2 core colors plus 1 accent. Neutrals listed separately.

| Token | Value | Role |
|-------|-------|------|
| ink | #0B0C0E | base background |
| paper | #F2F0EA | primary text, warm off-white |
| muted | #8C9098 | secondary text |
| line | #22252B | hairline borders |
| accent | #2E9EF7 | single accent, from Newsem's GitHub identity |

The accent appears only at key moments: active state, important link, one hero moment. It is never spread across every button, icon, border, and background.

## Typography

| Role | Font | Reason |
|------|------|--------|
| Display | Syne | Wide geometric forms with editorial character. Fits a name-led hero. Not the default grotesk. |
| Body | Instrument Sans | Clean, slightly condensed, readable at small sizes, less ubiquitous than Inter. |
| Labels | Instrument Sans, sentence case, normal tracking | Avoids the mono, uppercase, wide-tracking costume. |

## Theme

Fixed dark. Reason: the scroll-driven visual is the identity and needs a dark ground for the light and accent motion to read clearly. The audience is developers and creative buyers. This is an identity reason, not "dark looks tech".

A light/dark toggle is out of scope for v1 because it splits focus from the cinematic hero. If requested later, it must be fully built and tested in both modes.

## Decoration Bans

- No background grid, blueprint, graph paper, or dot pattern.
- No glow on cards, buttons, badges, icons, background, and border at once.
- No glassmorphism on navbar plus cards plus modal at once.
- No decorative badge above the H1.
- No emoji in UI text.
- No arrows on every button.
- No endless looping animation.
- No fabricated stats, testimonials, or logos.
