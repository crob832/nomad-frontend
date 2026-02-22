import { groq } from "next-sanity";

const SEO_FIELDS = `
  seo{
    title,
    description,
    noIndex,
    "ogImageUrl": ogImage.asset->url
  }
`;

const ISSUE_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  volume,
  year,
  theme,
  coverTint,
  featured,
  publishedAt,
  "coverImageUrl": coverImage.asset->url,
  "pdfUrl": pdfFile.asset->url,
  ${SEO_FIELDS}
`;

const ARTICLE_CARD_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  category,
  readTime,
  abstract,
  authorName,
  authorDegree,
  featured,
  publishedAt,
  "heroImageUrl": heroImage.asset->url,
  issue->{
    title,
    "slug": slug.current
  },
  ${SEO_FIELDS}
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0]{
    siteTitle,
    siteTagline,
    contactEmail,
    submissionEmail,
    instagramUrl,
    linkedInUrl,
    footerSummary,
    homeHero{
      badge,
      titleLeading,
      titleEmphasisOne,
      titleMiddle,
      titleEmphasisTwo,
      description
    },
    mission{
      subtitle,
      title,
      paragraphs,
      archiveCaption,
      "archiveImageUrl": archiveImage.asset->url
    },
    defaultSeo{
      title,
      description,
      "ogImageUrl": ogImage.asset->url
    }
  }
`;

export const ISSUES_QUERY = groq`
  *[_type == "issue"] | order(year desc, volume desc){
    ${ISSUE_FIELDS}
  }
`;

export const ISSUE_SLUGS_QUERY = groq`
  *[_type == "issue" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const ISSUE_BY_SLUG_QUERY = groq`
  *[_type == "issue" && slug.current == $slug][0]{
    ${ISSUE_FIELDS},
    "articles": *[_type == "article" && references(^._id)] | order(publishedAt desc){
      ${ARTICLE_CARD_FIELDS},
      body
    }
  }
`;

export const FEATURED_ARTICLES_QUERY = groq`
  *[_type == "article" && featured == true] | order(publishedAt desc)[0...6]{
    ${ARTICLE_CARD_FIELDS},
    body
  }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0]{
    ${ARTICLE_CARD_FIELDS},
    body
  }
`;

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current)]{
    "slug": slug.current
  }
`;

export const ARTICLES_FOR_ISSUE_QUERY = groq`
  *[_type == "article" && issue->slug.current == $issueSlug] | order(publishedAt desc){
    ${ARTICLE_CARD_FIELDS},
    body
  }
`;

export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember" && active != false] | order(displayOrder asc, name asc){
    _id,
    name,
    role,
    major,
    "headshotUrl": headshot.asset->url
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "pageAbout"][0]{
    subtitle,
    title,
    paragraphs,
    boardYearLabel,
    ${SEO_FIELDS}
  }
`;

export const CONTRIBUTE_PAGE_QUERY = groq`
  *[_type == "pageContribute"][0]{
    heading,
    intro,
    sectionHeading,
    sectionCopy,
    processHeading,
    processCopy,
    guidelinesHeading,
    guidelines[]{
      key,
      label,
      copy
    },
    submissionSubjectTemplate,
    submissionEmail,
    "templateFileUrl": templateFile.asset->url,
    ${SEO_FIELDS}
  }
`;
