import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { Contact } from './Contact'

describe('Contact', () => {
  it('renders Connect section with intro, mailto, Instagram, and labelled fields', () => {
    const { container } = render(<Contact />)

    const section = container.querySelector('#connect')
    expect(section?.tagName).toBe('SECTION')

    expect(
      screen.getByRole('heading', { level: 2, name: siteContent.connect.heading }),
    ).toBeInTheDocument()

    expect(screen.getByText(siteContent.connect.intro)).toBeInTheDocument()

    const emailLink = screen.getByRole('link', {
      name: siteContent.connect.email,
    })
    expect(emailLink).toHaveAttribute(
      'href',
      `mailto:${siteContent.connect.email}`,
    )

    const instagramLink = screen.getByRole('link', {
      name: siteContent.connect.instagram,
    })
    expect(instagramLink).toHaveAttribute(
      'href',
      siteContent.connect.instagramUrl,
    )

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/enquiry type/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows inline errors on invalid submit and demo notice on valid submit', async () => {
    const user = userEvent.setup()
    render(<Contact />)

    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText('Please enter your name.')).toBeInTheDocument()
    expect(screen.getByText('Please enter a valid email.')).toBeInTheDocument()
    expect(
      screen.getByText('Please select an enquiry type.'),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Please share a little more detail.'),
    ).toBeInTheDocument()
    expect(
      screen.queryByText(siteContent.connect.demoNotice),
    ).not.toBeInTheDocument()

    await user.type(screen.getByLabelText(/name/i), 'Ada Lovelace')
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com')
    await user.selectOptions(
      screen.getByLabelText(/enquiry type/i),
      siteContent.connect.enquiryTypes[0],
    )
    await user.type(
      screen.getByLabelText(/message/i),
      'I would love a custom commission piece.',
    )
    await user.click(screen.getByRole('button', { name: /send/i }))

    expect(screen.getByText(siteContent.connect.demoNotice)).toBeInTheDocument()
    expect(screen.queryByText('Please enter your name.')).not.toBeInTheDocument()
  })
})
