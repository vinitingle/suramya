import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { focusRing } from '../lib/focusRing'
import { Reveal } from './Reveal'

export function About() {
  const { eyebrow, headline, body, cta } = siteContent.about

  return (
    <section
      id="about"
      className="bg-cream px-5 py-16 sm:px-8 sm:py-24"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <img
            src={siteImages.about}
            alt="Hands shaping clay in the Suramya studio"
            className="h-72 w-full rounded-md object-cover sm:h-[28rem]"
            loading="lazy"
            decoding="async"
          />
        </Reveal>

        <Reveal>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-sage sm:text-sm">
            {eyebrow}
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl lg:text-5xl"
          >
            {headline}
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
            {body}
          </p>
          <a
            href={cta.href}
            className={`mt-8 inline-flex items-center rounded-md bg-sage-deep px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-cream hover:bg-ink ${focusRing}`}
          >
            {cta.label}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
