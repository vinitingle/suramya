import { describe, expect, it } from 'vitest'
import { siteContent } from './content'
import { siteImages } from './images'

describe('shop content', () => {
  it('has six shop categories matching images', () => {
    expect(siteContent.categories).toHaveLength(6)
    expect(siteContent.hero.headline).toBe(
      'Handmade with heart, crafted for joy.',
    )
    for (const category of siteContent.categories) {
      expect(siteImages.categories[category.id]).toMatch(/^https?:\/\//)
    }
  })
})
