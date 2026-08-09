import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders brand, statement, contact links, and copyright year', () => {
    const year = new Date().getFullYear()
    render(<Footer />)

    expect(
      screen.getByText(siteContent.brand, { selector: 'footer *' }),
    ).toBeInTheDocument()
    expect(screen.getByText(siteContent.footer.statement)).toBeInTheDocument()

    const emailLink = screen.getByRole('link', {
      name: siteContent.connect.email,
    })
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${siteContent.connect.email}`,
    )

    const instagramLink = screen.getByRole('link', {
      name: siteContent.connect.instagram,
    })
    expect(instagramLink).toHaveAttribute(
      'href',
      siteContent.connect.instagramUrl,
    )

    expect(
      screen.getByText(new RegExp(`©\\s*${year}\\s*Suramya`, 'i')),
    ).toBeInTheDocument()
  })
})
