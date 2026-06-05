import { createClient } from '@sanity/client';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '3secccgm';
const dataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
});

export async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  try {
    const result = await sanityClient.fetch<T>(query);
    return result ?? fallback;
  } catch {
    return fallback;
  }
}
