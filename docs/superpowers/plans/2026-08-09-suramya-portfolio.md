# Suramya Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a premium one-page Suramya arts-and-crafts portfolio (Vite + React + TypeScript + Tailwind) matching the approved design spec.

**Architecture:** Single-page React app with section components, centralized content/image/artwork data, CSS design tokens from the cream/sage logo palette, and a demo contact form with unit-tested validation. No backend, no routes beyond `/`.

**Tech Stack:** Vite 6+, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vitest + Testing Library, Google Fonts (Cormorant Garamond + Outfit)

## Global Constraints

- Follow `docs/superpowers/specs/2026-08-09-suramya-portfolio-design.md` exactly for IA, copy direction, palette, and out-of-scope items
- Logo asset: `public/brand/suramya-logo.png` (already committed) — do not recolor
- Colors: cream `#F4EFE6`, sage `#6B7D52`, deep charcoal-brown ink; no purple/startup aesthetics
- Fonts: Cormorant Garamond (display), Outfit (body/UI/wordmark tracking)
- Tagline locked: *Simple concepts. Rich textures. Timeless beauty.*
- Contact placeholders: `hello@suramya.art`, `@suramya.studio` — no phone
- Sanskrit: whisper only (Devanagari line in hero + meaning in About)
- No lightbox, ecommerce, CMS, dark mode, or backend form
- Respect `prefers-reduced-motion`
- Title: `Suramya — Art Shaped by Simplicity`
- Commits: frequent, focused; do not commit secrets

---

## File structure (create)

```
index.html
package.json
vite.config.ts
tsconfig.json
tsconfig.app.json
tsconfig.node.json
vitest.config.ts
public/brand/suramya-logo.png          # exists
public/favicon.svg
src/main.tsx
src/App.tsx
src/vite-env.d.ts
src/index.css
src/data/content.ts
src/data/images.ts
src/data/artworks.ts
src/lib/validateContactForm.ts
src/lib/validateContactForm.test.ts
src/components/Reveal.tsx
src/components/Navbar.tsx
src/components/Hero.tsx
src/components/About.tsx
src/components/Collections.tsx
src/components/Gallery.tsx
src/components/Contact.tsx
src/components/Footer.tsx
```

---

### Task 1: Scaffold Vite + React + TS + Tailwind + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `vitest.config.ts`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/vite-env.d.ts`, `src/index.css`
- Preserve: `public/brand/suramya-logo.png`, `docs/**`

**Interfaces:**
- Produces: runnable Vite app at `npm run dev`; `npm test` runs Vitest; Tailwind via `@tailwindcss/vite`

- [ ] **Step 1: Scaffold the project in the repo root**

From `D:\Workspace\Personal\AIProjects\Suramya`, do **not** nest a subfolder. Create files manually or run Vite and move files up if needed.

```bash
npm create vite@latest . -- --template react-ts
```

If the tool refuses a non-empty directory (docs/public exist), scaffold in a temp folder and move `package.json`, `src`, `vite.config.ts`, tsconfigs, `index.html` into the repo root without deleting `docs/` or `public/brand/`.

- [ ] **Step 2: Install Tailwind v4, Vitest, Testing Library**

```bash
npm install
npm install @tailwindcss/vite tailwindcss
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 3: Configure Vite**

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
})
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Replace default App with a smoke shell**

`src/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-cream: #f4efe6;
  --color-cream-deep: #ebe4d8;
  --color-sage: #6b7d52;
  --color-sage-muted: color-mix(in srgb, #6b7d52 18%, transparent);
  --color-ink: #2c2822;
  --color-ink-soft: #6a635a;
  --font-display: "Cormorant Garamond", ui-serif, Georgia, serif;
  --font-sans: "Outfit", ui-sans-serif, system-ui, sans-serif;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

body {
  margin: 0;
  font-family: var(--font-sans);
  color: var(--color-ink);
  background-color: var(--color-cream);
  -webkit-font-smoothing: antialiased;
}
```

`index.html` — set title and font links:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Suramya — Art Shaped by Simplicity</title>
    <meta
      name="description"
      content="Suramya is an arts and crafts project creating minimalist textured artworks, layered compositions, and handcrafted clay pieces where simple ideas become objects of beauty."
    />
    <meta property="og:title" content="Suramya — Art Shaped by Simplicity" />
    <meta
      property="og:description"
      content="Minimalist textured artworks, layered compositions, and handcrafted clay pieces."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/brand/suramya-logo.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <p className="p-8 font-display text-3xl">Suramya</p>
    </main>
  )
}
```

- [ ] **Step 5: Create favicon placeholder**

`public/favicon.svg` — simple sage “S” mark on cream:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" fill="#F4EFE6"/>
  <text x="16" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="16" fill="#6B7D52">S</text>
</svg>
```

- [ ] **Step 6: Verify scaffold**

```bash
npm run build
npm test
```

Expected: build succeeds; Vitest runs with 0 tests (or pass). `npm run dev` shows cream page with “Suramya”.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig*.json vitest.config.ts index.html public/favicon.svg src
git commit -m "chore: scaffold Vite React TS Tailwind for Suramya"
```

---

### Task 2: Content, images, and artwork data modules

**Files:**
- Create: `src/data/content.ts`, `src/data/images.ts`, `src/data/artworks.ts`
- Test: `src/data/artworks.test.ts`

**Interfaces:**
- Produces:
  - `export const siteContent` with `nav`, `hero`, `story`, `categories`, `connect`, `footer`, `contact`
  - `export const siteImages: { hero, about, categories: Record<CategoryId, string> }`
  - `export type Artwork = { id: string; title: string; category: string; image: string; description: string; featured?: boolean; aspect: 'portrait' | 'landscape' | 'square' }`
  - `export const artworks: Artwork[]` (exactly 8 items)

- [ ] **Step 1: Write failing test for artworks shape**

`src/data/artworks.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { artworks } from './artworks'

describe('artworks', () => {
  it('exports eight pieces with required fields', () => {
    expect(artworks).toHaveLength(8)
    for (const piece of artworks) {
      expect(piece.id).toBeTruthy()
      expect(piece.title).toBeTruthy()
      expect(piece.category).toBeTruthy()
      expect(piece.image).toMatch(/^https?:\/\//)
      expect(piece.description.length).toBeGreaterThan(10)
      expect(['portrait', 'landscape', 'square']).toContain(piece.aspect)
    }
    expect(artworks.filter((a) => a.featured).length).toBeGreaterThanOrEqual(1)
  })
})
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm test
```

Expected: FAIL — cannot find module `./artworks`

- [ ] **Step 3: Implement data modules**

`src/data/images.ts` — use Unsplash (or similar) URLs that read as textured/handmade/neutral. Keep all URLs in this file / artworks only:

```ts
export const siteImages = {
  hero:
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=2000&q=80',
  about:
    'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80',
  categories: {
    textured:
      'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=1200&q=80',
    script:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=1200&q=80',
    paintings:
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=1200&q=80',
    clay:
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
  },
} as const

export type CategoryId = keyof typeof siteImages.categories
```

`src/data/artworks.ts` — 8 items with mixed `aspect`, at least one `featured: true`, categories matching Textured Works / Script & Layers / Quiet Paintings / Clay Pieces. Use distinct Unsplash IDs.

`src/data/content.ts`:

```ts
export const siteContent = {
  brand: 'Suramya',
  tagline: 'Simple concepts. Rich textures. Timeless beauty.',
  nav: [
    { label: 'The Story', href: '#story' },
    { label: 'What We Create', href: '#create' },
    { label: 'The Collection', href: '#collection' },
    { label: 'Connect', href: '#connect' },
  ],
  hero: {
    devanagari: 'सुरम्य',
    description:
      'Suramya is an arts and crafts project creating minimalist textured artworks, layered compositions, and handcrafted clay pieces where simple ideas become objects of beauty.',
    cta: { label: 'Explore the collection', href: '#collection' },
  },
  story: {
    quote: 'Beauty does not always need complexity.',
    paragraphs: [
      'Suramya is a Sanskrit word meaning beautiful, charming, and picturesque — a name that guides every piece we make.',
      'We work with texture, layers, scripts, and clay, transforming simple ideas into visually meaningful objects. Not decoration for its own sake, but quiet work with character.',
      'Our philosophy is minimalism with depth: less form, more feeling; less noise, more craft.',
    ],
  },
  categories: [
    {
      id: 'textured',
      title: 'Textured Works',
      description:
        'Layered and tactile artworks where surface and depth become part of the visual story.',
    },
    {
      id: 'script',
      title: 'Script & Layers',
      description:
        'Compositions that weave typography, symbols, and scripts into quiet, layered narratives.',
    },
    {
      id: 'paintings',
      title: 'Quiet Paintings',
      description:
        'Simple paintings focused on composition, balance, and visual calm.',
    },
    {
      id: 'clay',
      title: 'Clay Pieces',
      description:
        'Handcrafted showpieces in dried clay, shaped around simple and creative ideas.',
    },
  ],
  connect: {
    heading: 'Connect',
    intro:
      'Enquire about available work, commission a custom piece, or begin a collaboration.',
    email: 'hello@suramya.art',
    instagram: '@suramya.studio',
    instagramUrl: 'https://instagram.com/suramya.studio',
    demoNotice: 'This form is a demo — messages are not sent yet.',
    enquiryTypes: [
      'General enquiry',
      'Available artwork',
      'Custom commission',
      'Collaboration',
    ],
  },
  footer: {
    statement: 'Art shaped by simplicity, texture and imagination.',
  },
} as const
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add src/data
git commit -m "feat: add Suramya content, image, and artwork data"
```

---

### Task 3: Contact form validation (TDD)

**Files:**
- Create: `src/lib/validateContactForm.ts`, `src/lib/validateContactForm.test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type ContactFormValues = {
    name: string
    email: string
    enquiryType: string
    message: string
  }
  export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>
  export function validateContactForm(values: ContactFormValues): ContactFormErrors
  ```
- Rules: name required (trim, min 2); email required + basic pattern; enquiryType required; message required (trim, min 10)

- [ ] **Step 1: Write failing tests**

```ts
import { describe, expect, it } from 'vitest'
import { validateContactForm } from './validateContactForm'

describe('validateContactForm', () => {
  it('returns errors for empty values', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      enquiryType: '',
      message: '',
    })
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.enquiryType).toBeTruthy()
    expect(errors.message).toBeTruthy()
  })

  it('rejects invalid email', () => {
    const errors = validateContactForm({
      name: 'Asha',
      email: 'not-an-email',
      enquiryType: 'General enquiry',
      message: 'I would love to know more about your clay pieces.',
    })
    expect(errors.email).toBeTruthy()
  })

  it('returns empty object for valid input', () => {
    const errors = validateContactForm({
      name: 'Asha',
      email: 'asha@example.com',
      enquiryType: 'Custom commission',
      message: 'I would love a textured piece for a quiet hallway.',
    })
    expect(errors).toEqual({})
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npm test -- src/lib/validateContactForm.test.ts
```

- [ ] **Step 3: Implement `validateContactForm`**

```ts
export type ContactFormValues = {
  name: string
  email: string
  enquiryType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(email)) errors.email = 'Please enter a valid email.'
  if (!values.enquiryType.trim()) errors.enquiryType = 'Please select an enquiry type.'
  if (message.length < 10) errors.message = 'Please share a little more detail.'

  return errors
}
```

- [ ] **Step 4: Run — expect PASS**

```bash
npm test -- src/lib/validateContactForm.test.ts
```

- [ ] **Step 5: Commit**

```bash
git add src/lib
git commit -m "feat: add contact form validation"
```

---

### Task 4: Reveal + Navbar

**Files:**
- Create: `src/components/Reveal.tsx`, `src/components/Navbar.tsx`
- Modify: `src/App.tsx` (mount Navbar temporarily)

**Interfaces:**
- Consumes: `siteContent.nav`, `siteContent.brand`
- Produces: `<Reveal>` (IntersectionObserver fade-up); `<Navbar>` sticky, mobile menu, smooth scroll, `aria` attributes

- [ ] **Step 1: Implement `Reveal.tsx`**

```tsx
import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealProps = {
  children: ReactNode
  className?: string
}

export function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}
```

- [ ] **Step 2: Implement `Navbar.tsx`**

Requirements:
- Sticky top; cream/blur background that strengthens after scroll
- Logo image `/brand/suramya-logo.png` (height ~40–48px) linking to `#top`
- Desktop links from `siteContent.nav`
- Mobile hamburger; Esc closes; focus moves reasonably; `aria-expanded` / `aria-controls`
- On link click: close menu

Use Tailwind classes with `bg-cream`, `text-ink`, `text-sage` focus rings.

- [ ] **Step 3: Wire into App and verify manually**

```tsx
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <Navbar />
      <div className="h-[200vh]" aria-hidden />
    </div>
  )
}
```

Run `npm run dev` — check sticky nav, mobile menu, focus styles.

- [ ] **Step 4: Commit**

```bash
git add src/components/Reveal.tsx src/components/Navbar.tsx src/App.tsx
git commit -m "feat: add Reveal and sticky Navbar"
```

---

### Task 5: Hero

**Files:**
- Create: `src/components/Hero.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `siteContent.hero`, `siteContent.tagline`, `siteImages.hero`, logo path

- [ ] **Step 1: Implement Hero**

Layout:
- Full-bleed background image (`siteImages.hero`) with soft cream/ink gradient for text legibility (restrained, not a sticker overlay)
- Logo dominant
- Devanagari whisper under brand
- Tagline (display serif or tracked line)
- Description + CTA button/link to `#collection`
- First viewport reads as one composition; no cards/stats

Include `id` only if needed; page top is `#top`.

- [ ] **Step 2: Mount in App under Navbar; visual check desktop + mobile**

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx src/App.tsx
git commit -m "feat: add Suramya hero section"
```

---

### Task 6: About (The Story)

**Files:**
- Create: `src/components/About.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `siteContent.story`, `siteImages.about`
- Section: `<section id="story">`

- [ ] **Step 1: Implement two-column editorial About**

Left: large quote in `font-display`. Right: paragraphs. Optional image below or beside on large screens. Wrap blocks in `Reveal`.

- [ ] **Step 2: Mount + verify heading hierarchy (`h2` for section)**

- [ ] **Step 3: Commit**

```bash
git add src/components/About.tsx src/App.tsx
git commit -m "feat: add The Story about section"
```

---

### Task 7: Collections (What We Create)

**Files:**
- Create: `src/components/Collections.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `siteContent.categories`, `siteImages.categories`
- Section: `<section id="create">`

- [ ] **Step 1: Implement category presentation**

For each category: image + title + description. Use alternating layout on desktop (image left/right), stacked on mobile. **No card chrome** (avoid heavy borders/shadows/rounded product cards).

- [ ] **Step 2: Mount + verify**

- [ ] **Step 3: Commit**

```bash
git add src/components/Collections.tsx src/App.tsx
git commit -m "feat: add What We Create categories"
```

---

### Task 8: Gallery (The Collection)

**Files:**
- Create: `src/components/Gallery.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `artworks` from `src/data/artworks.ts`
- Section: `<section id="collection">`

- [ ] **Step 1: Implement asymmetrical gallery**

- CSS grid with varied `row`/`col` spans based on `featured` and `aspect`
- Image: `loading="lazy"` (except optionally first), `alt` from title/description
- Subtle caption (title + category)
- Soft `group-hover:scale` on image inside `overflow-hidden`
- Mobile: single column with intentional spacing

- [ ] **Step 2: Mount + verify 8 works render from data**

- [ ] **Step 3: Commit**

```bash
git add src/components/Gallery.tsx src/App.tsx
git commit -m "feat: add asymmetrical Collection gallery"
```

---

### Task 9: Contact + Footer + App assembly

**Files:**
- Create: `src/components/Contact.tsx`, `src/components/Footer.tsx`
- Modify: `src/App.tsx` (final composition)

**Interfaces:**
- Consumes: `siteContent.connect`, `siteContent.footer`, `validateContactForm`
- Section: `<section id="connect">`

- [ ] **Step 1: Implement Contact**

- Intro + email mailto + Instagram link (placeholders)
- Form fields: name, email, enquiryType (`select`), message
- Labels associated via `htmlFor` / `id`
- On submit: preventDefault → validate → if errors show inline; if ok set demo success state showing `siteContent.connect.demoNotice`
- Visible focus; sage accent on focus rings

- [ ] **Step 2: Implement Footer**

Brand, statement, email, Instagram, `© {year} Suramya`

- [ ] **Step 3: Final App composition**

```tsx
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Collections } from './components/Collections'
import { Gallery } from './components/Gallery'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Collections />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
```

Remove temporary spacer from Task 4.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.tsx src/components/Footer.tsx src/App.tsx
git commit -m "feat: add Connect form, Footer, and assemble page"
```

---

### Task 10: Polish, a11y, responsive QA, verification

**Files:**
- Modify: any component/CSS as needed for spacing, contrast, mobile nav, gallery rhythm
- Verify: build, tests, manual checklist from spec §11

- [ ] **Step 1: Run automated checks**

```bash
npm test
npm run build
```

Expected: all tests pass; production build succeeds with no errors.

- [ ] **Step 2: Manual QA checklist**

1. Nav links scroll to Story / Create / Collection / Connect
2. Mobile menu open/close + Esc
3. Hero logo + Devanagari + tagline + CTA
4. Gallery asymmetrical on desktop; stacked well on mobile
5. Form: empty submit shows errors; valid submit shows demo notice
6. Keyboard tab through nav + form with visible focus
7. Toggle OS reduced motion — no jarring animation
8. No console errors
9. Meta title/description present in `index.html`
10. Design test: feels like boutique art studio, not template/ecommerce

- [ ] **Step 3: Fix any issues found; re-run `npm test` && `npm run build`**

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "polish: refine Suramya portfolio a11y and responsive details"
```

(Only if there are polish changes; skip empty commit.)

---

## Spec coverage (self-review)

| Spec area | Task(s) |
|-----------|---------|
| Vite/React/TS/Tailwind | 1 |
| Brand tokens, fonts, SEO meta | 1 |
| Content/image/artwork separation | 2 |
| Contact validation | 3 |
| Nav + Reveal + reduced motion | 4 |
| Hero + Devanagari whisper | 5 |
| Story two-column | 6 |
| What We Create categories | 7 |
| Collection gallery | 8 |
| Connect form demo + Footer | 9 |
| Verification checklist | 10 |
| Logo asset | preserved from repo; used in Nav/Hero |
| Out of scope (lightbox, backend, shop) | not planned |

**Placeholder scan:** none intentional.  
**Type consistency:** `CategoryId` aligns `content.categories[].id` with `siteImages.categories` keys; `Artwork` fields used by Gallery; `ContactFormValues` shared by Contact + validator.
