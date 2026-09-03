# Suramya Arts & Crafts Shop Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the editorial gallery one-pager with a visual shop homepage that matches the approved mockup copy, sage/cream art style, and official Suramya logo.

**Architecture:** Keep the Vite SPA. Centralize copy in `siteContent` and images in `siteImages`. Compose `App.tsx` from shop section components. Shop/Search/Account/Bag remain non-navigating chrome. No backend, no extra routes.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS v4, Vitest + Testing Library, Google Fonts (Playfair Display + Montserrat)

## Global Constraints

- Follow `docs/superpowers/specs/2026-09-03-suramya-shop-homepage-design.md` exactly
- Logo: `public/brand/suramya-logo.png` — do not recolor or replace with a leaf-S
- Colors: cream `#F4EFE6`, cream-deep `#EBE4D8`, sage `#6B7D52`, sage-deep `#4F5C3C`, ink `#2C2822`, ink-soft `#6A635A`
- Fonts: Playfair Display (headlines), Montserrat (UI/body)
- Visual shop only: no cart drawer, search overlay, login, checkout, or contact form
- Hero headline locked: *Handmade with heart, crafted for joy.*
- Contact placeholders: `hello@suramya.art`, `+91 00000 00000`, `Studio, India`
- Respect `prefers-reduced-motion`
- Title: `Suramya Arts & Crafts — Handmade with heart, crafted for joy.`
- Commits: frequent, focused; do not commit secrets

---

## File structure

```
index.html
src/index.css
src/App.tsx
src/lib/focusRing.ts
src/data/content.ts
src/data/images.ts
src/components/AnnouncementBar.tsx
src/components/Header.tsx
src/components/Hero.tsx
src/components/ValueProps.tsx
src/components/CategoryGrid.tsx
src/components/About.tsx
src/components/CustomBanner.tsx
src/components/Footer.tsx
src/components/Reveal.tsx   # keep
```

Delete after App no longer imports them: `Navbar.tsx`, `Collections.tsx`, `Gallery.tsx`, `Contact.tsx`, `artworks.ts`, `validateContactForm.ts`, and their tests.

---

### Task 1: Theme tokens, fonts, SEO

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`
- Create: `src/lib/focusRing.ts`

**Interfaces:**
- Consumes: none
- Produces: Tailwind tokens `cream`, `cream-deep`, `sage`, `sage-deep`, `sage-muted`, `ink`, `ink-soft`, `ink-deep`; `--font-display` Playfair Display; `--font-sans` Montserrat; `focusRing` string export

- [ ] **Step 1: Update `src/index.css` theme fonts**

Set:

```css
--font-display: "Playfair Display", ui-serif, Georgia, serif;
--font-sans: "Montserrat", ui-sans-serif, system-ui, sans-serif;
```

Keep existing color tokens. Ensure `--color-ink-deep: #1c1915;` exists.

- [ ] **Step 2: Replace Google Fonts and metadata in `index.html`**

```html
<title>Suramya Arts & Crafts — Handmade with heart, crafted for joy.</title>
<meta
  name="description"
  content="Unique, artistic and joyful creations to brighten your space and moments."
/>
<meta property="og:title" content="Suramya Arts & Crafts — Handmade with heart, crafted for joy." />
<meta
  property="og:description"
  content="Unique, artistic and joyful creations to brighten your space and moments."
/>
```

Font stylesheet:

```
https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap
```

Remove Cormorant Garamond and Outfit.

- [ ] **Step 3: Add `src/lib/focusRing.ts`**

```ts
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream'
```

- [ ] **Step 4: Commit**

```bash
git add src/index.css index.html src/lib/focusRing.ts
git commit -m "chore: switch shop homepage tokens, fonts, and SEO"
```

---

### Task 2: Shop content and images

**Files:**
- Modify: `src/data/content.ts`
- Modify: `src/data/images.ts`
- Create: `src/data/content.test.ts`
- Delete: `src/data/artworks.ts`, `src/data/artworks.test.ts`

**Interfaces:**
- Consumes: none
- Produces: `siteContent` (brand, tagline, announcement, nav, hero, values, categories, about, custom, connect, footer, chromeLabels) and `siteImages` with `hero`, `about`, `categories` keyed by category `id`

- [ ] **Step 1: Write failing test `src/data/content.test.ts`**

```ts
import { describe, expect, it } from 'vitest'
import { siteContent } from './content'
import { siteImages } from './images'

describe('shop content', () => {
  it('has six shop categories matching images', () => {
    expect(siteContent.categories).toHaveLength(6)
    expect(siteContent.hero.headline).toBe(
      'Handmade with heart, crafted for joy.',
    )
    for (const category of siteContent.categories) {
      expect(siteImages.categories[category.id]).toMatch(/^https?:\/\//)
    }
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/data/content.test.ts`

Expected: FAIL (missing category ids or old content)

- [ ] **Step 3: Replace `src/data/content.ts`**

```ts
export const siteContent = {
  brand: 'Suramya',
  brandLine: 'Arts & Crafts',
  tagline: 'Handmade with heart, crafted for joy.',
  announcement: 'Handmade with love  •  Unique designs  •  Custom orders',
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Shop', href: '#categories' },
    { label: 'Categories', href: '#categories' },
    { label: 'Custom Orders', href: '#custom' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    headline: 'Handmade with heart, crafted for joy.',
    description:
      'Unique, artistic and joyful creations to brighten your space and moments.',
    cta: { label: 'Shop now', href: '#categories' },
  },
  values: [
    {
      id: 'handmade',
      title: '100% Handmade',
      description: 'Every piece is crafted by hand with care.',
    },
    {
      id: 'eco',
      title: 'Eco Friendly',
      description: 'Sustainable materials and mindful making.',
    },
    {
      id: 'gifting',
      title: 'Perfect Gifting',
      description: 'Thoughtful pieces for people you love.',
    },
    {
      id: 'custom',
      title: 'Custom Orders',
      description: 'Made to match your idea and space.',
    },
  ],
  categories: [
    { id: 'paint-kits', title: 'DIY Paint Kits' },
    { id: 'fridge-magnets', title: 'Fridge Magnets' },
    { id: 'clay-hangings', title: 'Clay Hangings' },
    { id: 'desktop-decor', title: 'Desktop Decor' },
    { id: 'texture-frames', title: 'Texture Art Frames' },
    { id: 'lippan-frames', title: 'Lippan Art Frames' },
  ],
  about: {
    eyebrow: 'About us',
    headline: 'Crafting happiness in every piece.',
    body: 'At Suramya Arts & Crafts, we make unique, artistic, and joyful pieces by hand — from clay and texture to color and small objects that brighten a home.',
    cta: { label: 'Learn more', href: '#about' },
  },
  custom: {
    message:
      'Looking for something special? We take customized orders to make your ideas come to life.',
    cta: { label: 'Order custom', href: '#custom' },
  },
  connect: {
    email: 'hello@suramya.art',
    instagram: '@suramya.studio',
    instagramUrl: 'https://instagram.com/suramya.studio',
    facebookUrl: '#',
    whatsappUrl: '#',
    phone: '+91 00000 00000',
    address: 'Studio, India',
  },
  footer: {
    statement: 'Handmade with heart, crafted for joy.',
    madeWith: 'Made with love',
  },
  chrome: {
    search: 'Search',
    account: 'Account',
    bag: 'Bag, 0 items',
  },
} as const

export type CategoryId = (typeof siteContent.categories)[number]['id']
```

Button labels in the mockup are uppercase; CSS `uppercase tracking-wide` on buttons is required so stored labels can stay title case for accessible names (`Shop now` vs shouting at screen readers). Visible text should still read SHOP NOW via CSS.

- [ ] **Step 4: Replace `src/data/images.ts`**

```ts
import type { CategoryId } from './content'

export const siteImages = {
  hero: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=80',
  about:
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80',
  categories: {
    'paint-kits':
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80',
    'fridge-magnets':
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'clay-hangings':
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'desktop-decor':
      'https://images.unsplash.com/photo-1485955900006-10f4d324d981?auto=format&fit=crop&w=800&q=80',
    'texture-frames':
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80',
    'lippan-frames':
      'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80',
  } satisfies Record<CategoryId, string>,
} as const
```

If TypeScript circular import is awkward, inline the six keys without importing `CategoryId` and keep `CategoryId` only in `content.ts`.

- [ ] **Step 5: Delete artwork modules**

Delete `src/data/artworks.ts` and `src/data/artworks.test.ts`.

- [ ] **Step 6: Run tests**

Run: `npx vitest run src/data/content.test.ts`

Expected: PASS. Other tests may fail until later tasks rewrite components — that is expected; do not revert content.

- [ ] **Step 7: Commit**

```bash
git add src/data src/data/content.test.ts
git commit -m "feat: replace portfolio copy with shop homepage content"
```

---

### Task 3: AnnouncementBar

**Files:**
- Create: `src/components/AnnouncementBar.tsx`
- Test: `src/components/AnnouncementBar.test.tsx`

**Interfaces:**
- Consumes: `siteContent.announcement`
- Produces: `export function AnnouncementBar(): JSX.Element`

- [ ] **Step 1: Write failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { AnnouncementBar } from './AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the announcement copy', () => {
    render(<AnnouncementBar />)
    expect(screen.getByText(siteContent.announcement)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/AnnouncementBar.test.tsx`

Expected: FAIL (module not found)

- [ ] **Step 3: Implement**

```tsx
import { siteContent } from '../data/content'

export function AnnouncementBar() {
  return (
    <p className="bg-sage-deep px-4 py-2 text-center font-sans text-xs font-medium tracking-wide text-cream sm:text-sm">
      {siteContent.announcement}
    </p>
  )
}
```

Use `sage-deep` + `text-cream` for contrast.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/AnnouncementBar.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/AnnouncementBar.tsx src/components/AnnouncementBar.test.tsx
git commit -m "feat: add sage announcement bar"
```

---

### Task 4: Header

**Files:**
- Create: `src/components/Header.tsx`
- Test: `src/components/Header.test.tsx`
- Delete later: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `siteContent.nav`, `siteContent.brand`, `siteContent.brandLine`, `siteContent.chrome`, `focusRing`
- Produces: `export function Header(): JSX.Element`

Reuse the existing `Navbar.tsx` a11y pattern: `aria-expanded`, Esc, Tab cycle, `inert` on `main` and `footer` while open.

- [ ] **Step 1: Write failing test**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Header } from './Header'

describe('Header', () => {
  it('renders logo lockup, nav links, and chrome buttons', () => {
    render(<Header />)
    expect(
      screen.getByRole('img', { name: siteContent.brand }),
    ).toHaveAttribute('src', '/brand/suramya-logo.png')
    expect(screen.getByText(siteContent.brandLine)).toBeInTheDocument()
    for (const item of siteContent.nav) {
      expect(screen.getAllByRole('link', { name: item.label }).length).toBeGreaterThan(0)
    }
    expect(screen.getByRole('button', { name: siteContent.chrome.search })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: siteContent.chrome.account })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: siteContent.chrome.bag })).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Header.test.tsx`

Expected: FAIL

- [ ] **Step 3: Implement Header**

Structure:

- Outer `<header className="sticky top-0 z-50 border-b border-ink/10 bg-cream">`
- Logo link `#top`: img `h-10` + stacked text `SURAMYA` (tracking-wide uppercase) and `Arts & Crafts` (smaller)
- Desktop `ul`: hidden until `md:flex`, centered via absolute or 3-column grid (`grid-cols-[auto_1fr_auto]`)
- Icon buttons: `type="button"` with SVG stroke icons (search, user, bag). Bag has a small sage circle with `0`. They must **not** be links.
- Mobile: hamburger; panel with nav links; copy inert logic from current `Navbar.tsx`

SVG icons: 22px, `stroke="currentColor"`, no fill. Keep inline in the file.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Header.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx src/components/Header.test.tsx
git commit -m "feat: add shop header with visual-only bag chrome"
```

---

### Task 5: Hero

**Files:**
- Modify: `src/components/Hero.tsx`
- Modify: `src/components/Hero.test.tsx`

**Interfaces:**
- Consumes: `siteContent.hero`, `siteImages.hero`, `focusRing`
- Produces: updated `Hero`

- [ ] **Step 1: Rewrite `Hero.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders headline, description, shop CTA, and hero image', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: siteContent.hero.headline }),
    ).toBeInTheDocument()
    expect(screen.getByText(siteContent.hero.description)).toBeInTheDocument()
    const cta = screen.getByRole('link', { name: /shop now/i })
    expect(cta).toHaveAttribute('href', '#categories')
    const image = document.querySelector(`img[src="${siteImages.hero}"]`)
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/components/Hero.test.tsx`

Expected: FAIL (old headline)

- [ ] **Step 3: Implement split hero**

```tsx
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { focusRing } from '../lib/focusRing'

export function Hero() {
  return (
    <section
      className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:py-16"
      aria-label="Introduction"
    >
      <div>
        <h1 className="font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          {siteContent.hero.headline}
        </h1>
        <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
          {siteContent.hero.description}
        </p>
        <a
          href={siteContent.hero.cta.href}
          className={`mt-8 inline-flex items-center rounded-md bg-sage-deep px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-cream hover:bg-ink ${focusRing}`}
        >
          {siteContent.hero.cta.label}
        </a>
      </div>
      <img
        src={siteImages.hero}
        alt="Handmade vases, framed art, and plants styled on a cream surface"
        className="h-72 w-full rounded-md object-cover sm:h-[28rem]"
        decoding="async"
        fetchPriority="high"
      />
    </section>
  )
}
```

No full-bleed overlay. Photo is the color.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/components/Hero.test.tsx`

Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "feat: rebuild shop hero split layout"
```

---

### Task 6: ValueProps

**Files:**
- Create: `src/components/ValueProps.tsx`
- Test: `src/components/ValueProps.test.tsx`

**Interfaces:**
- Consumes: `siteContent.values`
- Produces: `export function ValueProps(): JSX.Element`

- [ ] **Step 1: Write failing test** asserting all four `title` strings and descriptions.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement a 2×2 / `lg:grid-cols-4` grid.** Each item: 48px circle `border border-sage text-sage` with a simple inline SVG (hand, leaf, gift, spark). Headings `font-sans text-sm font-semibold uppercase`. Descriptions `text-ink-soft text-sm`.

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit** with message `feat: add handmade value prop row`

---

### Task 7: CategoryGrid

**Files:**
- Create: `src/components/CategoryGrid.tsx`
- Test: `src/components/CategoryGrid.test.tsx`

**Interfaces:**
- Consumes: `siteContent.categories`, `siteImages.categories`
- Produces: `export function CategoryGrid(): JSX.Element` with `id="categories"`

- [ ] **Step 1: Write failing test**

Section `#categories`, heading `Shop by category` (CSS uppercase on the visual if needed; accessible name can be the heading text). For each category: image alt includes title, link **Explore** href `#categories`.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement**

`grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6`. Images `aspect-square rounded-full object-cover w-40 mx-auto` (or `w-full max-w-[10rem]`). Title under image. Explore: `inline-flex rounded-md border border-sage-deep px-3 py-1.5 text-xs font-semibold uppercase text-sage-deep`. Wrap with `Reveal`.

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit** with message `feat: add shop-by-category circular grid`

---

### Task 8: About

**Files:**
- Modify: `src/components/About.tsx`
- Modify: `src/components/About.test.tsx`

**Interfaces:**
- Consumes: `siteContent.about`, `siteImages.about`

- [ ] **Step 1: Rewrite test** for eyebrow, headline `Crafting happiness in every piece.`, body, LEARN MORE → `#about`, about image src.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement** `id="about"` two-column: image `rounded-md object-cover`, copy with sage eyebrow uppercase, Playfair h2, LEARN MORE sage-deep button. Mobile image first (`order` or source order image then text).

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit** with message `feat: restyle About as shop story split`

---

### Task 9: CustomBanner

**Files:**
- Create: `src/components/CustomBanner.tsx`
- Test: `src/components/CustomBanner.test.tsx`

**Interfaces:**
- Consumes: `siteContent.custom`
- Produces: `id="custom"`

- [ ] **Step 1: Write failing test** for message text and link `Order custom` href `#custom`.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement** padded wrapper; inner `rounded-xl bg-sage-deep text-cream` flex wrap; gift SVG; cream button `text-sage-deep font-semibold uppercase`.

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit** with message `feat: add custom orders banner`

---

### Task 10: Footer

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Footer.test.tsx`

**Interfaces:**
- Consumes: `siteContent` nav, categories, connect, footer
- Produces: `<footer id="contact">` light cream-deep, four columns, not ink invert

- [ ] **Step 1: Rewrite test** for brand, statement, email mailto, phone text, address, `Made with love`, copyright `Suramya Arts & Crafts`.

- [ ] **Step 2: Run test to verify it fails**

- [ ] **Step 3: Implement four-column footer.** Social: Instagram (real URL), Facebook/WhatsApp `href="#"` with `aria-label`. Quick links from `siteContent.nav`. Category names link `#categories`. Get in Touch: mailto, tel link `tel:+910000000000` from digits, address as text. Bottom flex copyright + madeWith.

Focus rings on cream-deep: same `focusRing`.

- [ ] **Step 4: Run test to verify it passes**

- [ ] **Step 5: Commit** with message `feat: rebuild shop footer with contact placeholders`

---

### Task 11: Assemble App and remove old portfolio surfaces

**Files:**
- Modify: `src/App.tsx`
- Delete: `Navbar.tsx`, `Collections.tsx`, `Collections.test.tsx`, `Gallery.tsx`, `Gallery.test.tsx`, `Contact.tsx`, `Contact.test.tsx`, `src/lib/validateContactForm.ts`, `src/lib/validateContactForm.test.ts`

**Interfaces:**
- Consumes: all shop components
- Produces: homepage composition

- [ ] **Step 1: Set `App.tsx`**

```tsx
import { About } from './components/About'
import { AnnouncementBar } from './components/AnnouncementBar'
import { CategoryGrid } from './components/CategoryGrid'
import { CustomBanner } from './components/CustomBanner'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ValueProps } from './components/ValueProps'

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-cream text-ink">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <CategoryGrid />
        <About />
        <CustomBanner />
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Delete obsolete files listed above**

- [ ] **Step 3: Run full test suite**

Run: `npx vitest run`

Expected: all remaining tests PASS. Fix any leftover imports.

- [ ] **Step 4: Run `npx tsc --noEmit`**

Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src
git commit -m "feat: assemble shop homepage and remove gallery form"
```

---

### Task 12: Visual QA and contrast

**Files:**
- Modify only if QA finds issues (button contrast, wrapping announcement, mobile menu)

- [ ] **Step 1: `npm run dev` with `--host` if IPv4 clients fail (`127.0.0.1` vs `::1`)**

Vite on Windows may listen on `[::1]` only. If `localhost` refuses, use `npx vite --host 127.0.0.1`.

- [ ] **Step 2: Browser-check desktop and a narrow viewport:** announcement, header lockup, hero split, four values, six circles, about, banner, footer. Click SHOP NOW, EXPLORE, ORDER CUSTOM, Contact. Confirm Search/Account/Bag do not change route.

- [ ] **Step 3: Confirm `prefers-reduced-motion` does not break layout (Reveal still shows content).**

- [ ] **Step 4: Commit any QA fixes** with message `fix: polish shop homepage contrast and mobile layout`

---

## Spec coverage

| Spec section | Task |
|--------------|------|
| Tokens, type, SEO | 1 |
| Copy, images, categories | 2 |
| Announcement | 3 |
| Header + chrome | 4 |
| Hero | 5 |
| Values | 6 |
| Category grid | 7 |
| About | 8 |
| Custom banner | 9 |
| Footer contact | 10 |
| Replace old page | 11 |
| A11y / visual | 4, 12 |

## Type names to keep consistent

- `siteContent`, `siteImages`, `CategoryId`
- Components: `AnnouncementBar`, `Header`, `Hero`, `ValueProps`, `CategoryGrid`, `About`, `CustomBanner`, `Footer`
- Hash ids: `#top` `#categories` `#about` `#custom` `#contact`
