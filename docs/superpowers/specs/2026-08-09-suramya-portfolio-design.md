# Suramya — Premium One-Page Portfolio Design Spec

**Date:** 2026-08-09  
**Status:** Approved for planning  
**Product:** Single-page boutique arts & crafts portfolio for **Suramya**

---

## 1. Goal

Build a polished, premium one-page landing site that introduces Suramya, communicates its philosophy, showcases work categories and a gallery, and provides a calm path to enquire — feeling like a contemporary art studio, not ecommerce or SaaS.

**Brand principle:** Minimal concepts brought to life through texture, layers, and craftsmanship. *Less, but meaningful.*

**Success test:** A first-time visitor should immediately perceive a premium contemporary arts-and-crafts brand.

---

## 2. Decisions locked

| Topic | Choice |
|-------|--------|
| Stack | Vite + React + TypeScript + Tailwind CSS |
| Layout approach | Editorial scroll gallery (Approach 1) |
| Visual mood | Soft earth editorial, derived from official logo |
| Contact | Placeholders only (`hello@suramya.art`, `@suramya.studio`; no phone) |
| Sanskrit treatment | Whisper only — meaning in About; one small Devanagari line in hero |
| Gallery interaction | No lightbox in v1 |
| Backend | None — contact form is frontend demo only |

---

## 3. Brand & visual identity

### 3.1 Meaning

Suramya (Sanskrit): beautiful, charming, highly attractive, picturesque.

### 3.2 Logo (source of truth)

Official asset: `public/brand/suramya-logo.png`

- Cream ground (~`#F4EFE6`)
- Muted olive–sage mark and wordmark (~`#6B7D52`)
- Hand-drawn interlocking “S” (organic, imperfect)
- Wide-tracked sans caps: **S U R A M Y A**

Do not recolor the logo into startup purple/blue, or replace the wordmark with a serif treatment that fights the logo.

### 3.3 Color tokens

| Token | Role | Approx. value |
|-------|------|----------------|
| `--cream` | Page background | `#F4EFE6` |
| `--cream-deep` | Subtle section differentiation | slightly deeper ivory |
| `--sage` | Accent (links, focus rings, UI accents) | `#6B7D52` |
| `--sage-muted` | Soft washes / hairline borders | sage at low opacity |
| `--ink` | Primary text | deep charcoal-brown |
| `--ink-soft` | Secondary text | muted warm grey |

Optional: barely-there paper grain on cream. No neon, loud gradients, or heavy multi-layer shadows.

### 3.4 Typography

| Role | Direction | Font |
|------|-----------|------|
| Brand wordmark in UI | Wide-tracked sans (match logo) | Outfit |
| Display / editorial headings | Refined serif | Cormorant Garamond |
| Body / form UI | Clean humanist sans | Outfit |

SURAMYA as a brand signal uses the logo asset and/or wide-tracked sans — not a competing display serif for the name itself.

### 3.5 Motion

- Subtle fade / upward reveal on scroll
- Soft image hover scale
- Smooth anchor scrolling
- Nav state on scroll
- All motion respects `prefers-reduced-motion`
- No bounce, spin, or heavy parallax

---

## 4. Information architecture

**Sticky minimal nav:** logo + links

| Nav label | Anchor | Section |
|-----------|--------|---------|
| The Story | `#story` | About |
| What We Create | `#create` | Categories |
| The Collection | `#collection` | Gallery |
| Connect | `#connect` | Contact |

Mobile: accessible hamburger → overlay/panel with same links; focus trap and Esc to close.

**Page order:**
1. Hero
2. The Story
3. What We Create
4. The Collection
5. Connect
6. Footer

---

## 5. Section specifications

### 5.1 Hero

One composition in the first viewport:

- Full-bleed artistic placeholder (textured / layered art) via `images.hero`
- Dominant logo (mark + wordmark)
- Whisper Devanagari line (e.g. सुरम्य)
- Tagline: *Simple concepts. Rich textures. Timeless beauty.*
- One short supporting sentence
- One CTA: “Explore the collection” → `#collection`
- No stats, badges, chips, or overlays on the hero media

### 5.2 The Story (`#story`)

Editorial two-column layout:

- **Left:** Pull quote — *“Beauty does not always need complexity.”*
- **Right:** Meaning of Suramya + philosophy (minimalism, texture, layers, handmade; transforming simple ideas into meaningful pieces)
- Optional process/texture image via `images.about`

### 5.3 What We Create (`#create`)

Art categories — **not** pricing/service cards. Alternating image/text or loose 2×2 editorial grid.

| Category | Intent |
|----------|--------|
| Textured Works | Layered tactile surfaces |
| Script & Layers | Scripts, typography, symbols, layered compositions |
| Quiet Paintings | Minimal paintings; balance and calm |
| Clay Pieces | Dried-clay showpieces |

Each: image + title + short description. Images from centralized config.

### 5.4 The Collection (`#collection`)

- ~8 placeholder artworks from `data/artworks.ts`
- Fields: `title`, `category`, `image`, `description`
- Asymmetrical editorial grid (mixed aspect ratios; one large feature)
- Subtle captions; lazy loading; meaningful `alt`
- Deliberate mobile stack (not squeezed desktop)
- No lightbox in v1

### 5.5 Connect (`#connect`)

- Invite for enquiries, custom pieces, collaboration
- Contact placeholders: email `hello@suramya.art`, Instagram `@suramya.studio`
- Form fields: Name, Email, Enquiry type, Message
- Client-side validation + polished demo success state clarifying nothing was sent
- No backend

### 5.6 Footer

SURAMYA, short brand statement, Instagram + email placeholders, copyright year. Understated.

---

## 6. Content & image architecture

Separate data from UI:

```
data/
  content.ts    — nav labels, copy, taglines, contact placeholders
  artworks.ts   — gallery items
  images.ts     — hero, about, category image URLs / paths
```

Placeholder imagery must feel textured, handmade, neutral, editorial — not corporate stock. Replacing real artwork later = config/asset swap only.

Logo path: `public/brand/suramya-logo.png`

---

## 7. Component architecture

```
src/
  components/
    Navbar.tsx
    Hero.tsx
    About.tsx
    Collections.tsx   // What We Create
    Gallery.tsx
    Contact.tsx
    Footer.tsx
    ui/               // Reveal, FormField, etc. as needed
  data/
  styles / index.css  // tokens + base
  App.tsx
  main.tsx
```

Avoid a single monolithic page component.

---

## 8. SEO & accessibility

- **Title:** Suramya — Art Shaped by Simplicity
- Meta description reflecting arts & crafts / textured minimalist work
- Open Graph tags; favicon placeholder derived from logo
- Semantic HTML, heading hierarchy, landmarks
- Keyboard-accessible nav and form; visible focus (sage-tinted)
- Sufficient contrast on cream/ink/sage
- `prefers-reduced-motion` support
- Image `alt` text; lazy loading where appropriate

---

## 9. Research notes (inspiration only — do not copy)

Contemporary gallery and artisan sites emphasize: radical restraint, generous whitespace, artwork-led hierarchy, understated nav, calm micro-motion, and treating the site as a digital gallery rather than a storefront. Section naming and pacing should feel curated (Story / Create / Collection / Connect).

---

## 10. Out of scope (v1)

- Ecommerce / cart / pricing
- CMS or backend form delivery
- Artwork detail routes / lightbox
- Blog, journal, multi-language toggle
- Dark mode
- Auth

---

## 11. Verification checklist (implementation)

1. App runs with no console errors
2. TypeScript clean
3. Responsive: desktop, laptop, tablet, mobile (especially gallery + nav)
4. Nav smooth-scrolls to all sections; mobile menu works
5. Animations calm; reduced-motion respected
6. Images load; data-driven placeholders swappable
7. Form validation + demo state
8. A11y basics (focus, labels, semantics, contrast)
9. SEO meta present
10. No dead links or unfinished demo chrome

---

## 12. Implementation next step

After user approval of this written spec, create an implementation plan via the writing-plans skill, then build.
