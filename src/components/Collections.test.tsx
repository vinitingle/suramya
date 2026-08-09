import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { siteImages, type CategoryId } from '../data/images'
import { Collections } from './Collections'

describe('Collections', () => {
  it('renders What We Create categories with alternating content', () => {
    const { container } = render(<Collections />)

    const section = container.querySelector('#create')
    expect(section?.tagName).toBe('SECTION')

    expect(
      screen.getByRole('heading', { level: 2, name: 'What We Create' }),
    ).toBeInTheDocument()

    for (const category of siteContent.categories) {
      expect(
        screen.getByRole('heading', { level: 3, name: category.title }),
      ).toBeInTheDocument()
      expect(screen.getByText(category.description)).toBeInTheDocument()

      const image = document.querySelector(
        `img[src="${siteImages.categories[category.id as CategoryId]}"]`,
      ) as HTMLImageElement | null
      expect(image).toBeTruthy()
      expect(image?.alt).toBe(category.title)
    }
  })
})
