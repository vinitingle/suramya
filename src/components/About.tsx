import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { Reveal } from './Reveal'

export function About() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="story-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream-deep/80 via-transparent to-sage-muted"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="story-heading"
            className="mb-12 font-display text-3xl tracking-wide text-ink sm:mb-16 sm:text-4xl"
          >
            The Story
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 lg:items-start">
          <Reveal className="lg:col-span-5">
            <blockquote className="border-l-2 border-sage pl-6 sm:pl-8">
              <p className="font-display text-3xl leading-snug text-ink sm:text-4xl md:text-5xl">
                {`\u201C${siteContent.story.quote}\u201D`}
              </p>
            </blockquote>
          </Reveal>

          <Reveal className="lg:col-span-7 space-y-5">
            {siteContent.story.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-prose font-sans text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-14 sm:mt-20">
          <img
            src={siteImages.about}
            alt="Textured art surfaces and materials from the Suramya studio"
            className="h-64 w-full object-cover sm:h-80 lg:h-[28rem]"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
      </div>
    </section>
  )
}
