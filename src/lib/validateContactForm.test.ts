import { describe, expect, it } from 'vitest'
import { validateContactForm } from './validateContactForm'

describe('validateContactForm', () => {
  it('returns errors for empty values', () => {
    const errors = validateContactForm({
      name: '',
      email: '',
      enquiryType: '',
      message: '',
    })
    expect(errors.name).toBeTruthy()
    expect(errors.email).toBeTruthy()
    expect(errors.enquiryType).toBeTruthy()
    expect(errors.message).toBeTruthy()
  })

  it('rejects invalid email', () => {
    const errors = validateContactForm({
      name: 'Asha',
      email: 'not-an-email',
      enquiryType: 'General enquiry',
      message: 'I would love to know more about your clay pieces.',
    })
    expect(errors.email).toBeTruthy()
  })

  it('returns empty object for valid input', () => {
    const errors = validateContactForm({
      name: 'Asha',
      email: 'asha@example.com',
      enquiryType: 'Custom commission',
      message: 'I would love a textured piece for a quiet hallway.',
    })
    expect(errors).toEqual({})
  })
})
