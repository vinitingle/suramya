import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { artworks } from '../data/artworks'
import { Gallery } from './Gallery'

describe('Gallery', () => {
  it('renders The Collection with all artworks from data', () => {
    const { container } = render(<Gallery />)

    const section = container.querySelector('#collection')
    expect(section?.tagName).toBe('SECTION')

    expect(
      screen.getByRole('heading', { level: 2, name: 'The Collection' }),
    ).toBeInTheDocument()

    expect(artworks).toHaveLength(8)

    const figures = container.querySelectorAll('figure')
    expect(figures).toHaveLength(8)

    for (const artwork of artworks) {
      const image = container.querySelector(
        `img[src="${artwork.image}"]`,
      ) as HTMLImageElement | null
      expect(image).toBeTruthy()
      expect(image?.alt.length).toBeGreaterThan(0)
      expect(image?.alt).toMatch(new RegExp(artwork.title, 'i'))

      const figure = image?.closest('figure')
      expect(figure?.textContent).toContain(artwork.title)
      expect(figure?.textContent).toContain(artwork.category)
    }

    const images = container.querySelectorAll('img')
    expect(images).toHaveLength(8)
    images.forEach((img, index) => {
      if (index === 0) return
      expect(img).toHaveAttribute('loading', 'lazy')
    })
  })
})
