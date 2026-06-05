import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string(),
    author: z.string().default('Applikation Team'),
    pubDate: z.date(),
    readTime: z.number(),
    featured: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    description: z.string(),
    stats: z.array(z.object({
      num: z.string(),
      label: z.string(),
    })),
    hasPage: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
