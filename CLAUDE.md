# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Build static site → out/
npm start       # Serve production build
```

No test suite is configured.

## Architecture

**Dual Mind Labs** is a fully static portfolio site (Next.js 15 App Router, `output: "export"`) deployed to Vercel.

### Page Structure

`src/app/page.tsx` composes the single page in this order:

```
CursorFollower → BackgroundEffects → Navbar
main
  Hero → About → Projects → Services → Testimonials → TechStack → Contact → Footer
```

All components live in `src/components/`. Path alias `@/*` maps to `src/*`.

### 3D Rendering

`Scene3D.tsx` uses Three.js via `@react-three/fiber` and `@react-three/drei`. It renders:
- `ParticleField` — 800 rotating particles
- `WireframeSphere` — animated icosahedron
- `ConnectingLines` — procedural network visualization

**Critical:** `Scene3D` is always dynamically imported with `ssr: false` to avoid server-side rendering issues with WebGL.

### Animation

- **GSAP** — character-by-character text reveals in `Hero.tsx`
- **Framer Motion** — scroll-triggered section entrances, mouse-parallax orbs, mobile menu transitions
- **`useScroll` + `useTransform`** — scrollytelling in `About.tsx`: Ashwin/Mohit cards animate in sequentially as the section scrolls into view

### CSS Utilities (globals.css)

- `.btn-neon` — purple gradient button with glow; used on primary CTAs
- `.bento-cell` — interactive tile with hover border-glow; used in `Services.tsx` and `TechStack.tsx`
- `.aeo-block` — left purple border for answer-first content blocks; used in `About.tsx`

### Key Patterns

- Every component uses `"use client"` — there are no server components
- `Navbar.tsx` uses `IntersectionObserver` to track active section and highlight nav links
- `Projects.tsx` has functional category filtering with `useState` + expandable PSR case study accordions per card
- `Contact.tsx` is a 4-step conversational multi-step form (AI Sales Assistant) — no backend, no API calls, pure state
- `TechStack.tsx` uses a 3-column bento grid (`md:grid-cols-3` with `md:col-span-2` / `md:col-span-1` cells)
- `layout.tsx` injects 3 JSON-LD schema blocks (`<script type="application/ld+json">`) for Organization, Person ×2, and Service ×4
- Background blobs, grid overlay, and film grain are isolated in `BackgroundEffects.tsx` to keep other components clean
