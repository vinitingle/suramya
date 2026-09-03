import { siteContent } from '../data/content'

export function AnnouncementBar() {
  return (
    <p className="bg-sage-deep px-4 py-2 text-center font-sans text-xs font-medium tracking-wide text-cream sm:text-sm">
      {siteContent.announcement}
    </p>
  )
}
