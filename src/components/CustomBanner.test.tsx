import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { CustomBanner } from './CustomBanner'

describe('CustomBanner', () => {
  it('renders custom message and Order custom link to #custom', () => {
    render(<CustomBanner />)

    expect(screen.getByText(siteContent.custom.message)).toBeInTheDocument()

    const orderCustom = screen.getByRole('link', { name: /order custom/i })
    expect(orderCustom).toHaveAttribute('href', '#custom')
  })
})
