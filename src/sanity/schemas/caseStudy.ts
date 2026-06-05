export const caseStudy = {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'order',
      title: 'Order (in carousel)',
      type: 'number',
    },
    {
      name: 'tag',
      title: 'Tag (e.g. "// Product · Innovation")',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Short Description (carousel)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'num', title: 'Number (e.g. "2×")', type: 'string' },
            { name: 'label', title: 'Label', type: 'string' },
          ],
        },
      ],
    },
    {
      name: 'hasPage',
      title: 'Has dedicated page?',
      type: 'boolean',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'approach',
      title: 'Approach',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'pullQuote',
      title: 'Pull Quote',
      type: 'text',
      rows: 3,
    },
    {
      name: 'pullQuoteAttribution',
      title: 'Pull Quote — Attribution',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
  ],
  orderings: [{ title: 'Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
};
