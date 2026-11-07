# Portfolio Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ID/EN) Next.js portfolio landing page for Newsem Aborneo with a scroll-driven cinematic hero, four real case studies, and honest placeholders for pending content.

**Architecture:** Next.js App Router with mostly client components for motion. Content lives in one typed bilingual source. A client LanguageProvider serves `id`/`en` with localStorage persistence. The hero is a sticky 300vh section whose scroll progress drives a procedural canvas visual. Pure logic (scroll math, field math, content parity) is unit tested; critical DOM flows are component tested; the final task runs a real build and click-through.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, `motion` (Framer Motion), `lenis`, `next/font` (Syne, Instrument Sans), Vitest + Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-07-portfolio-landing-page-design.md`

## Global Constraints

- Framework: Next.js App Router only, TypeScript. No other framework.
- Copy bilingual `id` (default) and `en`, one shared content source, toggle persisted in localStorage key `newsem.locale`.
- Palette tokens only: `ink #0B0C0E`, `paper #F2F0EA`, `muted #8C9098`, `line #22252B`, `accent #2E9EF7`. One accent only.
- Fonts: Syne (display), Instrument Sans (body). No Space Grotesk, Inter, JetBrains Mono.
- Dark theme fixed for v1, with the identity reason recorded in DESIGN.md.
- No em dash character in any UI text or docs.
- No fabricated stats, testimonials, logos, or contact links. Pending data uses visible placeholders.
- Real live links only: `https://lakupos.my.id`, `https://siropa.my.id`, `https://simaksu.my.id`. Jurnal has no link. GitHub is `https://github.com/newsemaborneo`.
- No slop patterns: blue-purple gradient, page-wide glow/glass, background grid, decorative badge above H1, emoji in UI, endless loops, uniform card grid.
- Honor `prefers-reduced-motion`: disable scroll scrub and non-essential motion.
- Responsive from 360px, no horizontal overflow, tap targets >= 44px.
- Target metrics are goals, not claims: LCP < 2.5s, CLS near 0, 60fps on mid-range desktop.

## Review Focus

- Scroll progress at boundaries: before hero, exact start, exact end, after hero, zero/NaN height must clamp to a valid 0..1 value, never NaN or out-of-range frames.
- Environment guards: SSR where `window`/`matchMedia`/`localStorage` are absent must not crash; invalid stored locale must fall back to `id`.
- Locale parity: a key missing in one locale must not render `undefined`; `document.documentElement.lang` must update.
- Dead controls and honesty: Jurnal without a link, pending email/WhatsApp/LinkedIn must not be links, CV must be visibly pending, GitHub link real.
- Mobile 360px: long project names, nav, and canvas must not cause horizontal overflow; DPR capped and resize handled.

---

### Task 1: Scaffold project, design tokens, and DESIGN.md

**Files:**
- Create: whole Next.js app in `/home/sem/project_individu/portofolio`
- Create: `DESIGN.md`
- Modify: `app/layout.tsx`, `app/globals.css`
- Create: `.gitignore` (from scaffold), `vitest.config.ts`, `test/setup.ts`

**Interfaces:**
- Produces: buildable app, CSS variables `--ink --paper --muted --line --accent`, fonts wired as `--font-display` and `--font-body`.

- [ ] **Step 1: Scaffold Next.js**

Run (needs approval, modifies project + installs deps):
```bash
cd /home/sem/project_individu/portofolio
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm --yes
```
Expected: `app/`, `package.json`, `tailwind` config present, dev dependency install succeeds.

- [ ] **Step 2: Install runtime and test dependencies**

Run (needs approval):
```bash
npm install motion lenis
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```
Expected: packages added with no peer errors.

- [ ] **Step 3: Write DESIGN.md**

Create `DESIGN.md` containing: the Design Read line `ENERGY 3 / RHYTHM 3 / MOTION 3`, the five palette tokens with hex values, the two fonts and why, the fixed-dark reason, and the decoration bans copied from spec section 9.6. This file is direction data for the antislop filter.

- [ ] **Step 4: Configure tokens, fonts, metadata**

In `app/globals.css` define the five CSS variables and Tailwind theme mapping. In `app/layout.tsx` load Syne and Instrument Sans via `next/font/google`, set `<html lang="id">`, and a unique title/description. Ensure dark background uses `--ink` and text uses `--paper`.

- [ ] **Step 5: Add Vitest config**

Create `vitest.config.ts` using `@vitejs/plugin-react`, `environment: 'jsdom'`, alias `@` to project root, and `setupFiles: ['./test/setup.ts']`. Create `test/setup.ts` importing `@testing-library/jest-dom/vitest`.

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: build completes with no errors.

- [ ] **Step 7: Init git and commit**

Run (needs approval): `git init && git add -A && git commit -m "chore: scaffold next.js portfolio with design tokens"`
Expected: first commit created.

---

### Task 2: Bilingual content source and LanguageProvider

**Files:**
- Create: `lib/content.ts`
- Create: `lib/i18n.tsx`
- Test: `test/content.test.ts`, `test/i18n.test.tsx`

**Interfaces:**
- Produces:
```ts
export type Locale = 'id' | 'en'
export interface Project {
  slug: string; name: string; summary: string; role: string; stack: string[];
  problem: string; solution: string; impact?: string; liveUrl?: string; pending?: boolean;
}
export interface SiteContent {
  nav: { work: string; services: string; about: string; contact: string; cta: string; langLabel: string }
  hero: { name: string; role: string; tagline: string; scrollCue: string }
  intro: { statement: string; bio: string; meta: string }
  work: { title: string; subtitle: string; liveLabel: string; pendingLabel: string; projects: Project[] }
  services: { title: string; items: { title: string; description: string }[] }
  stack: { title: string; items: string[] }
  about: { title: string; body: string; cvLabel: string; cvPending: string }
  contact: { title: string; lead: string; email: string; github: string; linkedin: string; whatsapp: string; pendingLabel: string }
  footer: { rights: string; backToTop: string }
}
export const content: Record<Locale, SiteContent>
```
```ts
export function LanguageProvider(props: { children: React.ReactNode; initialLocale?: Locale }): JSX.Element
export function useLanguage(): { locale: Locale; setLocale: (l: Locale) => void; toggle: () => void; t: SiteContent }
```

- [ ] **Step 1: Write content tests**

`test/content.test.ts`:
```ts
import { content } from '@/lib/content'
const locales = ['id', 'en'] as const
function shape(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(shape)
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).sort().map(([k, v]) => [k, shape(v)]))
  return typeof value
}
it('both locales share the same shape', () => {
  expect(shape(content.id)).toEqual(shape(content.en))
})
it('both locales contain no empty required strings', () => {
  const texts = [content.id, content.en]
  for (const t of texts) {
    expect(t.hero.name.trim()).not.toBe('')
    expect(t.work.projects).toHaveLength(4)
  }
})
it('projects use only real live links', () => {
  const allowed = ['https://lakupos.my.id', 'https://siropa.my.id', 'https://simaksu.my.id']
  for (const p of content.id.work.projects) {
    if (p.liveUrl) expect(allowed).toContain(p.liveUrl)
  }
  const jurnal = content.id.work.projects.find((p) => p.slug === 'jurnal')
  expect(jurnal?.liveUrl).toBeUndefined()
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run test/content.test.ts`
Expected: FAIL, cannot resolve `@/lib/content`.

- [ ] **Step 3: Implement `lib/content.ts`**

Define types and `content` for both locales. Four projects in order: `lakupos` (liveUrl, flagship), `siropa` (liveUrl, pending description `[DESKRIPSI]`), `simaksu` (liveUrl, pending description `[DESKRIPSI]`), `jurnal` (no liveUrl, pending description `[DESKRIPSI]`). No fabricated impact numbers; omit `impact` or use qualitative facts like `multi-tenant` only if real. Contact: `github: 'https://github.com/newsemaborneo'`; email/linkedin/whatsapp hold visible placeholder strings (`[EMAIL]`, `[LINKEDIN]`, `[WHATSAPP]`) and a `pendingLabel` in each locale.

- [ ] **Step 4: Run content tests to verify they pass**

Run: `npx vitest run test/content.test.ts`
Expected: PASS.

- [ ] **Step 5: Write i18n tests**

`test/i18n.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LanguageProvider, useLanguage } from '@/lib/i18n'

function Probe() {
  const { locale, toggle, t } = useLanguage()
  return <div><span data-testid="locale">{locale}</span><span data-testid="label">{t.nav.work}</span><button onClick={toggle}>toggle</button></div>
}
it('defaults to id', () => {
  render(<LanguageProvider><Probe /></LanguageProvider>)
  expect(screen.getByTestId('locale')).toHaveTextContent('id')
})
it('toggles locale and persists it', async () => {
  const user = userEvent.setup()
  render(<LanguageProvider><Probe /></LanguageProvider>)
  await user.click(screen.getByText('toggle'))
  expect(screen.getByTestId('locale')).toHaveTextContent('en')
  expect(localStorage.getItem('newsem.locale')).toBe('en')
})
it('ignores an invalid stored locale', () => {
  localStorage.setItem('newsem.locale', 'fr')
  render(<LanguageProvider><Probe /></LanguageProvider>)
  expect(screen.getByTestId('locale')).toHaveTextContent('id')
})
```

- [ ] **Step 6: Run i18n tests to verify they fail**

Run: `npx vitest run test/i18n.test.tsx`
Expected: FAIL, cannot resolve `@/lib/i18n`.

- [ ] **Step 7: Implement `lib/i18n.tsx`**

Client component with context. On mount read `newsem.locale`, accept only `id`/`en`, else `id`. On change set `document.documentElement.lang` and localStorage. Guard all `window`/`localStorage` access.

- [ ] **Step 8: Run i18n tests to verify they pass**

Run: `npx vitest run test/i18n.test.tsx`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/content.ts lib/i18n.tsx test/content.test.ts test/i18n.test.tsx
git commit -m "feat: add bilingual content source and language provider"
```

---

### Task 3: Pure scroll and visual math

**Files:**
- Create: `lib/scroll.ts`, `lib/visual.ts`, `lib/sections.ts`
- Test: `test/scroll.test.ts`, `test/visual.test.ts`

**Interfaces:**
- Produces:
```ts
export function clamp(n: number, min: number, max: number): number
export function lerp(a: number, b: number, t: number): number
export function scrollProgress(scrollY: number, top: number, height: number): number
export function frameIndex(progress: number, frameCount: number): number
export function fieldOffset(x: number, y: number, time: number, progress: number): { dx: number; dy: number }
export const SECTION_IDS: readonly ['work', 'services', 'about', 'contact']
```

- [ ] **Step 1: Write scroll tests**

`test/scroll.test.ts`:
```ts
import { clamp, lerp, scrollProgress, frameIndex } from '@/lib/scroll'
it('clamps values', () => {
  expect(clamp(5, 0, 1)).toBe(1)
  expect(clamp(-2, 0, 1)).toBe(0)
  expect(clamp(NaN, 0, 1)).toBe(0)
})
it('returns 0 progress for zero or invalid height', () => {
  expect(scrollProgress(100, 0, 0)).toBe(0)
  expect(scrollProgress(100, 0, -5)).toBe(0)
  expect(scrollProgress(NaN, 0, 300)).toBe(0)
})
it('maps scroll to 0..1 and clamps outside the hero', () => {
  expect(scrollProgress(-100, 0, 300)).toBe(0)
  expect(scrollProgress(0, 0, 300)).toBe(0)
  expect(scrollProgress(150, 0, 300)).toBe(0.5)
  expect(scrollProgress(1000, 0, 300)).toBe(1)
})
it('maps progress to in-range frame indices', () => {
  expect(frameIndex(0, 120)).toBe(0)
  expect(frameIndex(1, 120)).toBe(119)
  expect(frameIndex(0.5, 120)).toBe(60)
  expect(frameIndex(5, 120)).toBe(119)
})
it('lerps', () => { expect(lerp(0, 10, 0.5)).toBe(5) })
```

- [ ] **Step 2: Run scroll tests to verify they fail**

Run: `npx vitest run test/scroll.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `lib/scroll.ts` and `lib/sections.ts`**

`clamp` returns `min` when input is not finite. `scrollProgress` returns 0 when any input is not finite or height <= 0, else `clamp((scrollY - top) / height, 0, 1)`. `frameIndex` clamps progress then returns `Math.min(frameCount - 1, Math.floor(progress * frameCount))`. `SECTION_IDS` is the literal tuple.

- [ ] **Step 4: Run scroll tests to verify they pass**

Run: `npx vitest run test/scroll.test.ts`
Expected: PASS.

- [ ] **Step 5: Write visual tests**

`test/visual.test.ts`:
```ts
import { fieldOffset } from '@/lib/visual'
it('is deterministic for the same input', () => {
  expect(fieldOffset(10, 20, 0.5, 0.3)).toEqual(fieldOffset(10, 20, 0.5, 0.3))
})
it('stays within a bounded pixel range', () => {
  const { dx, dy } = fieldOffset(123, 456, 9.5, 0.75)
  expect(Math.abs(dx)).toBeLessThanOrEqual(40)
  expect(Math.abs(dy)).toBeLessThanOrEqual(40)
})
it('responds to progress', () => {
  expect(fieldOffset(10, 20, 0.5, 0)).not.toEqual(fieldOffset(10, 20, 0.5, 1))
})
```

- [ ] **Step 6: Run visual tests to verify they fail**

Run: `npx vitest run test/visual.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 7: Implement `lib/visual.ts`**

Deterministic function using sine/cosine of x, y, time and progress, each offset clamped to +/-40. No randomness, no DOM access.

- [ ] **Step 8: Run visual tests to verify they pass**

Run: `npx vitest run test/visual.test.ts`
Expected: PASS.

- [ ] **Step 9: Commit**

```bash
git add lib/scroll.ts lib/visual.ts lib/sections.ts test/scroll.test.ts test/visual.test.ts
git commit -m "feat: add pure scroll and visual math"
```

---

### Task 4: Reduced motion hook, Nav, and app shell

**Files:**
- Create: `lib/reduced-motion.ts`
- Create: `components/nav/Nav.tsx`
- Create: `components/layout/AppShell.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`
- Test: `test/nav.test.tsx`

**Interfaces:**
- Consumes: `LanguageProvider`, `useLanguage`, `SECTION_IDS`.
- Produces:
```ts
export function useReducedMotion(): boolean
export function Nav(): JSX.Element
```
- Nav renders one anchor per id in `SECTION_IDS` plus language toggle and CTA. Mobile menu button has `aria-expanded`, opens a panel, closes on Escape.

- [ ] **Step 1: Write nav tests**

`test/nav.test.tsx`:
```tsx
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Nav } from '@/components/nav/Nav'
import { LanguageProvider } from '@/lib/i18n'
import { SECTION_IDS } from '@/lib/sections'

function setup() { return render(<LanguageProvider><Nav /></LanguageProvider>) }
it('links only to existing section ids', () => {
  setup()
  const nav = screen.getByRole('navigation')
  for (const id of SECTION_IDS) {
    expect(within(nav).getByRole('link', { name: new RegExp(id, 'i') })).toHaveAttribute('href', `#${id}`)
  }
})
it('toggles the mobile menu and closes on Escape', async () => {
  const user = userEvent.setup()
  setup()
  const button = screen.getByRole('button', { name: /menu/i })
  expect(button).toHaveAttribute('aria-expanded', 'false')
  await user.click(button)
  expect(button).toHaveAttribute('aria-expanded', 'true')
  await user.keyboard('{Escape}')
  expect(button).toHaveAttribute('aria-expanded', 'false')
})
it('switches language labels', async () => {
  const user = userEvent.setup()
  setup()
  const toggle = screen.getByRole('button', { name: /id|en|bahasa|language/i })
  const before = screen.getByRole('navigation').textContent
  await user.click(toggle)
  expect(screen.getByRole('navigation').textContent).not.toBe(before)
})
```

- [ ] **Step 2: Run nav tests to verify they fail**

Run: `npx vitest run test/nav.test.tsx`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `useReducedMotion`**

Return false during SSR. On mount subscribe to `matchMedia('(prefers-reduced-motion: reduce)')` with change listener and clean up.

- [ ] **Step 4: Implement Nav and AppShell**

Nav is a client component. Desktop anchors visible from `md`. Mobile: menu button with accessible name, panel with same anchors, Escape and link click close it. CTA scrolls to `#contact`. Language toggle calls `toggle()` and shows current locale. Nav background solid `--ink` (no glass). Base CSS sets `cursor: pointer` on enabled controls.

- [ ] **Step 5: Wire app shell**

`app/layout.tsx` wraps children in `LanguageProvider`. `app/page.tsx` renders `Nav`, `<main>` with placeholder section stubs carrying the exact ids `work`, `services`, `about`, `contact`, and a footer stub. Render `SmoothScroll` here only after it exists in Task 7; until then omit it.

- [ ] **Step 6: Run nav tests to verify they pass**

Run: `npx vitest run test/nav.test.tsx`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add lib/reduced-motion.ts components/nav/Nav.tsx components/layout/AppShell.tsx app/layout.tsx app/page.tsx test/nav.test.tsx
git commit -m "feat: add reduced motion hook, nav, and app shell"
```

---

### Task 5: Cinematic hero with procedural canvas

**Files:**
- Create: `components/hero/HeroCanvas.tsx`, `components/hero/Hero.tsx`
- Create: `lib/hero-state.ts`
- Modify: `app/page.tsx`
- Test: `test/hero-state.test.ts`

**Interfaces:**
- Consumes: `scrollProgress`, `frameIndex`, `lerp`, `fieldOffset`, `useReducedMotion`.
- Produces:
```ts
export function overlayOpacity(progress: number): number
export function overlayTranslate(progress: number): number
export function Hero(): JSX.Element
```

- [ ] **Step 1: Write hero state tests**

`test/hero-state.test.ts`:
```ts
import { overlayOpacity, overlayTranslate } from '@/lib/hero-state'
it('fades overlay out as progress rises', () => {
  expect(overlayOpacity(0)).toBeGreaterThan(0.9)
  expect(overlayOpacity(0.5)).toBe(0)
  expect(overlayOpacity(1)).toBe(0)
})
it('never returns NaN or negative translate', () => {
  for (const p of [-1, 0, 0.3, 1, 2, NaN]) {
    const v = overlayTranslate(p)
    expect(Number.isFinite(v)).toBe(true)
    expect(v).toBeGreaterThanOrEqual(0)
  }
})
```

- [ ] **Step 2: Run hero state tests to verify they fail**

Run: `npx vitest run test/hero-state.test.ts`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement `lib/hero-state.ts`**

`overlayOpacity` returns 1 until progress 0.25 then fades linearly to 0 at 0.5, clamped, NaN safe. `overlayTranslate` returns a non-negative pixel offset that grows with progress, clamped and NaN safe.

- [ ] **Step 4: Run hero state tests to verify they pass**

Run: `npx vitest run test/hero-state.test.ts`
Expected: PASS.

- [ ] **Step 5: Implement HeroCanvas**

Client component. Full-viewport canvas. On mount, size to container with devicePixelRatio capped at 2, attach resize handler. Use `requestAnimationFrame` to read the hero section's bounding rect, compute progress with `scrollProgress`, lerp current time, and draw a procedural flow field using `fieldOffset` plus faint accent particles on `--ink`. If `useReducedMotion()` is true, draw one static frame and do not start the loop. Clean up rAF and listeners.

- [ ] **Step 6: Implement Hero**

Section height `300vh`, inner `sticky top-0 h-screen`. Overlay name in Syne, role, tagline, scroll cue. Apply `overlayOpacity`/`overlayTranslate` from scroll progress. Text is real `<h1>` with the name. Canvas behind overlay with `aria-hidden`. Provide a CSS-only static fallback background for reduced motion and SSR.

- [ ] **Step 7: Wire into page and verify build**

Add `<Hero />` as the first section. Run `npm run build`.
Expected: build passes, no hydration errors in dev.

- [ ] **Step 8: Commit**

```bash
git add components/hero lib/hero-state.ts app/page.tsx test/hero-state.test.ts
git commit -m "feat: add scroll-driven cinematic hero"
```

---

### Task 6: Content sections (intro, work, services, stack, about, contact, footer)

**Files:**
- Create: `components/sections/Intro.tsx`, `Work.tsx`, `Services.tsx`, `Stack.tsx`, `About.tsx`, `Contact.tsx`, `Footer.tsx`
- Create: `components/ui/ProjectRow.tsx`
- Modify: `app/page.tsx`
- Test: `test/sections.test.tsx`

**Interfaces:**
- Consumes: `useLanguage`, `Project`.
- Produces: each section exported as a named component rendering its `SiteContent` block under the correct id.

- [ ] **Step 1: Write section tests**

`test/sections.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { LanguageProvider } from '@/lib/i18n'
import { Work } from '@/components/sections/Work'
import { Contact } from '@/components/sections/Contact'
import { About } from '@/components/sections/About'
import { content } from '@/lib/content'

it('renders four projects and only links projects with liveUrl', () => {
  render(<LanguageProvider><Work /></LanguageProvider>)
  const rows = screen.getAllByTestId('project-row')
  expect(rows).toHaveLength(4)
  expect(screen.getByTestId('project-lakupos')).toContainElement(screen.getByRole('link', { name: /lakupos/i }))
  expect(screen.queryByTestId('project-jurnal')?.querySelector('a')).toBeNull()
})
it('shows pending labels instead of dead contact links', () => {
  render(<LanguageProvider><Contact /></LanguageProvider>)
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute('href', 'https://github.com/newsemaborneo')
  expect(screen.queryByRole('link', { name: /email/i })).toBeNull()
  expect(screen.getByText(content.id.contact.pendingLabel)).toBeInTheDocument()
})
it('marks CV as pending until a file exists', () => {
  render(<LanguageProvider><About /></LanguageProvider>)
  const cv = screen.getByRole('button', { name: new RegExp(content.id.about.cvPending, 'i') })
  expect(cv).toBeDisabled()
})
```

- [ ] **Step 2: Run section tests to verify they fail**

Run: `npx vitest run test/sections.test.tsx`
Expected: FAIL, modules not found.

- [ ] **Step 3: Implement sections**

- Intro: asymmetric two-column, statement left, bio and meta right.
- Work: editorial rows via `ProjectRow`, flagship `lakupos` full-width first, then alternating alignment. Each row has `data-testid="project-<slug>"` and a `data-testid="project-row"`. Real screenshots only if available, else an honest placeholder panel labelled visibly. `liveUrl` renders an `<a>` with `target="_blank"` and `rel="noopener noreferrer"`; missing `liveUrl` renders a non-link pending label.
- Services: a list, not three identical cards. Three real service lines with inline descriptions.
- Stack: static typographic wall, no endless marquee.
- About: narrative plus a `[FOTO]` placeholder block, and a disabled `<button>` with the pending CV label.
- Contact: big statement, real GitHub link, and email/WhatsApp/LinkedIn shown as non-link pending text with the pending label. No ghost links.
- Footer: single row with real anchors only.

- [ ] **Step 4: Wire all sections into `app/page.tsx` in spec order**

Order: Hero, Intro, Work, Services, Stack, About, Contact, Footer. Ensure ids `work`, `services`, `about`, `contact` exist on the corresponding sections.

- [ ] **Step 5: Run section tests to verify they pass**

Run: `npx vitest run test/sections.test.tsx`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add components/sections components/ui/ProjectRow.tsx app/page.tsx test/sections.test.tsx
git commit -m "feat: add portfolio content sections"
```

---

### Task 7: Motion polish, smooth scroll, and responsive behavior

**Files:**
- Create: `components/ui/Reveal.tsx`, `components/SmoothScroll.tsx`
- Modify: sections and `globals.css`
- Test: `test/reveal.test.tsx`

**Interfaces:**
- Produces:
```ts
export function Reveal(props: { children: React.ReactNode; delay?: number }): JSX.Element
export function SmoothScroll(): null
```

- [ ] **Step 1: Write reveal test**

`test/reveal.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import { Reveal } from '@/components/ui/Reveal'
it('renders its children', () => {
  render(<Reveal><p>hello</p></Reveal>)
  expect(screen.getByText('hello')).toBeVisible()
})
```

- [ ] **Step 2: Run reveal test to verify it fails**

Run: `npx vitest run test/reveal.test.tsx`
Expected: FAIL, module not found.

- [ ] **Step 3: Implement Reveal and SmoothScroll**

Reveal uses `motion` with `whileInView`, one-time reveal, small opacity/translate only. When `useReducedMotion()` is true, render plain children with no animation. SmoothScroll initializes Lenis only when reduced motion is false, and cleans up on unmount.

- [ ] **Step 4: Apply motion deliberately**

Wrap section headers and project rows in `Reveal`. Add a subtle parallax to project visuals only. No endless loops, no fade+float+scale+bounce stack.

- [ ] **Step 5: Responsive CSS pass**

Add responsive rules ensuring: no horizontal overflow at 360px, nav collapses to the mobile menu below `md`, hero text scales with `clamp`, tap targets >= 44px, project rows stack cleanly. Set `focus-visible` outlines using `--accent`.

- [ ] **Step 6: Run all tests and build**

Run: `npx vitest run && npm run build`
Expected: all tests PASS, build PASS.

- [ ] **Step 7: Commit**

```bash
git add components/ui/Reveal.tsx components/SmoothScroll.tsx app components lib test
git commit -m "feat: add purposeful motion, smooth scroll, and responsive polish"
```

---

### Task 8: Accessibility, performance, and Delivery Gate

**Files:**
- Modify: `app/layout.tsx`, `app/page.tsx`, components as needed
- Create: `test/a11y.test.tsx`

**Interfaces:**
- Consumes: everything above.

- [ ] **Step 1: Write a11y tests**

`test/a11y.test.tsx`:
```tsx
import { render, screen } from '@testing-library/react'
import Page from '@/app/page'
it('has exactly one h1 and landmarks', () => {
  render(<Page />)
  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getByRole('navigation')).toBeInTheDocument()
})
it('does not ship em dash in rendered text', () => {
  const { container } = render(<Page />)
  expect(container.textContent).not.toContain('\u2014')
})
```

- [ ] **Step 2: Run a11y tests to verify they fail if issues exist**

Run: `npx vitest run test/a11y.test.tsx`
Expected: FAIL on any real issue. Fix the source, not the test.

- [ ] **Step 3: Implement accessibility and semantics**

Ensure `<html lang>` updates with locale, one `h1` (hero name), logical heading order, every image has `alt`, decorative canvas `aria-hidden`, every enabled control has `cursor: pointer`, focus-visible styles present, no `outline: none` without replacement, viewport meta does not block zoom.

- [ ] **Step 4: Implement performance guards**

Every image/video has width/height or aspect ratio. Hero visual is not lazy. No render-blocking third-party script. DPR capped. Canvas resize handled. No fabricated performance numbers reported anywhere.

- [ ] **Step 5: Run full verification**

Run: `npx vitest run && npm run build`
Expected: tests PASS, build PASS.

- [ ] **Step 6: Run the app and click through every control**

Run: `npm run dev` (background), open the page. Record evidence for: each nav link scrolls to its real section; language toggle changes all copy and persists after reload; mobile menu opens and closes with Escape; GitHub link opens `https://github.com/newsemaborneo`; pending email/WhatsApp/LinkedIn are not links; CV button is disabled with a visible pending label; Jurnal has no live link; no horizontal scroll at 360px. Check the console for errors at each step.

- [ ] **Step 7: Run the antislop Delivery Gate**

Produce a PASS/FAIL line for every item in the antislop core Delivery Gate plus the UI checklist. Every PASS cites concrete evidence (file/behavior), not a claim. Fix any FAIL before declaring done.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: accessibility, performance, and delivery gate pass"
```

---

## Self-Review Notes

- Spec coverage: intent/goals/audience (Tasks 1, 2, 6), design system (Task 1), scroll cinematic (Tasks 3, 5), bilingual (Task 2), sections and editorial rhythm (Task 6), motion and responsive (Task 7), placeholders and launch gate (Task 6), a11y and performance (Task 8).
- Type consistency: `Locale`, `SiteContent`, `Project`, `SECTION_IDS`, `useLanguage`, `useReducedMotion`, `Reveal` are defined once and reused by exact name.
- Review Focus coverage: scroll boundaries and NaN (Task 3), environment guards and invalid locale (Tasks 2, 4), locale parity (Task 2), dead controls and honesty (Task 6), mobile overflow and DPR (Tasks 5, 7).
