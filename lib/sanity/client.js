import "server-only";
import { createClient } from "next-sanity";

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const readToken = process.env.SANITY_API_READ_TOKEN;

export function isSanityEnabled() {
  return Boolean(projectId && dataset);
}

export const sanityClient = isSanityEnabled()
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
      stega: false
    })
  : null;

const previewClient = isSanityEnabled() && readToken
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: readToken,
      perspective: "previewDrafts",
      stega: false
    })
  : sanityClient;

export async function sanityFetch({ query, params = {}, tags = [], revalidate = 3600, preview = false }) {
  if (!sanityClient) {
    return null;
  }

  const client = preview ? previewClient : sanityClient;
  return client.fetch(query, params, {
    next: preview ? { revalidate: 0 } : { tags, revalidate }
  });
}
