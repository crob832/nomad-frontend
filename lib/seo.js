const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

function toAbsoluteUrl(pathOrUrl = "/") {
  try {
    return new URL(pathOrUrl, SITE_URL).toString();
  } catch {
    return SITE_URL;
  }
}

export function buildMetadata({
  title,
  description,
  pathname = "/",
  seo = null,
  defaultSeo = null
}) {
  const resolvedTitle = seo?.title || title || defaultSeo?.title || "Nomad Journal";
  const resolvedDescription = seo?.description || description || defaultSeo?.description || "";
  const ogImageUrl = seo?.ogImageUrl || defaultSeo?.ogImageUrl || null;
  const canonical = toAbsoluteUrl(pathname);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical
    },
    robots: seo?.noIndex ? "noindex, nofollow" : "index, follow",
    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url: canonical,
      type: "website",
      images: ogImageUrl ? [{ url: toAbsoluteUrl(ogImageUrl) }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description: resolvedDescription,
      images: ogImageUrl ? [toAbsoluteUrl(ogImageUrl)] : undefined
    }
  };
}
