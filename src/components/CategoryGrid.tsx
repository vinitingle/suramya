import { siteContent, type CategoryId } from '../data/content'
import { siteImages } from '../data/images'
import { focusRing } from '../lib/focusRing'
import { Reveal } from './Reveal'

export function CategoryGrid() {
  return (
    <section
      id="categories"
      className="bg-cream px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="categories-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="categories-heading"
            className="mb-14 font-display text-3xl uppercase tracking-wide text-ink sm:mb-20 sm:text-4xl"
          >
            Shop by category
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {siteContent.categories.map((category) => {
            const imageSrc = siteImages.categories[category.id as CategoryId]

            return (
              <Reveal
                key={category.id}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={imageSrc}
                  alt={category.title}
                  className="mx-auto aspect-square w-full max-w-40 rounded-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <h3 className="mt-4 font-sans text-sm font-semibold text-ink">
                  {category.title}
                </h3>
                <a
                  href="#categories"
                  className={`mt-3 inline-flex rounded-md border border-sage-deep px-3 py-1.5 text-xs font-semibold uppercase text-sage-deep ${focusRing}`}
                >
                  Explore
                </a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
