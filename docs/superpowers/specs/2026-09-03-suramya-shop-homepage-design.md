# Suramya Arts & Crafts — Shop Homepage Design Spec

**Date:** 2026-09-03  
**Status:** Approved for planning  
**Product:** One-page visual shop homepage for **Suramya Arts & Crafts**, replacing the editorial gallery one-pager.

**Reference:** WhatsApp mockup “SURAMYA Arts & Crafts” (sage/cream handmade shop). Match its wordings, art style, and color roles. Do not copy The Artment ecommerce chrome from the prior experiment.

---

## 1. Goal

Rebuild the existing Vite app as a **visual shop homepage** that looks and reads like the mockup: warm cream canvas, sage buttons, serif headlines, circular category tiles, and handmade/botanical photography.

**Success test:** A first-time visitor should recognize a joyful handmade crafts shop (not a quiet museum catalogue, not a sale-heavy Shopify store).

---

## 2. Decisions locked

| Topic | Choice |
|-------|--------|
| Relation to current site | **Replace** the editorial one-pager |
| Scope | **Faithful one-page** recreation of the mockup, section-for-section |
| Commerce | **Visual only** — Shop, Search, Profile, bag are UI chrome; no checkout, cart drawer, search overlay, or login |
| Logo | Official asset `public/brand/suramya-logo.png`; do not invent a leaf-S mark |
| Type | **Playfair Display** (headlines) + **Montserrat** (nav, labels, buttons, body) |
| Contact | Placeholders: `hello@suramya.art`, Instagram, sample phone and address in footer |
| Contact form | **None** on this homepage |
| Backend | None |
| Stack | Keep Vite + React + TypeScript + Tailwind CSS + Vitest |

---

## 3. Brand and visual identity

### 3.1 Logo

- Source of truth: `public/brand/suramya-logo.png`
- Header lockup: logo mark + stacked or inline **SURAMYA** / **Arts & Crafts** in Montserrat (or similar), sage/ink, matching the mockup’s two-line name — without replacing the official mark
- Do not recolor the PNG

### 3.2 Color tokens

Keep cream/sage/ink family; retarget **roles** to the mockup (sage is a shop accent again, not a whisper-only chrome).

| Token | Role | Value |
|-------|------|--------|
| `--cream` | Page background | `#F4EFE6` |
| `--cream-deep` | Footer / slightly deeper bands | `#EBE4D8` |
| `--sage` | Announcement bar, primary buttons, logo-adjacent UI | `#6B7D52` |
| `--sage-deep` | Custom-order banner, hover, contrast-safe sage | `#4F5C3C` |
| `--sage-muted` | Hairlines, circular icon wells | sage at low opacity |
| `--ink` | Primary text | `#2C2822` |
| `--ink-soft` | Captions, secondary | `#6A635A` |
| `--ink-deep` | Optional dark text on cream if needed | `#1C1915` |

Buttons: **cream/white type on sage** (use `sage-deep` if contrast fails WCAG AA). Custom banner: **sage-deep** fill, cream type, **cream** button with sage-deep label.

No neon, no purple/blue startup palette, no sale-red badges.

### 3.3 Typography

| Role | Font |
|------|------|
| Headlines (hero, about, section titles) | Playfair Display |
| Nav, labels, buttons, body, footer lists | Montserrat |
| Official wordmark in the PNG | Do not restyle the bitmap |

Google Fonts load in `index.html` replaces Cormorant Garamond + Outfit.

### 3.4 Art style

- Botanical / handmade photography (still-life products, clay-making hands, circular product crops)
- Thin line icons in circles for value props
- Generous cream space
- Slightly rounded rectangles on buttons and the custom banner (not pill-heavy, not card-shadow SaaS)
- Color in the UI is mostly sage; saturation lives in photos

### 3.5 Motion

- Soft hover on category images and buttons
- Smooth anchor scroll
- Respect `prefers-reduced-motion`
- No bounce, confetti, or heavy parallax

---

## 4. Information architecture

**One page.** Hash targets:

| Nav / CTA | Target |
|-----------|--------|
| Home | `#top` |
| Shop | `#categories` |
| Categories | `#categories` |
| Custom Orders | `#custom` |
| About Us | `#about` |
| Contact | `#contact` |
| SHOP NOW / EXPLORE | `#categories` |
| LEARN MORE | `#about` |
| ORDER CUSTOM | `#custom` |

Search, Profile, and Bag **do not navigate**. They are buttons with accessible names. Bag badge shows `0`. No drawer, modal, or toast required.

Mobile: hamburger + overlay/panel with the six nav links; focus trap and Esc to close (reuse current nav a11y pattern).

---

## 5. Page sections (top to bottom)

### 5.1 Announcement bar

Full-width sage (or sage-deep) bar, cream type, small Montserrat.

**Copy:** `Handmade with love  •  Unique designs  •  Custom orders`

(Equivalent to the mockup top bar; bullets/dots as separators.)

### 5.2 Header

- Left: official logo + **SURAMYA** / **Arts & Crafts**
- Center (desktop): Home, Shop, Categories, Custom Orders, About Us, Contact
- Right: Search, Account, Bag (badge `0`)
- Cream background; hairline under header optional
- Sticky is allowed if it stays light and simple

### 5.3 Hero

Two columns on desktop: copy left, lifestyle photo right.

- Headline (Playfair): **Handmade with heart, crafted for joy.**
- Subline: **Unique, artistic and joyful creations to brighten your space and moments.**
- CTA: **SHOP NOW** → `#categories` (sage button, cream type, optional chevron)

Photo: warm still-life (vases, framed botanical art, plant) on cream — `siteImages.hero`. Easy to replace.

Mobile: photo below copy.

### 5.4 Value props

Four items in a row (2×2 on small screens). Each: thin-line icon in a circle, heading, one short supporting line.

| Heading | Supporting line |
|---------|-----------------|
| 100% Handmade | Every piece is crafted by hand with care. |
| Eco Friendly | Sustainable materials and mindful making. |
| Perfect Gifting | Thoughtful pieces for people you love. |
| Custom Orders | Made to match your idea and space. |

Headings match the mockup. Supporting lines are short shop-tone lines (the mockup’s small print was not fully legible); do not use the old editorial Sanskrit copy here.

### 5.5 Shop by category

Centered heading: **SHOP BY CATEGORY**

Six circular images with title + outlined **EXPLORE** (sage border, sage type) linking to `#categories` (same page; visual only).

Order:

1. DIY Paint Kits  
2. Fridge Magnets  
3. Clay Hangings  
4. Desktop Decor  
5. Texture Art Frames  
6. Lippan Art Frames  

Layout: 2 columns mobile, 3 tablet, 6 desktop.

### 5.6 About

Two columns: craft photo left, copy right (stack on mobile: image first).

- Eyebrow: **ABOUT US**
- Headline: **Crafting happiness in every piece.**
- Body: *At Suramya Arts & Crafts, we make unique, artistic, and joyful pieces by hand — from clay and texture to color and small objects that brighten a home.*
- CTA: **LEARN MORE** → `#about` (in-page; button may scroll to the start of this section or stay put as a visual match)

Photo: hands working clay / green craft — `siteImages.about`.

### 5.7 Custom orders banner

Full-width rounded sage-deep band.

- Optional gift/line icon
- **Looking for something special? We take customized orders to make your ideas come to life.**
- Button: **ORDER CUSTOM** (cream fill, sage-deep type) → `#custom` (this banner’s id is `#custom`)

### 5.8 Footer

Id `#contact`. Cream-deep or cream background (mockup is light, not inverted ink). Four columns on desktop:

1. Logo + short line: *Handmade with heart, crafted for joy.* Social: Instagram, Facebook, WhatsApp, Email as links (placeholders; WhatsApp/Facebook may be `#` with `aria-label`).
2. **Quick Links:** Home, Shop, Categories, Custom Orders, About Us, Contact (same hashes).
3. **Categories:** the six category names (hash `#categories`).
4. **Get in Touch:**  
   - Email: `hello@suramya.art`  
   - Phone placeholder: `+91 00000 00000`  
   - Address placeholder: `Studio, India`  

Optional faint botanical line art; skip if it fights cleanliness.

Bottom bar: `© 2026 Suramya Arts & Crafts` · **Made with love**

---

## 6. Images

Centralize in `src/data/images.ts` (and category list in `src/data/content.ts`).

- `hero` — lifestyle still-life  
- `about` — making / clay hands  
- `categories[id]` — six circular crops  

Use high-quality Unsplash (or local `public/`) placeholders with honest `alt` text. Lazy-load below the fold. `fetchPriority="high"` on hero.

---

## 7. What we are not building

- Product listing pages, PDP, cart, checkout, payments  
- Search results, account, auth  
- Announcement rotating carousel  
- Old sections: editorial gallery grid, contact form, Devanagari hero whisper, inverted ink footer  
- Real phone/address until the owner supplies them  

---

## 8. Code architecture

Replace `App.tsx` composition. New/replaced components:

- `AnnouncementBar`
- `Header` (replaces `Navbar`)
- `Hero`
- `ValueProps`
- `CategoryGrid` (replaces `Collections`)
- `About`
- `CustomBanner`
- `Footer`

Remove from the homepage (delete or stop importing): `Gallery`, `Contact` form, old `Collections` layout.

Keep `Reveal` if it still fits calm fade-in.

Data: `siteContent` + `siteImages` rewritten for shop copy. Drop `artworks.ts` from the homepage (delete file only if nothing else imports it).

Tests: rewrite component tests to the new headings and categories; remove gallery/contact-form tests that no longer apply. Keep Vitest + Testing Library.

SEO: `index.html` title **Suramya Arts & Crafts** — handmade with heart, crafted for joy. Meta description from the hero subline.

---

## 9. Accessibility

- Landmarks: banner (announcement + header), `main`, `contentinfo`
- Icon buttons: `aria-label` Search, Account, Bag
- Bag: `aria-label="Bag, 0 items"`
- Visible focus rings (sage-deep on cream)
- Mobile menu: `aria-expanded`, Esc, inert on `main`/`footer` while open
- Category images: alt includes category name
- Contrast: cream on sage-deep for announcement and primary buttons if sage alone fails AA

---

## 10. Out of scope / later

- Real commerce  
- Owner-supplied photos  
- Real phone, address, WhatsApp number  
- Separate Shop / Category / Custom Orders pages  

---

## 11. Spec self-review

- No TBD commerce: visual-only is explicit.  
- Supporting lines under value props are specified (mockup microcopy was not fully readable).  
- LEARN MORE has no second about page; it stays on `#about`.  
- Official logo vs mockup leaf-S: official PNG wins.  
- Scope is one homepage, not a platform.
