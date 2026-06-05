import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { siteSettings } from './src/sanity/schemas/siteSettings';
import { homepageContent } from './src/sanity/schemas/homepageContent';
import { service } from './src/sanity/schemas/service';
import { processStep } from './src/sanity/schemas/processStep';
import { testimonial } from './src/sanity/schemas/testimonial';
import { blogPost } from './src/sanity/schemas/blogPost';
import { caseStudy } from './src/sanity/schemas/caseStudy';

export default defineConfig({
  name: 'applikation',
  title: 'Applikation CMS',
  projectId: '3secccgm',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Site Settings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.listItem()
              .title('Homepage Content')
              .child(S.document().schemaType('homepageContent').documentId('homepageContent')),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.documentTypeListItem('processStep').title('Process Steps'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.divider(),
            S.documentTypeListItem('blogPost').title('Blog Posts'),
            S.documentTypeListItem('caseStudy').title('Case Studies'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [siteSettings, homepageContent, service, processStep, testimonial, blogPost, caseStudy],
  },
});
