export type Artwork = {
  id: string
  title: string
  category: string
  image: string
  description: string
  featured?: boolean
  aspect: 'portrait' | 'landscape' | 'square'
}

export const artworks: Artwork[] = [
  {
    id: 'woven-quiet',
    title: 'Woven Quiet',
    category: 'Textured Works',
    image:
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80',
    description:
      'A layered paper and fiber panel where soft ridges catch light across a calm neutral field.',
    featured: true,
    aspect: 'portrait',
  },
  {
    id: 'grain-study',
    title: 'Grain Study',
    category: 'Textured Works',
    image:
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80',
    description:
      'Tactile marks built in thin washes, letting surface grain become the quiet subject.',
    aspect: 'square',
  },
  {
    id: 'inked-margin',
    title: 'Inked Margin',
    category: 'Script & Layers',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    description:
      'Overlapping script fragments and pale washes that form a layered narrative of marks.',
    aspect: 'landscape',
  },
  {
    id: 'letterpress-echo',
    title: 'Letterpress Echo',
    category: 'Script & Layers',
    image:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80',
    description:
      'Typography pressed into soft ground, with symbols drifting through translucent layers.',
    aspect: 'portrait',
  },
  {
    id: 'pale-horizon',
    title: 'Pale Horizon',
    category: 'Quiet Paintings',
    image:
      'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1200&q=80',
    description:
      'A restrained composition of soft bands and quiet balance across a muted field.',
    aspect: 'landscape',
  },
  {
    id: 'still-room',
    title: 'Still Room',
    category: 'Quiet Paintings',
    image:
      'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=1200&q=80',
    description:
      'Simple painted shapes held in calm tension, focused on space and visual hush.',
    aspect: 'square',
  },
  {
    id: 'earthen-curve',
    title: 'Earthen Curve',
    category: 'Clay Pieces',
    image:
      'https://images.unsplash.com/photo-1490312278390-ab64016fca61?auto=format&fit=crop&w=1200&q=80',
    description:
      'A hand-formed clay showpiece with a gentle curve and raw, dried surface character.',
    aspect: 'portrait',
  },
  {
    id: 'clay-vessel',
    title: 'Clay Vessel',
    category: 'Clay Pieces',
    image:
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    description:
      'A small dried-clay form shaped around a simple idea of openness and weight.',
    aspect: 'square',
  },
]
