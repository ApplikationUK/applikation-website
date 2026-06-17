export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteDescription,
  logo,
  navLinks,
  footerTagline,
  footerBookingStatus,
  footerLocations,
  copyrightText,
  logoCarousel[] {
    name,
    "logoUrl": logo.asset->url
  }
}`;

export const HOMEPAGE_QUERY = `*[_type == "homepageContent"][0]{
  heroEyebrow,
  heroHeadline,
  heroSubheadline,
  heroCtaPrimary,
  heroCtaSecondary,
  heroImage,
  aboutEyebrow,
  aboutHeadline,
  aboutBody,
  aboutImage,
  servicesEyebrow,
  servicesHeadline,
  processEyebrow,
  processHeadline,
  contactHeadline,
  contactSubtext,
  contactEmail
}`;

export const SERVICES_QUERY = `*[_type == "service"] | order(order asc){
  order,
  tag,
  title,
  description,
  bullets
}`;

export const PROCESS_STEPS_QUERY = `*[_type == "processStep"] | order(order asc){
  order,
  number,
  title,
  description
}`;

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc){
  order,
  quote,
  name,
  role,
  avatar
}`;

export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(pubDate desc){
  title,
  "slug": slug.current,
  pubDate,
  category,
  readTime,
  excerpt,
  featured,
  heroImage
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  pubDate,
  category,
  readTime,
  excerpt,
  heroImage,
  body
}`;

export const ALL_BLOG_SLUGS_QUERY = `*[_type == "blogPost"]{ "slug": slug.current }`;

export const CASE_STUDIES_QUERY = `*[_type == "caseStudy"] | order(order asc){
  title,
  "slug": slug.current,
  order,
  tag,
  description,
  stats,
  hasPage
}`;

export const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  tag,
  description,
  stats,
  challenge,
  approach,
  results,
  pullQuote,
  pullQuoteAttribution,
  heroImage
}`;
