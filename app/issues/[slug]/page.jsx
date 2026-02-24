import Link from "next/link";
import Image from "next/image";
import { Download, MoveLeft } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import SiteLayout from "@/components/SiteLayout";
import { getArticlesForIssue, getIssueBySlug, getIssueSlugs, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const slugs = await getIssueSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const [settings, issue] = await Promise.all([getSiteSettings(), getIssueBySlug(params.slug)]);

  if (!issue) {
    return buildMetadata({
      title: `Issue Not Found | ${settings.siteTitle}`,
      description: settings.defaultSeo?.description,
      pathname: `/issues/${params.slug}`,
      defaultSeo: settings.defaultSeo
    });
  }

  return buildMetadata({
    title: `${issue.title} | ${settings.siteTitle}`,
    description: issue.theme,
    pathname: `/issues/${issue.slug}`,
    seo: issue.seo,
    defaultSeo: settings.defaultSeo
  });
}

export default async function IssueDetailPage({ params }) {
  const [settings, issue] = await Promise.all([getSiteSettings(), getIssueBySlug(params.slug)]);

  if (!issue) {
    notFound();
  }

  const articles = issue.articles?.length > 0 ? issue.articles : await getArticlesForIssue(issue.slug);
  const coverPdfPreview = issue.pdfUrl
    ? `${issue.pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`
    : null;

  return (
    <SiteLayout settings={settings}>
      <div className="animate-fade-in py-20 bg-paper min-h-screen">
        <div className="container mx-auto px-6 md:px-12">
          <Link
            href="/issues"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-10"
          >
            <MoveLeft size={16} />
            Back to Issues
          </Link>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <div className="aspect-[3/4] relative overflow-hidden border border-border-default shadow-md bg-slate-200">
                {issue.coverImageUrl ? (
                  <Image
                    src={issue.coverImageUrl}
                    alt={issue.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="absolute inset-0 object-cover"
                  />
                ) : coverPdfPreview ? (
                  <iframe
                    src={coverPdfPreview}
                    title={`${issue.title} cover preview`}
                    className="absolute inset-0 w-full h-full pointer-events-none bg-white"
                    tabIndex={-1}
                    aria-hidden="true"
                  />
                ) : (
                  <div className={`absolute inset-0 ${issue.coverColor}`} />
                )}
              </div>
            </div>

            <div className="md:col-span-8">
              <SectionTitle subtitle="Issue Theme">{issue.title}</SectionTitle>
              <p className="text-lg text-ink-soft leading-relaxed mb-8">{issue.theme}</p>

              {issue.pdfUrl && (
                <a
                  href={issue.pdfUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-white hover:bg-brand-strong transition-colors"
                >
                  <Download size={16} />
                  Download Full Issue (PDF)
                </a>
              )}
            </div>
          </div>

          <section className="mt-20">
            <SectionTitle subtitle="Contents">Articles in this Issue</SectionTitle>
            {articles.length === 0 ? (
              <p className="text-ink-muted">No articles are published for this issue yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </SiteLayout>
  );
}
