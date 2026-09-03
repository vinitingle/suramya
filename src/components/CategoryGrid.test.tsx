import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { CategoryGrid } from './CategoryGrid'

describe('CategoryGrid', () => {
  it('renders shop-by-category section with circular category cards', () => {
    const { container } = render(<CategoryGrid />)

    const section = container.querySelector('#categories')
    expect(section?.tagName).toBe('SECTION')
    expect(section?.className).toMatch(/scroll-mt-28/)

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Shop by category',
    })
    expect(heading).toBeInTheDocument()
    expect(heading.className).toMatch(/text-center/)

    for (const category of siteContent.categories) {
      const image = screen.getByRole('img', {
        name: new RegExp(category.title, 'i'),
      })
      expect(image).toBeInTheDocument()
      expect(image.getAttribute('alt')).toMatch(
        new RegExp(category.title, 'i'),
      )
      expect(image.className).toMatch(/motion-safe:group-hover:scale-\[1\.03\]/)
      expect(image.parentElement?.className).toMatch(/overflow-hidden/)
      expect(image.parentElement?.className).toMatch(/rounded-full/)
    }

    const exploreLinks = screen.getAllByRole('link', { name: /explore/i })
    expect(exploreLinks).toHaveLength(siteContent.categories.length)
    for (const link of exploreLinks) {
      expect(link).toHaveAttribute('href', '#categories')
      expect(link.className).toMatch(/hover:bg-sage-deep/)
      expect(link.className).toMatch(/hover:text-cream/)
    }
  })
})
