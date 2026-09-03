import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { CategoryGrid } from './CategoryGrid'

describe('CategoryGrid', () => {
  it('renders shop-by-category section with circular category cards', () => {
    const { container } = render(<CategoryGrid />)

    const section = container.querySelector('#categories')
    expect(section?.tagName).toBe('SECTION')

    expect(
      screen.getByRole('heading', { level: 2, name: 'Shop by category' }),
    ).toBeInTheDocument()

    for (const category of siteContent.categories) {
      const image = screen.getByRole('img', {
        name: new RegExp(category.title, 'i'),
      })
      expect(image).toBeInTheDocument()
      expect(image.getAttribute('alt')).toMatch(
        new RegExp(category.title, 'i'),
      )
    }

    const exploreLinks = screen.getAllByRole('link', { name: /explore/i })
    expect(exploreLinks).toHaveLength(siteContent.categories.length)
    for (const link of exploreLinks) {
      expect(link).toHaveAttribute('href', '#categories')
    }
  })
})
