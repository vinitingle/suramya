import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { CustomBanner } from './CustomBanner'

describe('CustomBanner', () => {
  it('renders custom message and Order custom link to #custom', () => {
    const { container } = render(<CustomBanner />)

    const section = container.querySelector('#custom')
    expect(section?.tagName).toBe('SECTION')
    expect(section?.className).toMatch(/scroll-mt-28/)

    expect(screen.getByText(siteContent.custom.message)).toBeInTheDocument()

    const orderCustom = screen.getByRole('link', { name: /order custom/i })
    expect(orderCustom).toHaveAttribute('href', '#custom')
  })
})
