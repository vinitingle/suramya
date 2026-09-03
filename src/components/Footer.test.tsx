import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Footer } from './Footer'

describe('Footer', () => {
  it('renders brand, statement, contact details, made with love, and copyright', () => {
    render(<Footer />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveAttribute('id', 'contact')
    expect(footer.className).toMatch(/scroll-mt-28/)

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

    const socialEmail = screen.getByRole('link', { name: 'Email' })
    expect(socialEmail).toHaveAttribute(
      'href',
      `mailto:${siteContent.connect.email}`,
    )

    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'WhatsApp' })).toBeInTheDocument()

    expect(screen.getByText(siteContent.connect.phone)).toBeInTheDocument()
    expect(screen.getByText(siteContent.connect.address)).toBeInTheDocument()

    expect(screen.getByText(siteContent.footer.madeWith)).toBeInTheDocument()
    expect(
      screen.getByText(/Suramya Arts & Crafts/i),
    ).toBeInTheDocument()
  })
})
