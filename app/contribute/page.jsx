import { BookOpen, Download, FileText, Users } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import { getContributePageContent, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

const guidelineIcons = {
  length: FileText,
  format: FileText,
  details: Users,
  referencing: BookOpen
};

export async function generateMetadata() {
  const [settings, contribute] = await Promise.all([getSiteSettings(), getContributePageContent()]);

  return buildMetadata({
    title: `${contribute.heading} | ${settings.siteTitle}`,
    description: contribute.intro,
    pathname: "/contribute",
    seo: contribute.seo,
    defaultSeo: settings.defaultSeo
  });
}

export default async function ContributePage() {
  const [settings, contribute] = await Promise.all([getSiteSettings(), getContributePageContent()]);

  return (
    <SiteLayout settings={settings}>
      <div className="animate-fade-in py-24 bg-white min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-5xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-ink mb-6">{contribute.heading}</h1>
            <p className="text-xl text-ink-muted font-light leading-relaxed">{contribute.intro}</p>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-12">
              <div className="prose prose-lg prose-stone">
                <h3 className="font-serif text-2xl text-ink mb-4">{contribute.sectionHeading}</h3>
                <p className="text-ink-muted mb-6">{contribute.sectionCopy}</p>

                <div className="bg-paper-alt border-l-4 border-brand p-6 my-8">
                  <h4 className="font-bold text-ink mb-2">{contribute.guidelinesHeading}</h4>
                  <ul className="space-y-3 text-sm md:text-base text-ink-soft">
                    {contribute.guidelines.map((item) => {
                      const Icon = guidelineIcons[item.key] || FileText;

                      return (
                        <li key={item.label} className="flex gap-3">
                          <Icon size={20} className="text-ink-subtle shrink-0" />
                          <span>
                            <strong>{item.label}:</strong> {item.copy}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <h3 className="font-serif text-2xl text-ink mb-4">{contribute.processHeading}</h3>
                <p className="text-ink-muted">{contribute.processCopy}</p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-ink text-slate-300 p-8 sticky top-32">
                <h3 className="text-white font-serif text-2xl mb-2">Ready to submit?</h3>
                <p className="text-sm text-slate-400 mb-8">
                  We do not use automated forms. Please submit your work directly to the editorial board via email.
                </p>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">Email Address</span>
                    <a
                      href={`mailto:${contribute.submissionEmail}`}
                      className="text-lg text-white hover:text-accent transition-colors border-b border-slate-700 pb-1"
                    >
                      {contribute.submissionEmail}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                      Required Subject Line
                    </span>
                    <div className="bg-slate-900 p-3 text-xs font-mono text-slate-300 select-all cursor-text border border-slate-700">
                      {contribute.submissionSubjectTemplate}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    {contribute.templateFileUrl ? (
                      <a
                        href={contribute.templateFileUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full py-3 border border-slate-600 text-slate-300 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                      >
                        <Download size={16} /> Download Template
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-3 border border-slate-700 text-slate-600 cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                      >
                        <Download size={16} /> Template Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
