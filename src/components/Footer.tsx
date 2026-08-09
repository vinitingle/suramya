import { siteContent } from '../data/content'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-sage-muted bg-cream px-5 py-14 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-md">
          <p className="font-display text-2xl tracking-[0.12em] text-ink uppercase">
            {siteContent.brand}
          </p>
          <p className="mt-3 font-sans text-sm leading-relaxed text-ink-soft sm:text-base">
            {siteContent.footer.statement}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href={`mailto:${siteContent.connect.email}`}
            className={`w-fit rounded-sm font-sans text-sm text-sage underline-offset-4 hover:underline ${focusRing}`}
          >
            {siteContent.connect.email}
          </a>
          <a
            href={siteContent.connect.instagramUrl}
            className={`w-fit rounded-sm font-sans text-sm text-sage underline-offset-4 hover:underline ${focusRing}`}
            target="_blank"
            rel="noreferrer"
          >
            {siteContent.connect.instagram}
          </a>
          <p className="mt-2 font-sans text-xs tracking-wide text-ink-soft">
            {`© ${year} Suramya`}
          </p>
        </div>
      </div>
    </footer>
  )
}
