import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import SiteLayout from "@/components/SiteLayout";
import { getIssues, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: "Issues | Nomad Journal",
    description: "Browse published editions of Nomad Journal.",
    pathname: "/issues",
    defaultSeo: settings.defaultSeo
  });
}

export default async function IssuesPage() {
  const [issues, settings] = await Promise.all([getIssues(), getSiteSettings()]);

  return (
    <SiteLayout settings={settings}>
      <div className="animate-fade-in py-24 bg-paper min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-12">
          <SectionTitle subtitle="The Archive">Published Editions</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {issues.map((issue) => {
              const issueHref = issue.slug ? `/issues/${issue.slug}` : "/issues";
              const directPdfHref = issue.pdfUrl || null;
              const coverPdfPreview = issue.pdfUrl
                ? `${issue.pdfUrl}#page=1&view=FitH&toolbar=0&navpanes=0&scrollbar=0`
                : null;

              return (
                <article key={issue.id} className="group">
                  {directPdfHref ? (
                    <a href={directPdfHref} target="_blank" rel="noreferrer noopener" className="block">
                      <div className="aspect-[3/4] mb-6 relative overflow-hidden border border-border-default shadow-lg transition-transform duration-500 group-hover:-translate-y-2 bg-paper-alt">
                        {issue.coverImageUrl ? (
                          <Image
                            src={issue.coverImageUrl}
                            alt={issue.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                      <div className="pr-4">
                        <h4 className="text-xl font-serif text-ink mb-2">{issue.title}</h4>
                        <p className="text-sm text-ink-muted leading-relaxed mb-4">{issue.theme}</p>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-2 hover:gap-3 transition-all">
                          Open Issue PDF <ArrowRight size={12} />
                        </span>
                      </div>
                    </a>
                  ) : (
                    <Link href={issueHref} className="block">
                      <div className="aspect-[3/4] mb-6 relative overflow-hidden border border-border-default shadow-lg transition-transform duration-500 group-hover:-translate-y-2 bg-paper-alt">
                        {issue.coverImageUrl ? (
                          <Image
                            src={issue.coverImageUrl}
                            alt={issue.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
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

                      <div className="pr-4">
                        <h4 className="text-xl font-serif text-ink mb-2">{issue.title}</h4>
                        <p className="text-sm text-ink-muted leading-relaxed mb-4">{issue.theme}</p>
                        <span className="text-xs font-bold uppercase tracking-wider text-brand flex items-center gap-2 hover:gap-3 transition-all">
                          View Contents <ArrowRight size={12} />
                        </span>
                      </div>
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

