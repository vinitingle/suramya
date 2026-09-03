import { siteContent } from '../data/content'
import { focusRing } from '../lib/focusRing'

export function CustomBanner() {
  const { message, cta } = siteContent.custom

  return (
    <section id="custom" className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 rounded-xl bg-sage-deep px-6 py-8 text-cream sm:px-10 sm:py-10">
        <div className="flex min-w-0 flex-1 items-start gap-4 sm:items-center">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="mt-0.5 h-6 w-6 shrink-0"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 10h16v10H4V10zm0 0V8a2 2 0 012-2h12a2 2 0 012 2v2M12 6V4m0 2c-1.5-2-4-2-4 0s2.5 2 4 0zm0 0c1.5-2 4-2 4 0s-2.5 2-4 0zM12 10v10"
            />
          </svg>
          <p className="font-sans text-base leading-relaxed sm:text-lg">{message}</p>
        </div>
        <a
          href={cta.href}
          className={`inline-flex shrink-0 items-center rounded-md bg-cream px-6 py-3 font-sans text-sm font-semibold uppercase tracking-wide text-sage-deep hover:bg-cream-deep ${focusRing}`}
        >
          {cta.label}
        </a>
      </div>
    </section>
  )
}
