import SectionTitle from "@/components/SectionTitle";
import SiteLayout from "@/components/SiteLayout";
import { getAboutPageContent, getPastEditorialTeams, getSiteSettings, getTeamMembers } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [settings, about] = await Promise.all([getSiteSettings(), getAboutPageContent()]);

  return buildMetadata({
    title: `${about.title} | ${settings.siteTitle}`,
    description: about.paragraphs?.[0] || settings.defaultSeo?.description,
    pathname: "/about",
    seo: about.seo,
    defaultSeo: settings.defaultSeo
  });
}

export default async function AboutPage() {
  const [team, settings, about, pastTeams] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
    getAboutPageContent(),
    getPastEditorialTeams()
  ]);
  const currentBoardLabel = "2026 Editorial Board";
  const currentBoard = team
    .filter((member) => member.name?.toLowerCase().includes("dulmi"))
    .slice(0, 1);
  const resolvedCurrentBoard = currentBoard.length > 0
    ? currentBoard
    : [{ id: "team-dulmi", role: "Editor-in-Chief", name: "Dulmi", major: "" }];

  return (
    <SiteLayout settings={settings}>
      <div className="animate-fade-in py-24 bg-stone-50 min-h-screen">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <SectionTitle subtitle={about.subtitle}>{about.title}</SectionTitle>

          <div className="space-y-12 text-lg text-stone-700 font-light leading-relaxed">
            {about.paragraphs?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-20">
            <h3 className="font-serif text-3xl text-stone-900 mb-10">{currentBoardLabel}</h3>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {resolvedCurrentBoard.map((member) => (
                <div key={member.id} className="border-b border-stone-200 pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block mb-1">
                    {member.role}
                  </span>
                  <h4 className="text-xl font-serif text-stone-900">{member.name}</h4>
                  {member.major && <p className="text-sm text-stone-500 italic mt-1">{member.major}</p>}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <h3 className="font-serif text-3xl text-stone-900 mb-10">Past Editorial Teams</h3>
            <div className="space-y-10">
              {pastTeams.map((entry) => (
                <section key={entry.year} className="border-t border-stone-200 pt-6">
                  <h4 className="font-serif text-2xl text-stone-900 mb-5">Editorial Team {entry.year}</h4>
                  <div className="space-y-8">
                    {entry.roles.map((role) => (
                      <div key={`${entry.year}-${role.label}`}>
                        <span className="text-xs font-bold uppercase tracking-wider text-orange-800 block mb-3">
                          {role.label}
                        </span>
                        <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
                          {role.names.map((name) => (
                            <div key={`${entry.year}-${role.label}-${name}`} className="border-b border-stone-200 pb-4">
                              <h4 className="text-xl font-serif text-stone-900">{name}</h4>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
