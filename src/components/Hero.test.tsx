import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { Hero } from './Hero'

describe('Hero', () => {
  it('renders headline, description, shop CTA, and hero image', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { level: 1, name: siteContent.hero.headline }),
    ).toBeInTheDocument()
    expect(screen.getByText(siteContent.hero.description)).toBeInTheDocument()
    const cta = screen.getByRole('link', { name: /shop now/i })
    expect(cta).toHaveAttribute('href', '#categories')
    const image = document.querySelector(`img[src="${siteImages.hero}"]`)
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })
})
