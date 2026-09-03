export const siteContent = {
  brand: 'Suramya',
  brandLine: 'Arts & Crafts',
  tagline: 'Handmade with heart, crafted for joy.',
  announcement: 'Handmade with love  •  Unique designs  •  Custom orders',
  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Shop', href: '#categories' },
    { label: 'Categories', href: '#categories' },
    { label: 'Custom Orders', href: '#custom' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  hero: {
    headline: 'Handmade with heart, crafted for joy.',
    description:
      'Unique, artistic and joyful creations to brighten your space and moments.',
    cta: { label: 'Shop now', href: '#categories' },
  },
  values: [
    {
      id: 'handmade',
      title: '100% Handmade',
      description: 'Every piece is crafted by hand with care.',
    },
    {
      id: 'eco',
      title: 'Eco Friendly',
      description: 'Sustainable materials and mindful making.',
    },
    {
      id: 'gifting',
      title: 'Perfect Gifting',
      description: 'Thoughtful pieces for people you love.',
    },
    {
      id: 'custom',
      title: 'Custom Orders',
      description: 'Made to match your idea and space.',
    },
  ],
  categories: [
    { id: 'paint-kits', title: 'DIY Paint Kits' },
    { id: 'fridge-magnets', title: 'Fridge Magnets' },
    { id: 'clay-hangings', title: 'Clay Hangings' },
    { id: 'desktop-decor', title: 'Desktop Decor' },
    { id: 'texture-frames', title: 'Texture Art Frames' },
    { id: 'lippan-frames', title: 'Lippan Art Frames' },
  ],
  about: {
    eyebrow: 'About us',
    headline: 'Crafting happiness in every piece.',
    body: 'At Suramya Arts & Crafts, we make unique, artistic, and joyful pieces by hand — from clay and texture to color and small objects that brighten a home.',
    cta: { label: 'Learn more', href: '#about' },
  },
  custom: {
    message:
      'Looking for something special? We take customized orders to make your ideas come to life.',
    cta: { label: 'Order custom', href: '#custom' },
  },
  connect: {
    email: 'hello@suramya.art',
    instagram: '@suramya.studio',
    instagramUrl: 'https://instagram.com/suramya.studio',
    facebookUrl: '#',
    whatsappUrl: '#',
    phone: '+91 00000 00000',
    address: 'Studio, India',
  },
  footer: {
    statement: 'Handmade with heart, crafted for joy.',
    madeWith: 'Made with love',
  },
  chrome: {
    search: 'Search',
    account: 'Account',
    bag: 'Bag, 0 items',
  },
} as const

export type CategoryId = (typeof siteContent.categories)[number]['id']
