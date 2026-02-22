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
        <div className="container mx-auto px-6 md:px-12 max-w-5xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif text-stone-900 mb-6">{contribute.heading}</h1>
            <p className="text-xl text-stone-600 font-light leading-relaxed">{contribute.intro}</p>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-7 space-y-12">
              <div className="prose prose-lg prose-stone">
                <h3 className="font-serif text-2xl text-stone-900 mb-4">{contribute.sectionHeading}</h3>
                <p className="text-stone-600 mb-6">{contribute.sectionCopy}</p>

                <div className="bg-stone-50 border-l-4 border-orange-800 p-6 my-8">
                  <h4 className="font-bold text-stone-900 mb-2">{contribute.guidelinesHeading}</h4>
                  <ul className="space-y-3 text-sm md:text-base text-stone-700">
                    {contribute.guidelines.map((item) => {
                      const Icon = guidelineIcons[item.key] || FileText;

                      return (
                        <li key={item.label} className="flex gap-3">
                          <Icon size={20} className="text-stone-400 shrink-0" />
                          <span>
                            <strong>{item.label}:</strong> {item.copy}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                <h3 className="font-serif text-2xl text-stone-900 mb-4">{contribute.processHeading}</h3>
                <p className="text-stone-600">{contribute.processCopy}</p>
              </div>
            </div>

            <div className="md:col-span-5">
              <div className="bg-stone-900 text-stone-300 p-8 sticky top-32">
                <h3 className="text-white font-serif text-2xl mb-2">Ready to submit?</h3>
                <p className="text-sm text-stone-400 mb-8">
                  We do not use automated forms. Please submit your work directly to the editorial board via email.
                </p>

                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">Email Address</span>
                    <a
                      href={`mailto:${contribute.submissionEmail}`}
                      className="text-lg text-white hover:text-orange-400 transition-colors border-b border-stone-700 pb-1"
                    >
                      {contribute.submissionEmail}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                      Required Subject Line
                    </span>
                    <div className="bg-stone-800 p-3 text-xs font-mono text-stone-300 select-all cursor-text border border-stone-700">
                      {contribute.submissionSubjectTemplate}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-stone-800">
                    {contribute.templateFileUrl ? (
                      <a
                        href={contribute.templateFileUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-full py-3 border border-stone-600 text-stone-400 hover:text-white hover:border-white transition-colors flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                      >
                        <Download size={16} /> Download Template
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="w-full py-3 border border-stone-700 text-stone-600 cursor-not-allowed flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
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
