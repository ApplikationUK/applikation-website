export const siteSettings = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
    },
    {
      name: 'siteDescription',
      title: 'Default Meta Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'logo',
      title: 'Logo (white wordmark)',
      type: 'image',
    },
    {
      name: 'navLinks',
      title: 'Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'Link', type: 'string' },
            { name: 'isCta', title: 'Is CTA button?', type: 'boolean' },
          ],
        },
      ],
    },
    {
      name: 'footerTagline',
      title: 'Footer Tagline',
      type: 'string',
    },
    {
      name: 'footerBookingStatus',
      title: 'Footer Booking Status',
      type: 'string',
    },
    {
      name: 'footerLocations',
      title: 'Footer Locations',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
    },
    {
      name: 'logoCarousel',
      title: 'Logo Carousel (client names)',
      type: 'array',
      of: [{ type: 'string' }],
    },
  ],
};
