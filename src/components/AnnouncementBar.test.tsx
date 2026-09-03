import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { siteContent } from '../data/content'
import { AnnouncementBar } from './AnnouncementBar'

describe('AnnouncementBar', () => {
  it('renders the announcement copy', () => {
    render(<AnnouncementBar />)
    // collapseWhitespace: false — announcement has double spaces around bullets;
    // @testing-library/dom exact match normalizes DOM text but not the matcher.
    expect(
      screen.getByText(siteContent.announcement, { collapseWhitespace: false }),
    ).toBeInTheDocument()
  })
})
