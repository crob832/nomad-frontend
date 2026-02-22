import imageUrlBuilder from "@sanity/image-url";
import { isSanityEnabled, sanityClient } from "./client";

const builder = isSanityEnabled() && sanityClient ? imageUrlBuilder(sanityClient) : null;

export function buildImageUrl(source, options = {}) {
  if (!source) {
    return null;
  }

  if (typeof source === "string") {
    return source;
  }

  if (source?.asset?.url) {
    return source.asset.url;
  }

  if (!builder) {
    return null;
  }

  let image = builder.image(source);

  if (options.width) {
    image = image.width(options.width);
  }
  if (options.height) {
    image = image.height(options.height);
  }
  if (options.fit) {
    image = image.fit(options.fit);
  }
  if (options.quality) {
    image = image.quality(options.quality);
  }

  return image.url();
}
