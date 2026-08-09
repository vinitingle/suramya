import { siteContent } from '../data/content'
import { siteImages } from '../data/images'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

export function Hero() {
  return (
    <section
      className="relative flex min-h-[calc(100svh-4.5rem)] items-end overflow-hidden sm:min-h-[calc(100svh-5rem)]"
      aria-label="Introduction"
    >
      <img
        src={siteImages.hero}
        alt=""
        className="absolute inset-0 h-full w-full object-cover motion-safe:animate-[hero-image-in_1.4s_ease-out_both]"
        decoding="async"
        fetchPriority="high"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-cream via-cream/80 to-ink/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-cream/55 via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-5 pb-16 pt-24 sm:gap-6 sm:px-8 sm:pb-20 sm:pt-28">
        <img
          src="/brand/suramya-logo.png"
          alt={siteContent.brand}
          className="h-16 w-auto sm:h-20 md:h-24 motion-safe:animate-[hero-rise_0.9s_ease-out_both]"
        />

        <p
          className="font-display text-lg text-sage/55 sm:text-xl motion-safe:animate-[hero-rise_0.9s_ease-out_0.12s_both]"
          lang="hi"
        >
          {siteContent.hero.devanagari}
        </p>

        <h1 className="max-w-xl font-display text-3xl leading-tight text-ink sm:text-4xl md:text-5xl motion-safe:animate-[hero-rise_0.9s_ease-out_0.22s_both]">
          {siteContent.tagline}
        </h1>

        <p className="max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg motion-safe:animate-[hero-rise_0.9s_ease-out_0.32s_both]">
          {siteContent.hero.description}
        </p>

        <a
          href={siteContent.hero.cta.href}
          className={`mt-1 inline-flex items-center rounded-sm bg-sage-deep px-6 py-3 font-sans text-sm tracking-wide text-cream transition-colors hover:bg-ink motion-safe:animate-[hero-rise_0.9s_ease-out_0.42s_both] ${focusRing}`}
        >
          {siteContent.hero.cta.label}
        </a>
      </div>
    </section>
  )
}
