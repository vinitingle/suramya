export const siteContent = {
  brand: 'Suramya',
  tagline: 'Simple concepts. Rich textures. Timeless beauty.',
  nav: [
    { label: 'The Story', href: '#story' },
    { label: 'What We Create', href: '#create' },
    { label: 'The Collection', href: '#collection' },
    { label: 'Connect', href: '#connect' },
  ],
  hero: {
    devanagari: 'सुरम्य',
    description:
      'Suramya is an arts and crafts project creating minimalist textured artworks, layered compositions, and handcrafted clay pieces where simple ideas become objects of beauty.',
    cta: { label: 'Explore the collection', href: '#collection' },
  },
  story: {
    quote: 'Beauty does not always need complexity.',
    paragraphs: [
      'Suramya is a Sanskrit word meaning beautiful, charming, and picturesque — a name that guides every piece we make.',
      'We work with texture, layers, scripts, and clay, transforming simple ideas into visually meaningful objects. Not decoration for its own sake, but quiet work with character.',
      'Our philosophy is minimalism with depth: less form, more feeling; less noise, more craft.',
    ],
  },
  categories: [
    {
      id: 'textured',
      title: 'Textured Works',
      description:
        'Layered and tactile artworks where surface and depth become part of the visual story.',
    },
    {
      id: 'script',
      title: 'Script & Layers',
      description:
        'Compositions that weave typography, symbols, and scripts into quiet, layered narratives.',
    },
    {
      id: 'paintings',
      title: 'Quiet Paintings',
      description:
        'Simple paintings focused on composition, balance, and visual calm.',
    },
    {
      id: 'clay',
      title: 'Clay Pieces',
      description:
        'Handcrafted showpieces in dried clay, shaped around simple and creative ideas.',
    },
  ],
  connect: {
    heading: 'Connect',
    intro:
      'Enquire about available work, commission a custom piece, or begin a collaboration.',
    email: 'hello@suramya.art',
    instagram: '@suramya.studio',
    instagramUrl: 'https://instagram.com/suramya.studio',
    demoNotice: 'This form is a demo — messages are not sent yet.',
    enquiryTypes: [
      'General enquiry',
      'Available artwork',
      'Custom commission',
      'Collaboration',
    ],
  },
  footer: {
    statement: 'Art shaped by simplicity, texture and imagination.',
  },
} as const
