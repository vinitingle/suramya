import { useId, useState, type FormEvent } from 'react'
import { siteContent } from '../data/content'
import {
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from '../lib/validateContactForm'
import { Reveal } from './Reveal'

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-deep focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

const fieldClass =
  `mt-2 w-full rounded-sm border border-sage-muted bg-cream px-3 py-2.5 font-sans text-base text-ink placeholder:text-ink-soft/60 ${focusRing}`

const emptyValues: ContactFormValues = {
  name: '',
  email: '',
  enquiryType: '',
  message: '',
}

export function Contact() {
  const baseId = useId()
  const nameId = `${baseId}-name`
  const emailId = `${baseId}-email`
  const enquiryId = `${baseId}-enquiry`
  const messageId = `${baseId}-message`

  const [values, setValues] = useState<ContactFormValues>(emptyValues)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateContactForm(values)
    setErrors(nextErrors)
    setSubmitted(Object.keys(nextErrors).length === 0)
  }

  return (
    <section
      id="connect"
      className="relative overflow-hidden bg-cream-deep px-5 py-20 sm:px-8 sm:py-28"
      aria-labelledby="connect-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sage-muted via-transparent to-cream/70"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <h2
              id="connect-heading"
              className="font-display text-3xl tracking-wide text-ink sm:text-4xl"
            >
              {siteContent.connect.heading}
            </h2>
            <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink-soft sm:text-lg">
              {siteContent.connect.intro}
            </p>
            <div className="mt-8 flex flex-col gap-3 font-sans text-base text-ink">
              <a
                href={`mailto:${siteContent.connect.email}`}
                className={`w-fit rounded-sm text-sage-deep underline-offset-4 hover:underline ${focusRing}`}
              >
                {siteContent.connect.email}
              </a>
              <a
                href={siteContent.connect.instagramUrl}
                className={`w-fit rounded-sm text-sage-deep underline-offset-4 hover:underline ${focusRing}`}
                target="_blank"
                rel="noreferrer"
              >
                {siteContent.connect.instagram}
              </a>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <form
              className="space-y-6"
              onSubmit={onSubmit}
              noValidate
            >
              <div>
                <label
                  htmlFor={nameId}
                  className="font-sans text-sm tracking-wide text-ink"
                >
                  Name
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  className={fieldClass}
                  value={values.name}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, name: event.target.value }))
                  }
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${nameId}-error` : undefined}
                />
                {errors.name ? (
                  <p
                    id={`${nameId}-error`}
                    className="mt-2 font-sans text-sm text-ink"
                    role="alert"
                  >
                    {errors.name}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={emailId}
                  className="font-sans text-sm tracking-wide text-ink"
                >
                  Email
                </label>
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass}
                  value={values.email}
                  onChange={(event) =>
                    setValues((prev) => ({ ...prev, email: event.target.value }))
                  }
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${emailId}-error` : undefined}
                />
                {errors.email ? (
                  <p
                    id={`${emailId}-error`}
                    className="mt-2 font-sans text-sm text-ink"
                    role="alert"
                  >
                    {errors.email}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={enquiryId}
                  className="font-sans text-sm tracking-wide text-ink"
                >
                  Enquiry type
                </label>
                <select
                  id={enquiryId}
                  name="enquiryType"
                  className={fieldClass}
                  value={values.enquiryType}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      enquiryType: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(errors.enquiryType)}
                  aria-describedby={
                    errors.enquiryType ? `${enquiryId}-error` : undefined
                  }
                >
                  <option value="">Select an option</option>
                  {siteContent.connect.enquiryTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.enquiryType ? (
                  <p
                    id={`${enquiryId}-error`}
                    className="mt-2 font-sans text-sm text-ink"
                    role="alert"
                  >
                    {errors.enquiryType}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor={messageId}
                  className="font-sans text-sm tracking-wide text-ink"
                >
                  Message
                </label>
                <textarea
                  id={messageId}
                  name="message"
                  rows={5}
                  className={`${fieldClass} resize-y`}
                  value={values.message}
                  onChange={(event) =>
                    setValues((prev) => ({
                      ...prev,
                      message: event.target.value,
                    }))
                  }
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? `${messageId}-error` : undefined
                  }
                />
                {errors.message ? (
                  <p
                    id={`${messageId}-error`}
                    className="mt-2 font-sans text-sm text-ink"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                className={`inline-flex items-center rounded-sm bg-sage-deep px-6 py-3 font-sans text-sm tracking-wide text-cream transition-opacity hover:opacity-90 ${focusRing}`}
              >
                Send enquiry
              </button>

              {submitted ? (
                <p
                  className="font-sans text-sm leading-relaxed text-ink-soft"
                  role="status"
                >
                  {siteContent.connect.demoNotice}
                </p>
              ) : null}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
