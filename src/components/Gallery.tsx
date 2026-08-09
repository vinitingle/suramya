import { artworks, type Artwork } from '../data/artworks'
import { Reveal } from './Reveal'

function spanClass(artwork: Artwork): string {
  if (artwork.featured && artwork.aspect === 'portrait') {
    return 'md:col-span-2 md:row-span-2'
  }
  if (artwork.featured || artwork.aspect === 'landscape') {
    return 'md:col-span-2'
  }
  if (artwork.aspect === 'portrait') {
    return 'md:row-span-2'
  }
  return ''
}

function mobileAspectClass(aspect: Artwork['aspect']): string {
  if (aspect === 'portrait') return 'aspect-[3/4]'
  if (aspect === 'landscape') return 'aspect-[4/3]'
  return 'aspect-square'
}

export function Gallery() {
  return (
    <section
      id="collection"
      className="relative overflow-hidden bg-cream px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="collection-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-sage-muted/40 via-transparent to-cream-deep/70"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <h2
            id="collection-heading"
            className="mb-14 font-display text-3xl tracking-wide text-ink sm:mb-20 sm:text-4xl"
          >
            The Collection
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 md:auto-rows-[14rem] md:grid-cols-4 md:gap-x-6 md:gap-y-16 lg:gap-x-8 lg:gap-y-20">
          {artworks.map((artwork, index) => (
            <Reveal key={artwork.id} className={`h-full ${spanClass(artwork)}`}>
              <figure className="group flex h-full flex-col">
                <div
                  className={`min-h-0 flex-1 overflow-hidden ${mobileAspectClass(artwork.aspect)} md:aspect-auto md:min-h-0`}
                >
                  <img
                    src={artwork.image}
                    alt={`${artwork.title}. ${artwork.description}`}
                    className="h-full min-h-0 w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading={index === 0 ? undefined : 'lazy'}
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-3 shrink-0 space-y-0.5">
                  <p className="font-display text-lg tracking-wide text-ink">
                    {artwork.title}
                  </p>
                  <p className="font-sans text-sm text-ink-soft">
                    {artwork.category}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
