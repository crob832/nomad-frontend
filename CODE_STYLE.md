# Nomad Code Style Guide

This document captures the style conventions currently used in this repository.

## Scope

- Framework: Next.js App Router (`app/`).
- Language: JavaScript/JSX (no TypeScript yet).
- Styling: Tailwind CSS utilities with light custom global CSS.

## File and Naming Conventions

- Use `PascalCase` for reusable component files and component names.
  - Examples: `components/SiteLayout.jsx`, `components/ArticleCard.jsx`.
- Use route-based lowercase folders in `app/`.
  - Examples: `app/about/page.jsx`, `app/issues/page.jsx`.
- Use `camelCase` for variables and function names.
- Use `UPPER_CASE` for exported content constants.
  - Example: `ISSUES`, `FEATURED_ARTICLES`, `TEAM_MEMBERS`.

## Imports

- Keep imports grouped in this order:
  1. External packages
  2. Internal alias imports (`@/...`)
  3. Relative imports (if needed)
- Use the `@` path alias configured in `jsconfig.json`.

## Component Patterns

- Prefer function components with named exports as defaults per file.
- Keep page components focused on composing sections and mapping data.
- Keep presentational blocks in shared components when reused.
- Use async server components for data reads in route pages where possible.
- Use client components only when hooks/browser APIs are required.
  - Example: `components/SiteLayout.jsx` uses `useState`, `useEffect`, `usePathname`.

## Data Layer

- Keep static/mock content in `lib/content.js`.
- Access content through async functions in `lib/cms.js` (CMS abstraction).
- When replacing mock data with a real CMS, keep the same abstraction boundary.

## Formatting Rules

- Use 2-space indentation.
- Use semicolons.
- Use double quotes for strings.
- Keep trailing commas where valid.
- Prefer clear variable names over short abbreviations.

## Tailwind and Visual Style

- Build UI primarily with Tailwind utility classes.
- Use neutral stone palette with orange accents to match existing design language.
- Keep typography consistent with Tailwind config:
  - `font-serif` for editorial/display headings.
  - `font-sans` for body and interface text.
- Keep motion subtle (`transition-*`, short entrance animation).
- Keep spacing generous and layout responsive (`container`, `mx-auto`, breakpoint prefixes).

## Accessibility and UX Baseline

- Use semantic HTML sections (`nav`, `main`, `footer`, headings in order).
- Provide `alt` text for images.
- Add `aria-label` where icon-only controls are used.
- Preserve keyboard-friendly interactive elements and visible hover/focus states.

## Current Tooling Notes

- There is no committed custom ESLint/Prettier config yet.
- `npm run lint` currently triggers Next.js ESLint setup prompt.
- Until lint config is committed, treat this document as the style source of truth.

## Practical Do/Do Not

- Do keep new code aligned with existing class naming density and structure.
- Do reuse `SiteLayout`, `SectionTitle`, and `ArticleCard` patterns before introducing new primitives.
- Do keep CMS/data fetching behind `lib/cms.js`.
- Do not introduce TypeScript-only patterns unless the project is migrated.
- Do not mix incompatible style patterns (for example, CSS Modules plus heavy inline style objects) unless explicitly needed.
