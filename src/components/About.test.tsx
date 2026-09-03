import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { About } from './About'

describe('About', () => {
  it('renders shop about split with eyebrow, headline, body, CTA, and image', () => {
    const { container } = render(<About />)

    const section = container.querySelector('#about')
    expect(section?.tagName).toBe('SECTION')
    expect(section?.className).toMatch(/scroll-mt-28/)

    expect(screen.getByText(/about us/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Crafting happiness in every piece.',
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(siteContent.about.body)).toBeInTheDocument()

    const learnMore = screen.getByRole('link', { name: /learn more/i })
    expect(learnMore).toHaveAttribute('href', '#about')

    const image = document.querySelector(
      `img[src="${siteImages.about}"]`,
    ) as HTMLImageElement | null
    expect(image).toBeTruthy()
  })
})
