import Link from "next/link";
import { MoveLeft } from "lucide-react";
import PortableTextContent from "@/components/PortableTextContent";
import SiteLayout from "@/components/SiteLayout";
import { getArticleBySlug, getArticleSlugs, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

function formatDate(input) {
  if (!input) {
    return null;
  }

  try {
    return new Intl.DateTimeFormat("en-NZ", {
      day: "numeric",
      month: "long",
      year: "numeric"
    }).format(new Date(input));
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const [settings, article] = await Promise.all([getSiteSettings(), getArticleBySlug(params.slug)]);

  if (!article) {
    return buildMetadata({
      title: `Article Not Found | ${settings.siteTitle}`,
      description: settings.defaultSeo?.description,
      pathname: `/articles/${params.slug}`,
      defaultSeo: settings.defaultSeo
    });
  }

  return buildMetadata({
    title: `${article.title} | ${settings.siteTitle}`,
    description: article.abstract,
    pathname: `/articles/${article.slug}`,
    seo: article.seo,
    defaultSeo: settings.defaultSeo
  });
}

export default async function ArticlePage({ params }) {
  const [settings, article] = await Promise.all([getSiteSettings(), getArticleBySlug(params.slug)]);

  if (!article) {
    notFound();
  }

  const publishedLabel = formatDate(article.publishedAt);
  const issueHref = article.issueSlug ? `/issues/${article.issueSlug}` : "/issues";

  return (
    <SiteLayout settings={settings}>
      <article className="animate-fade-in py-20 bg-white min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Link
            href={issueHref}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors mb-10"
          >
            <MoveLeft size={16} />
            {article.issue ? `Back to ${article.issue}` : "Back to Issues"}
          </Link>

          <header className="border-b border-stone-200 pb-8 mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-orange-700 font-bold mb-3">{article.category}</p>
            <h1 className="font-serif text-4xl md:text-6xl text-stone-900 leading-tight mb-5">{article.title}</h1>
            <p className="text-lg text-stone-600 leading-relaxed mb-6">{article.abstract}</p>
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500">
              <span className="font-medium text-stone-700">{article.author}</span>
              {article.degree && <span className="italic">{article.degree}</span>}
              {article.readTime && <span>{article.readTime}</span>}
              {publishedLabel && <span>{publishedLabel}</span>}
            </div>
          </header>

          {article.heroImageUrl && (
            <img
              src={article.heroImageUrl}
              alt={article.title}
              className="w-full h-[420px] object-cover mb-12 border border-stone-200"
            />
          )}

          <div className="prose prose-stone prose-lg max-w-none">
            <PortableTextContent value={article.body} />
          </div>
        </div>
      </article>
    </SiteLayout>
  );
}
