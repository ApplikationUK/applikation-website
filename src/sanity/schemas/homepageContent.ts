export const homepageContent = {
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  __experimental_actions: ['update', 'publish'],
  fields: [
    // Hero
    {
      name: 'heroEyebrow',
      title: 'Hero — Eyebrow',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroHeadline',
      title: 'Hero — Headline',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroSubheadline',
      title: 'Hero — Sub-headline',
      type: 'text',
      rows: 2,
      group: 'hero',
    },
    {
      name: 'heroCtaPrimary',
      title: 'Hero — Primary CTA Label',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroCtaSecondary',
      title: 'Hero — Secondary CTA Label',
      type: 'string',
      group: 'hero',
    },
    {
      name: 'heroImage',
      title: 'Hero — Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
    },
    // About
    {
      name: 'aboutEyebrow',
      title: 'About — Eyebrow',
      type: 'string',
      group: 'about',
    },
    {
      name: 'aboutHeadline',
      title: 'About — Headline',
      type: 'string',
      group: 'about',
    },
    {
      name: 'aboutBody',
      title: 'About — Body',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'about',
    },
    {
      name: 'aboutImage',
      title: 'About — Image',
      type: 'image',
      options: { hotspot: true },
      group: 'about',
    },
    // Services
    {
      name: 'servicesEyebrow',
      title: 'Services — Eyebrow',
      type: 'string',
      group: 'services',
    },
    {
      name: 'servicesHeadline',
      title: 'Services — Headline',
      type: 'string',
      group: 'services',
    },
    // Process
    {
      name: 'processEyebrow',
      title: 'Process — Eyebrow',
      type: 'string',
      group: 'process',
    },
    {
      name: 'processHeadline',
      title: 'Process — Headline',
      type: 'string',
      group: 'process',
    },
    // Contact
    {
      name: 'contactHeadline',
      title: 'Contact — Headline',
      type: 'string',
      group: 'contact',
    },
    {
      name: 'contactSubtext',
      title: 'Contact — Subtext',
      type: 'text',
      rows: 2,
      group: 'contact',
    },
    {
      name: 'contactEmail',
      title: 'Contact — Email',
      type: 'string',
      group: 'contact',
    },
  ],
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'about', title: 'About' },
    { name: 'services', title: 'Services' },
    { name: 'process', title: 'Process' },
    { name: 'contact', title: 'Contact' },
  ],
};
