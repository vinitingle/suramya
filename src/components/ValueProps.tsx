import { siteContent } from '../data/content'
import { Reveal } from './Reveal'

const icons: Record<(typeof siteContent.values)[number]['id'], JSX.Element> = {
  handmade: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 14v-3.5a1.5 1.5 0 013 0V13m0 0V9.5a1.5 1.5 0 013 0V13m0 0V10a1.5 1.5 0 013 0v5.5a4.5 4.5 0 01-9 0V11a1.5 1.5 0 013 0v3"
      />
    </svg>
  ),
  eco: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4-3.5-7-6.8-7-10.5A4.5 4.5 0 0112 6a4.5 4.5 0 017 4.5C19 14.2 16 17.5 12 21z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 11v6m0 0l-2-2m2 2l2-2" />
    </svg>
  ),
  gifting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 10h16v10H4V10zm0 0V8a2 2 0 012-2h12a2 2 0 012 2v2M12 6V4m0 2c-1.5-2-4-2-4 0s2.5 2 4 0zm0 0c1.5-2 4-2 4 0s-2.5 2-4 0zM12 10v10"
      />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3l1.2 3.6L17 8l-3.8 1.4L12 13l-1.2-3.6L7 8l3.8-1.4L12 3zm6 8l.8 2.4L21 14.5l-2.2.8L18 18l-.8-2.7L15 14.5l2.2-.8L18 11zM6 14l.7 2.1L9 17l-2.3.7L6 20l-.7-2.3L3 17l2.3-.9L6 14z"
      />
    </svg>
  ),
}

export function ValueProps() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8" aria-label="Our values">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {siteContent.values.map((value) => (
          <Reveal key={value.id} className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-sage text-sage">
              {icons[value.id]}
            </div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wide text-ink">
              {value.title}
            </h3>
            <p className="mt-2 text-sm text-ink-soft">{value.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
