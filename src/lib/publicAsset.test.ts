import { describe, expect, it } from 'vitest'
import { publicAsset } from './publicAsset'

describe('publicAsset', () => {
  it('joins BASE_URL with a public path', () => {
    expect(publicAsset('brand/suramya-logo.png')).toBe(
      '/brand/suramya-logo.png',
    )
  })

  it('strips a leading slash so BASE_URL does not double up', () => {
    expect(publicAsset('/brand/suramya-logo.png')).toBe(
      '/brand/suramya-logo.png',
    )
  })
})
