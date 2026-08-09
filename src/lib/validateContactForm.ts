export type ContactFormValues = {
  name: string
  email: string
  enquiryType: string
  message: string
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = values.name.trim()
  const email = values.email.trim()
  const message = values.message.trim()

  if (name.length < 2) errors.name = 'Please enter your name.'
  if (!emailPattern.test(email)) errors.email = 'Please enter a valid email.'
  if (!values.enquiryType.trim()) errors.enquiryType = 'Please select an enquiry type.'
  if (message.length < 10) errors.message = 'Please share a little more detail.'

  return errors
}
