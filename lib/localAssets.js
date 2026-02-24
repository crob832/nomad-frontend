export const LOCAL_IMAGE_ASSETS = {
  blueMountainGradient: "blue_mountain_gradient.jpg",
  globalStudiesCohort: "500x replacement.jpg",
  nomadLogoBlack: "logo (black).png",
  nomadLogotypeBlack: "logotype (black).png",
  augssLogo: "augss_logo.jpg",
  uoaLogo: "uoa_logo.jpg"
};

export function getLocalAssetUrl(key) {
  return `/api/assets/image?key=${encodeURIComponent(key)}`;
}
