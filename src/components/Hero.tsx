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
