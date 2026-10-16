# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site and blog for Kenton Glass, built with Nuxt 2 (`target: 'static'`), `@nuxt/content` v1, and Tailwind CSS v1/v2-era config. Uses Yarn (`yarn.lock`).

## Commands

```bash
yarn install
yarn dev        # dev server with hot reload at localhost:3000
yarn generate   # static build to dist/
yarn lint:js    # eslint over .js/.vue
yarn test       # jest (test/ currently has no tests)
npx jest path/to/file.spec.js   # run a single test file
```

`yarn lint:style` / `yarn lint` reference stylelint, but stylelint is not installed or configured, so use `yarn lint:js` directly. ESLint also runs during dev/build via `@nuxtjs/eslint-module`.

## Architecture

- **Content is the data layer.** Articles are Markdown files in `content/articles/` with `title` and `createdAt` (format `YYYY/MM/DD`) frontmatter; optional `description` is used for meta tags. The filename is the slug (`/articles/<filename>`). Pages fetch them via `$content('articles')` in `asyncData`, sorted by `createdAt` desc.
- **Drafts** go in `content/articles/_drafts/`. `$content('articles')` is not called with `deep: true`, so subdirectories are excluded from listings, the article route, and feeds.
- **Homepage data** (skills, featured projects, "Elsewhere" links) lives in `content/stats.yaml`, loaded with `$content('stats')`. Edit that file rather than `pages/index.vue` to change those lists.
- **Feeds**: RSS (`/articles/rss.xml`) and JSON Feed (`/articles/feed.json`) are generated in `nuxt.config.js` via `@nuxtjs/feed`, rendering article text with `marked` and truncating summaries to ~180 chars.
- **Date formatting** is done with global Vue filters `formatFullDate` and `formatYear` (`plugins/filters.js`, date-fns).
- **Per-page SEO**: each page's `head()` overrides `description`, `og:*`, and `twitter:*` meta using the same `hid` values as the defaults in `nuxt.config.js`; keep `hid`s consistent so tags replace rather than duplicate.
- **Styling**: Tailwind utilities in templates plus custom styles (including article prose) in `assets/css/tailwind.css`. Dark mode is a custom `dark` screen using `prefers-color-scheme` (`dark:` prefix in classes, `@screen dark` in CSS), not Tailwind's built-in dark mode. Purge is enabled only in production, scanning components/layouts/pages/plugins.
- Components in `components/` are auto-registered (`components: true`); `Lazy` prefix gives lazy loading.

## Deployment

The site is deployed on Netlify (build settings live in the Netlify UI; there is no `netlify.toml`). `static/_headers` (long-lived cache headers for `/_nuxt/*`) and `static/_redirects` (e.g. `/uses` → the latest setup article) are Netlify config files copied into `dist/` at generate time.

## Code style

ESLint extends `@nuxtjs` + `plugin:nuxt/recommended`, with required semicolons, always-multiline trailing commas, and no space before named function parens (`function foo()`), but a space for anonymous/async arrow ones.
