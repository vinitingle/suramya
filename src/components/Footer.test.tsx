import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders brand, statement, contact details, made with love, and copyright', () => {
    render(<Footer />)

    expect(
      screen.getByRole('contentinfo'),
    ).toHaveAttribute('id', 'contact')

    expect(
      screen.getByRole('img', { name: siteContent.brand }),
    ).toHaveAttribute('src', '/brand/suramya-logo.png')

    expect(screen.getByText(siteContent.footer.statement)).toBeInTheDocument()

    const emailLink = screen.getByRole('link', {
      name: siteContent.connect.email,
    })
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${siteContent.connect.email}`,
    )

    expect(screen.getByText(siteContent.connect.phone)).toBeInTheDocument()
    expect(screen.getByText(siteContent.connect.address)).toBeInTheDocument()

    expect(screen.getByText(siteContent.footer.madeWith)).toBeInTheDocument()
    expect(
      screen.getByText(/Suramya Arts & Crafts/i),
    ).toBeInTheDocument()
  })
})
