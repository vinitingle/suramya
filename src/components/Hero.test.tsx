import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders brand logo, Devanagari whisper, tagline, description, and collection CTA', () => {
    render(<Hero />)

    const logo = screen.getByRole('img', { name: siteContent.brand })
    expect(logo).toHaveAttribute('src', '/brand/suramya-logo.png')

    expect(screen.getByText(siteContent.hero.devanagari)).toBeInTheDocument()
    expect(screen.getByText(siteContent.tagline)).toBeInTheDocument()
    expect(screen.getByText(siteContent.hero.description)).toBeInTheDocument()

    const cta = screen.getByRole('link', { name: siteContent.hero.cta.label })
    expect(cta).toHaveAttribute('href', '#collection')

    const background = document.querySelector(
      `img[src="${siteImages.hero}"]`,
    ) as HTMLImageElement | null
    expect(background).toBeTruthy()
  })
})
