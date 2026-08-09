import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages } from '../data/images'
import { About } from './About'

describe('About', () => {
  it('renders The Story section with quote, paragraphs, and about image', () => {
    const { container } = render(<About />)

    const section = container.querySelector('#story')
    expect(section?.tagName).toBe('SECTION')

    expect(
      screen.getByRole('heading', { level: 2, name: 'The Story' }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(`\u201C${siteContent.story.quote}\u201D`),
    ).toBeInTheDocument()

    for (const paragraph of siteContent.story.paragraphs) {
      expect(screen.getByText(paragraph)).toBeInTheDocument()
    }

    const image = document.querySelector(
      `img[src="${siteImages.about}"]`,
    ) as HTMLImageElement | null
    expect(image).toBeTruthy()
  })
})
