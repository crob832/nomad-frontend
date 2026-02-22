# Nomad Journal Build Plan

## Completed
- Scaffolded Next.js 14 + Tailwind project with configs (`package.json`, `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `jsconfig.json`).
- Added global layout and styles (`app/layout.jsx`, `app/globals.css`) with basic fade-in animation.
- Ported provided React UI into Next pages: home (`app/page.jsx`), issues (`app/issues/page.jsx`), contribute (`app/contribute/page.jsx`), and about (`app/about/page.jsx`).
- Built shared components: layout/nav/footer (`components/SiteLayout.jsx`), section titles (`components/SectionTitle.jsx`), article cards (`components/ArticleCard.jsx`).
- Centralized mock content in `lib/content.js` and exposed CMS fetch stubs in `lib/cms.js` for future headless CMS integration.

## Remaining
- Install dependencies and run locally: `npm install && npm run dev`.
- Set up Sanity (or other headless CMS) with schemas for Issue, Article, and Team Member; seed initial content.
- Replace `lib/cms.js` stubs with real CMS client/queries (e.g., `next-sanity` GROQ fetches) and wire data to pages.
- Add image/PDF handling for issue covers and downloads once CMS assets exist.
- Optional: routing for individual issues/articles, SEO metadata per page, and analytics.***
