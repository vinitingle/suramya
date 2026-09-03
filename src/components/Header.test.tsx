import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Header } from './Header'

describe('Header', () => {
  it('renders logo lockup, nav links, and chrome buttons', () => {
    render(<Header />)
    expect(
      screen.getByRole('img', { name: siteContent.brand }),
    ).toHaveAttribute('src', '/brand/suramya-logo.png')
    expect(screen.getByText(siteContent.brandLine)).toBeInTheDocument()
    for (const item of siteContent.nav) {
      expect(screen.getAllByRole('link', { name: item.label }).length).toBeGreaterThan(0)
    }
    expect(screen.getByRole('button', { name: siteContent.chrome.search })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: siteContent.chrome.account })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: siteContent.chrome.bag })).toBeInTheDocument()
  })
})
