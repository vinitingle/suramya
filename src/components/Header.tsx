import { useEffect, useId, useRef, useState } from 'react'
import { siteContent } from '../data/content'
import { focusRing } from '../lib/focusRing'

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function AccountIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 19.5c1.5-3.5 4-5 7-5s5.5 1.5 7 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 8h12l-1 12H7L6 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V7a3 3 0 0 1 6 0v1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const getFocusable = () => {
      const panelLinks =
        panelRef.current?.querySelectorAll<HTMLElement>('a') ?? []
      const items: HTMLElement[] = []
      if (toggleRef.current) items.push(toggleRef.current)
      panelLinks.forEach((link) => items.push(link))
      return items
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = getFocusable()
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null

      if (event.shiftKey) {
        if (active === first || !focusable.includes(active as HTMLElement)) {
          event.preventDefault()
          last.focus()
        }
      } else if (active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a')
    firstLink?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const main = document.querySelector('main')
    const footer = document.querySelector('footer')
    if (!open) {
      if (main) main.inert = false
      if (footer) footer.inert = false
      return
    }
    if (main) main.inert = true
    if (footer) footer.inert = true
    return () => {
      if (main) main.inert = false
      if (footer) footer.inert = false
    }
  }, [open])

  const closeMenu = () => setOpen(false)

  const chromeButtonClass = `relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink ${focusRing}`

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream">
      <nav
        className="mx-auto grid max-w-6xl grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className={`inline-flex min-w-0 items-center gap-2 rounded-sm sm:gap-3 ${focusRing}`}
          onClick={closeMenu}
        >
          <img
            src="/brand/suramya-logo.png"
            alt={siteContent.brand}
            className="h-10 w-auto shrink-0"
          />
          <span className="hidden min-[380px]:flex min-w-0 flex-col leading-tight">
            <span className="font-sans text-sm font-medium uppercase tracking-wide text-ink">
              {siteContent.brand}
            </span>
            <span className="font-sans text-xs text-ink-soft">
              {siteContent.brandLine}
            </span>
          </span>
        </a>

        <ul className="hidden items-center justify-center gap-8 md:flex">
          {siteContent.nav.map((item) => (
            <li key={item.href + item.label}>
              <a
                href={item.href}
                className={`rounded-sm font-sans text-sm tracking-wide text-ink-soft transition-colors hover:text-ink ${focusRing}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-end gap-1">
          <button
            type="button"
            className={chromeButtonClass}
            aria-label={siteContent.chrome.search}
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            className={chromeButtonClass}
            aria-label={siteContent.chrome.account}
          >
            <AccountIcon />
          </button>
          <button
            type="button"
            className={chromeButtonClass}
            aria-label={siteContent.chrome.bag}
          >
            <BagIcon />
            <span
              className="absolute right-1 top-1 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-sage px-0.5 text-[9px] leading-none text-cream"
              aria-hidden
            >
              0
            </span>
          </button>

          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-sm text-ink md:hidden ${focusRing}`}
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-5 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-px w-full bg-current transition-transform duration-200 ${
                  open ? 'translate-y-[7px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`h-px w-full bg-current transition-transform duration-200 ${
                  open ? '-translate-y-[7px] -rotate-45' : ''
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id={menuId}
        ref={panelRef}
        className="border-t border-ink/12 bg-cream md:hidden"
        hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {siteContent.nav.map((item) => (
            <li key={item.href + item.label}>
              <a
                href={item.href}
                className={`block rounded-sm px-2 py-3 font-sans text-base tracking-wide text-ink ${focusRing}`}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
