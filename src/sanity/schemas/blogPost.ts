export const blogPost = {
  name: 'blogPost',
  title: 'Blog Post',
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
      name: 'pubDate',
      title: 'Publish Date',
      type: 'date',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'readTime',
      title: 'Read Time (e.g. "5 min read")',
      type: 'string',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', title: 'Alt text', type: 'string' }],
        },
      ],
    },
    {
      name: 'featured',
      title: 'Featured post?',
      type: 'boolean',
    },
  ],
  orderings: [
    { title: 'Publish Date, Newest', name: 'pubDateDesc', by: [{ field: 'pubDate', direction: 'desc' }] },
  ],
};
