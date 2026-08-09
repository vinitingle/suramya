import { siteContent } from '../data/content'
import { siteImages, type CategoryId } from '../data/images'
import { Reveal } from './Reveal'

export function Collections() {
  return (
    <section
      id="create"
      className="relative overflow-hidden bg-cream-deep px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="create-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tl from-sage-muted via-transparent to-cream/60"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="create-heading"
            className="mb-14 font-display text-3xl tracking-wide text-ink sm:mb-20 sm:text-4xl"
          >
            What We Create
          </h2>
        </Reveal>

        <div className="space-y-16 sm:space-y-24">
          {siteContent.categories.map((category, index) => {
            const imageSrc = siteImages.categories[category.id as CategoryId]
            const reverse = index % 2 === 1

            return (
              <Reveal key={category.id}>
                <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                  <img
                    src={imageSrc}
                    alt={category.title}
                    className={`h-64 w-full object-cover sm:h-80 lg:h-[22rem] ${
                      reverse ? 'lg:order-2' : ''
                    }`}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className={`max-w-md ${reverse ? 'lg:order-1' : ''}`}>
                    <h3 className="font-display text-2xl tracking-wide text-ink sm:text-3xl">
                      {category.title}
                    </h3>
                    <p className="mt-4 font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
                      {category.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
