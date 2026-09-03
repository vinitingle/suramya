import { siteContent } from '../data/content'
import { focusRing } from '../lib/focusRing'

const linkClass = `rounded-sm font-sans text-sm text-ink-soft transition-colors hover:text-ink ${focusRing}`

const socialClass = `inline-flex h-9 w-9 items-center justify-center rounded-sm text-ink ${focusRing}`

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.2l.8-3H14V9z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3zm0 1.5a7.5 7.5 0 0 1 6.3 11.6l-.3.4.7 2.6-2.7-.7-.4.2A7.5 7.5 0 1 1 12 4.5zm4.1 9.6c-.2-.1-1.2-.6-1.4-.7-.2-.1-.4-.1-.5.1-.2.2-.6.7-.7.8-.1.1-.3.2-.5.1-.2-.1-.9-.3-1.7-1.1-.6-.6-1.1-1.3-1.2-1.5-.1-.2 0-.3.1-.5l.4-.5c.1-.1.1-.2.2-.4 0-.1 0-.3-.1-.4-.1-.1-.5-1.2-.7-1.6-.2-.4-.4-.4-.5-.4h-.4c-.1 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.4 2.3.9 2.3.6 2.7.6.4 0 1.3-.5 1.5-1 .2-.5.2-.9.1-1-.1-.1-.2-.1-.4-.2z" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  const phoneHref = `tel:+${siteContent.connect.phone.replace(/\D/g, '')}`

  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-sage-muted/40 bg-cream-deep px-5 py-14 text-ink sm:px-8 sm:py-16"
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        <div>
          <a href="#top" className={`inline-flex items-center rounded-sm ${focusRing}`}>
            <img
              src="/brand/suramya-logo.png"
              alt={siteContent.brand}
              className="h-10 w-auto"
            />
          </a>
          <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-ink-soft">
            {siteContent.footer.statement}
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={siteContent.connect.instagramUrl}
              className={socialClass}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
            <a
              href={siteContent.connect.facebookUrl}
              className={socialClass}
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={siteContent.connect.whatsappUrl}
              className={socialClass}
              aria-label="WhatsApp"
            >
              <WhatsAppIcon />
            </a>
            <a
              href={`mailto:${siteContent.connect.email}`}
              className={socialClass}
              aria-label="Email"
            >
              <EmailIcon />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
            Quick Links
          </h2>
          <ul className="mt-4 space-y-2">
            {siteContent.nav.map((item) => (
              <li key={item.href + item.label}>
                <a href={item.href} className={linkClass}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
            Categories
          </h2>
          <ul className="mt-4 space-y-2">
            {siteContent.categories.map((category) => (
              <li key={category.id}>
                <a href="#categories" className={linkClass}>
                  {category.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-semibold tracking-wide text-ink uppercase">
            Get in Touch
          </h2>
          <ul className="mt-4 space-y-2 font-sans text-sm text-ink-soft">
            <li>
              <a
                href={`mailto:${siteContent.connect.email}`}
                className={`rounded-sm transition-colors hover:text-ink ${focusRing}`}
              >
                {siteContent.connect.email}
              </a>
            </li>
            <li>
              <a
                href={phoneHref}
                className={`rounded-sm transition-colors hover:text-ink ${focusRing}`}
              >
                {siteContent.connect.phone}
              </a>
            </li>
            <li>{siteContent.connect.address}</li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-sage-muted/40 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-sans text-xs tracking-wide text-ink-soft">
          {`© ${year} Suramya Arts & Crafts`}
        </p>
        <p className="font-sans text-xs tracking-wide text-ink-soft">
          {siteContent.footer.madeWith}
        </p>
      </div>
    </footer>
  )
}
