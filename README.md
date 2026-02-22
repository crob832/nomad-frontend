# Nomad Journal

Next.js App Router site with Sanity CMS integration for issues, articles, team members, and static pages.

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Sanity + next-sanity

## Setup

1. Install dependencies:
   - `npm install`
2. Copy env template:
   - `copy .env.example .env.local` (Windows)
3. Fill `.env.local` values for your Sanity project.
4. Run the app:
   - `npm run dev`
5. Open Studio:
   - `http://localhost:3000/studio`

## CMS Models

- `issue`
- `article`
- `teamMember`
- `siteSettings`
- `pageAbout`
- `pageContribute`

## Seed Initial Content

1. Ensure `SANITY_API_WRITE_TOKEN` is set in `.env.local`.
2. Run:
   - `npm run seed:cms`

## Preview Mode

- Enable preview:
  - `/api/draft/enable?secret=YOUR_SECRET&slug=/`
- Disable preview:
  - `/api/draft/disable?slug=/`

Use `SANITY_PREVIEW_SECRET` in `.env.local`.

## Revalidation Webhook

Set a Sanity webhook to `POST /api/revalidate` and send:

- `Authorization: Bearer <SANITY_REVALIDATE_SECRET>`
- JSON body with `_type` and optional `slug.current`.

The endpoint revalidates route paths and cache tags for changed content.

## Editorial Workflow

1. Update hero/footer/global details in `siteSettings`.
2. Create or update an `issue`.
3. Create `article` entries linked to the issue.
4. Update `pageAbout` and `pageContribute` for static copy.
5. Update `teamMember` entries and display order.
6. Publish entries and verify changes on the site.

## Notes

- If Sanity env vars are missing, the app falls back to local mock content in `lib/content.js`.
- CMS fetches are wrapped in `lib/cms.js` to keep frontend components decoupled from provider details.
