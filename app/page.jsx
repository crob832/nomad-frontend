import Link from "next/link";
import { ArrowRight, ChevronRight, Globe, Users } from "lucide-react";
import ArticleCard from "@/components/ArticleCard";
import SectionTitle from "@/components/SectionTitle";
import SiteLayout from "@/components/SiteLayout";
import { getFeaturedArticles, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const settings = await getSiteSettings();

  return buildMetadata({
    title: settings.siteTitle,
    description: settings.defaultSeo?.description,
    pathname: "/",
    defaultSeo: settings.defaultSeo
  });
}

export default async function HomePage() {
  const [featured, settings] = await Promise.all([getFeaturedArticles(), getSiteSettings()]);
  const hero = settings.homeHero;
  const mission = settings.mission;

  return (
    <SiteLayout settings={settings}>
      <div className="animate-fade-in">
        <section className="relative min-h-[85vh] flex flex-col justify-center border-b border-stone-200 bg-stone-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-stone-200 opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full text-stone-300 fill-current opacity-50">
              <path
                d="M45.7,23.1c-5.8-5.3-15.6,1.9-20.9,4.4c-3.3,1.6-6.8,2.7-10.4,2.9c-8.5,0.4-13.4,9.6-9.1,17.1 c2.8,4.9,7.1,8.9,12.2,11.5c6.3,3.2,8.9,10.7,5.7,17.1c-2.3,4.6-6.6,7.9-11.6,8.7C5.3,86.2,0,93.4,0,101.4s5.3,15.2,11.6,16.5 c5,0.8,9.4,4.1,11.6,8.7c3.2,6.4,0.6,14-5.7,17.1c-5.1,2.6-9.4,6.6-12.2,11.5c-4.3,7.5,0.6,16.7,9.1,17.1c3.6,0.2,7.1,1.3,10.4,2.9 c5.3,2.5,15.1,9.7,20.9,4.4c5.1-4.7,6.4-12.4,3.2-18.4c-2.1-4.1-2.1-9,0-13.1c3.2-6.1,1.9-13.7-3.2-18.4 c-4.4-4.1-5.6-10.6-2.9-15.9c2.3-4.5,7.9-6.4,12.5-4.2c6.3,3.1,13.9-0.2,16.2-6.9c1.6-4.6,6.5-7.2,11.3-6.1 c7.4,1.8,14.6-3.8,14.6-11.4s-7.2-13.2-14.6-11.4c-4.8,1.2-9.7-1.5-11.3-6.1c-2.3-6.7-9.9-10-16.2-6.9c-4.6,2.3-10.2,0.3-12.5-4.2 C40.1,33.7,41.3,27.2,45.7,23.1z"
                transform="scale(5) translate(10,10)"
              />
            </svg>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl">
              <span className="inline-block py-1 px-3 border border-stone-900 text-stone-900 text-xs font-bold uppercase tracking-widest mb-6">
                {hero.badge}
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-stone-900 leading-[0.95] mb-8">
                {hero.titleLeading} <span className="italic text-orange-800">{hero.titleEmphasisOne}</span> {hero.titleMiddle}{" "}
                <span className="italic text-orange-800">{hero.titleEmphasisTwo}</span>.
              </h1>
              <p className="text-xl text-stone-600 max-w-xl font-light leading-relaxed mb-10">{hero.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/issues"
                  className="px-8 py-4 bg-stone-900 text-white font-medium hover:bg-orange-800 transition-colors flex items-center justify-center gap-2 group"
                >
                  Read Latest Issue
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 border border-stone-300 text-stone-600 font-medium hover:border-stone-900 hover:text-stone-900 transition-colors"
                >
                  Our Mission
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 md:px-12">
            <SectionTitle subtitle="Selected Works">Featured Analysis</SectionTitle>
            <div className="grid grid-cols-1 gap-4">
              {featured.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link
                href="/issues"
                className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-800 transition-colors border-b border-transparent hover:border-orange-800 pb-1"
              >
                View Archive <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="py-24 bg-stone-100 border-y border-stone-200">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                {mission.archiveImageUrl ? (
                  <img
                    src={mission.archiveImageUrl}
                    alt="Global Studies Student Cohort"
                    className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  />
                ) : (
                  <div className="w-full h-[500px] bg-stone-300" />
                )}
                <p className="text-xs text-stone-500 mt-2 font-mono">{mission.archiveCaption}</p>
              </div>
              <div>
                <SectionTitle subtitle={mission.subtitle}>{mission.title}</SectionTitle>
                {mission.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-lg text-stone-700 mb-6 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                  <div className="bg-white p-6 border border-stone-200">
                    <Users className="text-orange-800 mb-4" size={24} />
                    <h4 className="font-serif text-xl mb-2">Student Led</h4>
                    <p className="text-sm text-stone-500">Edited and designed entirely by the undergraduate cohort.</p>
                  </div>
                  <div className="bg-white p-6 border border-stone-200">
                    <Globe className="text-orange-800 mb-4" size={24} />
                    <h4 className="font-serif text-xl mb-2">Interdisciplinary</h4>
                    <p className="text-sm text-stone-500">Bridging politics, environment, culture, and economy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
