import { useEffect, useId, useRef, useState } from 'react'
import { siteContent } from '../data/content'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-300 ${
        scrolled || open
          ? 'border-b border-sage-muted bg-cream/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-cream/70 backdrop-blur-sm'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8"
        aria-label="Primary"
      >
        <a
          href="#top"
          className={`inline-flex shrink-0 items-center rounded-sm ${focusRing}`}
          onClick={closeMenu}
        >
          <img
            src="/brand/suramya-logo.png"
            alt={siteContent.brand}
            className="h-10 w-auto sm:h-12"
          />
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {siteContent.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`font-sans text-sm tracking-wide text-ink-soft transition-colors hover:text-ink ${focusRing} rounded-sm`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

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
      </nav>

      <div
        id={menuId}
        ref={panelRef}
        className="border-t border-sage-muted bg-cream md:hidden"
        hidden={!open}
      >
        <ul className="flex flex-col gap-1 px-5 py-4">
          {siteContent.nav.map((item) => (
            <li key={item.href}>
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
