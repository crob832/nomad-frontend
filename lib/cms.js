import "server-only";
import fs from "fs/promises";
import path from "path";
import { draftMode } from "next/headers";
import {
  ABOUT_PAGE,
  CONTRIBUTE_PAGE,
  FEATURED_ANALYSIS_OVERRIDES,
  FEATURED_ARTICLES,
  ISSUES,
  PAST_EDITORIAL_TEAMS,
  SITE_SETTINGS,
  TEAM_MEMBERS
} from "./content";
import { isSanityEnabled, sanityFetch } from "./sanity/client";
import {
  ABOUT_PAGE_QUERY,
  ARTICLE_BY_SLUG_QUERY,
  ARTICLES_FOR_ISSUE_QUERY,
  ARTICLE_SLUGS_QUERY,
  CONTRIBUTE_PAGE_QUERY,
  FEATURED_ARTICLES_QUERY,
  ISSUE_BY_SLUG_QUERY,
  ISSUES_QUERY,
  ISSUE_SLUGS_QUERY,
  SITE_SETTINGS_QUERY,
  TEAM_MEMBERS_QUERY
} from "./sanity/queries";

const LOCAL_ISSUES_DIR = path.join(process.cwd(), "issues");
const LOCAL_ISSUE_COLORS = [
  "bg-ink",
  "bg-brand",
  "bg-brand-strong",
  "bg-slate-700",
  "bg-cyan-700"
];

function getPreviewEnabled() {
  try {
    return draftMode().isEnabled;
  } catch {
    return false;
  }
}

async function readFromSanity({ query, params = {}, tags = [], revalidate = 3600 }) {
  if (!isSanityEnabled()) {
    return null;
  }

  try {
    return await sanityFetch({
      query,
      params,
      tags,
      revalidate,
      preview: getPreviewEnabled()
    });
  } catch {
    return null;
  }
}

function makeSlug(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function issueDateLabel(date) {
  try {
    return new Intl.DateTimeFormat("en-NZ", {
      month: "long",
      year: "numeric"
    }).format(date);
  } catch {
    return null;
  }
}

function yearFromIssueName(fileName) {
  const match = fileName.match(/(19|20)\d{2}/);
  return match ? match[0] : null;
}

async function getLocalIssues() {
  try {
    const entries = await fs.readdir(LOCAL_ISSUES_DIR, { withFileTypes: true });
    const files = entries.filter((entry) => entry.isFile() && /\.pdf$/i.test(entry.name));

    if (files.length === 0) {
      return [];
    }

    const issues = await Promise.all(
      files.map(async (file, index) => {
        const fullPath = path.join(LOCAL_ISSUES_DIR, file.name);
        const stats = await fs.stat(fullPath);
        const baseName = file.name.replace(/\.pdf$/i, "");
        const year = yearFromIssueName(baseName);
        const title = year ? `Nomad Journal ${year}` : baseName;
        const slug = year ? `nomad-journal-${year}` : makeSlug(baseName);
        const publishedLabel = year ? `Published in ${year}.` : issueDateLabel(stats.mtime);

        return {
          id: `local-issue-${slug}`,
          slug,
          title,
          year: year || String(stats.mtime.getFullYear()),
          theme: publishedLabel ? publishedLabel : "Published issue.",
          coverColor: LOCAL_ISSUE_COLORS[index % LOCAL_ISSUE_COLORS.length],
          pdfUrl: `/api/issues/file?name=${encodeURIComponent(file.name)}`,
          publishedAt: stats.mtime.toISOString(),
          articles: []
        };
      })
    );

    return issues.sort((a, b) => Number(b.year) - Number(a.year));
  } catch {
    return [];
  }
}

function mapArticle(article) {
  if (!article) {
    return null;
  }

  return {
    id: article._id || article.id,
    slug: article.slug || null,
    title: article.title || "",
    author: article.authorName || article.author || "Nomad Editorial",
    degree: article.authorDegree || article.degree || "",
    abstract: article.abstract || "",
    category: article.category || "Analysis",
    readTime: article.readTime || "",
    issue: article.issue?.title || article.issue || "",
    issueSlug: article.issue?.slug || article.issueSlug || null,
    featured: Boolean(article.featured),
    publishedAt: article.publishedAt || null,
    heroImageUrl: article.heroImageUrl || null,
    href: article.href || null,
    openInNewTab: Boolean(article.openInNewTab),
    body: article.body || [],
    seo: article.seo || null
  };
}

function mapIssue(issue) {
  if (!issue) {
    return null;
  }

  return {
    id: issue._id || issue.id,
    slug: issue.slug || issue.id || null,
    title: issue.title || "",
    volume: issue.volume || null,
    year: issue.year || "",
    theme: issue.theme || "",
    coverColor: issue.coverTint || issue.coverColor || "bg-ink",
    coverImageUrl: issue.coverImageUrl || null,
    pdfUrl: issue.pdfUrl || null,
    featured: Boolean(issue.featured),
    publishedAt: issue.publishedAt || null,
    seo: issue.seo || null,
    articles: Array.isArray(issue.articles) ? issue.articles.map(mapArticle).filter(Boolean) : []
  };
}

function mapTeamMember(member) {
  const rawName = member.name || "";
  const normalizedName = rawName.trim().toLowerCase() === "dulmi" ? "Dulmi De Silva" : rawName;

  return {
    id: member._id || member.id || member.name,
    name: normalizedName,
    role: member.role || "",
    major: member.major || "",
    headshotUrl: member.headshotUrl || null
  };
}

function toFallbackIssue(issue) {
  return mapIssue({
    ...issue,
    articles: FEATURED_ARTICLES.filter((article) => article.issueSlug === issue.slug)
  });
}

function mergeSiteSettings(overrides = {}) {
  return {
    ...SITE_SETTINGS,
    ...overrides,
    homeHero: {
      ...SITE_SETTINGS.homeHero,
      ...(overrides.homeHero || {})
    },
    mission: {
      ...SITE_SETTINGS.mission,
      ...(overrides.mission || {})
    },
    footer: {
      ...SITE_SETTINGS.footer,
      summary: overrides.footerSummary || SITE_SETTINGS.footer.summary
    },
    defaultSeo: {
      ...SITE_SETTINGS.defaultSeo,
      ...(overrides.defaultSeo || {})
    }
  };
}

export function isCmsConnected() {
  return isSanityEnabled();
}

export async function getSiteSettings() {
  const settings = await readFromSanity({
    query: SITE_SETTINGS_QUERY,
    tags: ["settings"]
  });

  if (!settings) {
    return SITE_SETTINGS;
  }

  return mergeSiteSettings(settings);
}

export async function getIssues() {
  const localIssues = await getLocalIssues();
  if (localIssues.length > 0) {
    return localIssues.map(mapIssue).filter(Boolean);
  }

  const issues = await readFromSanity({
    query: ISSUES_QUERY,
    tags: ["issues"]
  });

  if (!Array.isArray(issues) || issues.length === 0) {
    return ISSUES.map(toFallbackIssue);
  }

  return issues.map(mapIssue).filter(Boolean);
}

export async function getIssueSlugs() {
  const localIssues = await getLocalIssues();
  if (localIssues.length > 0) {
    return localIssues.map((issue) => issue.slug).filter(Boolean);
  }

  const slugs = await readFromSanity({
    query: ISSUE_SLUGS_QUERY,
    tags: ["issues"]
  });

  if (!Array.isArray(slugs) || slugs.length === 0) {
    return ISSUES.map((issue) => issue.slug).filter(Boolean);
  }

  return slugs.map((item) => item.slug).filter(Boolean);
}

export async function getIssueBySlug(slug) {
  const localIssues = await getLocalIssues();
  if (localIssues.length > 0) {
    const localIssue = localIssues.find((issue) => issue.slug === slug);
    if (localIssue) {
      return mapIssue(localIssue);
    }
  }

  const issue = await readFromSanity({
    query: ISSUE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["issues", `issue:${slug}`]
  });

  if (!issue) {
    const fallbackIssue = ISSUES.find((item) => item.slug === slug || item.id === slug);
    return fallbackIssue ? toFallbackIssue(fallbackIssue) : null;
  }

  return mapIssue(issue);
}

export async function getFeaturedArticles() {
  const localIssues = await getLocalIssues();
  if (localIssues.length > 0) {
    const byYear = new Map(localIssues.map((issue) => [String(issue.year), issue]));
    const localFeatured = FEATURED_ANALYSIS_OVERRIDES.map((item) => {
      const issue = byYear.get(String(item.issueYear));
      const issueTitle = issue?.title || `Nomad Journal ${item.issueYear}`;

      return mapArticle({
        id: item.id,
        title: item.title,
        author: "Nomad Editorial",
        degree: "",
        abstract: "",
        category: "Featured Analysis",
        readTime: "",
        issue: issueTitle,
        issueSlug: issue?.slug || null,
        href: issue?.pdfUrl || null,
        openInNewTab: Boolean(issue?.pdfUrl),
        publishedAt: issue?.publishedAt || null
      });
    }).filter(Boolean);

    if (localFeatured.length > 0) {
      return localFeatured;
    }
  }

  const featured = await readFromSanity({
    query: FEATURED_ARTICLES_QUERY,
    tags: ["articles", "featured-articles"]
  });

  if (!Array.isArray(featured) || featured.length === 0) {
    return FEATURED_ARTICLES.map(mapArticle);
  }

  return featured.map(mapArticle).filter(Boolean);
}

export async function getArticleSlugs() {
  const slugs = await readFromSanity({
    query: ARTICLE_SLUGS_QUERY,
    tags: ["articles"]
  });

  if (!Array.isArray(slugs) || slugs.length === 0) {
    return FEATURED_ARTICLES.map((article) => article.slug).filter(Boolean);
  }

  return slugs.map((item) => item.slug).filter(Boolean);
}

export async function getArticlesForIssue(issueSlug) {
  const articles = await readFromSanity({
    query: ARTICLES_FOR_ISSUE_QUERY,
    params: { issueSlug },
    tags: ["articles", `issue:${issueSlug}`]
  });

  if (!Array.isArray(articles)) {
    return FEATURED_ARTICLES.filter((article) => article.issueSlug === issueSlug).map(mapArticle);
  }

  return articles.map(mapArticle).filter(Boolean);
}

export async function getArticleBySlug(slug) {
  const article = await readFromSanity({
    query: ARTICLE_BY_SLUG_QUERY,
    params: { slug },
    tags: ["articles", `article:${slug}`]
  });

  if (!article) {
    const fallbackArticle = FEATURED_ARTICLES.find((item) => item.slug === slug);
    return fallbackArticle ? mapArticle(fallbackArticle) : null;
  }

  return mapArticle(article);
}

export async function getTeamMembers() {
  const team = await readFromSanity({
    query: TEAM_MEMBERS_QUERY,
    tags: ["team"]
  });

  if (!Array.isArray(team) || team.length === 0) {
    return TEAM_MEMBERS.map(mapTeamMember);
  }

  return team.map(mapTeamMember).filter(Boolean);
}

export async function getAboutPageContent() {
  const about = await readFromSanity({
    query: ABOUT_PAGE_QUERY,
    tags: ["about"]
  });

  if (!about) {
    return ABOUT_PAGE;
  }

  return {
    ...ABOUT_PAGE,
    ...about,
    paragraphs: Array.isArray(about.paragraphs) && about.paragraphs.length > 0
      ? about.paragraphs
      : ABOUT_PAGE.paragraphs
  };
}

export async function getContributePageContent() {
  const contribute = await readFromSanity({
    query: CONTRIBUTE_PAGE_QUERY,
    tags: ["contribute"]
  });

  if (!contribute) {
    return {
      ...CONTRIBUTE_PAGE,
      submissionEmail: SITE_SETTINGS.submissionEmail,
      templateFileUrl: null
    };
  }

  return {
    ...CONTRIBUTE_PAGE,
    ...contribute,
    guidelines: Array.isArray(contribute.guidelines) && contribute.guidelines.length > 0
      ? contribute.guidelines
      : CONTRIBUTE_PAGE.guidelines,
    submissionEmail: contribute.submissionEmail || SITE_SETTINGS.submissionEmail
  };
}

export async function getPastEditorialTeams() {
  return PAST_EDITORIAL_TEAMS;
}
