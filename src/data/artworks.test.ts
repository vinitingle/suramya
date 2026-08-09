import { describe, expect, it } from 'vitest'
import { artworks } from './artworks'

describe('artworks', () => {
  it('exports eight pieces with required fields', () => {
    expect(artworks).toHaveLength(8)
    for (const piece of artworks) {
      expect(piece.id).toBeTruthy()
      expect(piece.title).toBeTruthy()
      expect(piece.category).toBeTruthy()
      expect(piece.image).toMatch(/^https?:\/\//)
      expect(piece.description.length).toBeGreaterThan(10)
      expect(['portrait', 'landscape', 'square']).toContain(piece.aspect)
    }
    expect(artworks.filter((a) => a.featured).length).toBeGreaterThanOrEqual(1)
  })
})
