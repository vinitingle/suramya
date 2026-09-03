import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { ValueProps } from './ValueProps'

describe('ValueProps', () => {
  it('renders each value title and description', () => {
    render(<ValueProps />)

    for (const value of siteContent.values) {
      expect(screen.getByText(value.title)).toBeInTheDocument()
      expect(screen.getByText(value.description)).toBeInTheDocument()
    }
  })
})
