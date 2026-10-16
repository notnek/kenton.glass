# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal site and blog for Kenton Glass, built with Nuxt 4 (statically generated), `@nuxt/content` v3, `@nuxt/image`, and Tailwind CSS v4. Uses Yarn 1 (`yarn.lock`). Requires Node `^22.22.3 || >=24.15.0` (Nuxt's own engine range); `.nvmrc` pins 24.

## Commands

```bash
yarn install    # also runs `nuxt prepare` (generates .nuxt/ types and ESLint config)
yarn dev        # dev server at localhost:3000
yarn generate   # static build to .output/public (dist/ is a symlink to it)
yarn lint       # eslint (flat config from @nuxt/eslint)
yarn typecheck  # vue-tsc via nuxt typecheck
```

There is no test suite. TypeScript is pinned to v6 because typescript-eslint and vue-tsc don't support TS 7 yet.

## Architecture

Nuxt 4 layout: app code is in `app/`, Nitro server code in `server/`, Markdown/YAML in `content/`, static files in `public/`.

- **Content collections** are defined in `content.config.ts`:
  - `articles`: `content/articles/*.md` with `title` and `createdAt` (string `YYYY/MM/DD`, which sorts correctly as text) frontmatter, plus an optional `description`. The filename is the slug (`/articles/<filename>`). If `description` is missing, Content v3 fills it in from the first paragraph.
  - `stats`: `content/stats.yaml`, the homepage's projects and "Elsewhere" links. Edit this file, not `app/pages/index.vue`, to change those lists.
  - **Drafts** go in `content/articles/_drafts/`. The source glob is non-recursive, so drafts never reach pages or feeds.
- **Querying**: pages use `queryCollection(...)` inside `useAsyncData`. Server code must import `queryCollection` from `@nuxt/content/server` and pass the `event`.
- **Feeds**: `server/routes/articles/rss.xml.ts` and `feed.json.ts` build feeds with the `feed` package (shared logic in `server/utils/feed.ts`). They render each article's `rawbody` with `marked` and are prerendered via `nitro.prerender.routes` in `nuxt.config.ts`.
- **Code blocks**: Shiki highlighting with `github-light`/`github-dark` themes. `app/components/content/ProsePre.vue` overrides Content's default so that ```` ```lang[filename] ```` fences display the filename.
- **Dates**: format them with `formatFullDate` / `formatYear` from `app/utils/date.ts` (auto-imported).
- **Head/SEO**: global defaults and the `<body>` classes are in `app.head` in `nuxt.config.ts`; pages override with `useSeoMeta`. Body classes live in the config rather than `app.vue` because `error.vue` replaces `app.vue` entirely. For that reason `main.css` has an `@source` pointing at `nuxt.config.ts`, so Tailwind generates those classes.
- **Styling**: `app/assets/css/main.css`. Dark mode is Tailwind v4's default `dark:` variant (`prefers-color-scheme`). Custom element and prose styles must stay inside `@layer base`/`@layer components`; unlayered CSS would override utility classes in v4.
- `app/error.vue` wraps itself in `<NuxtLayout>` so error pages keep the site header. The header is lazily hydrated (`<LazySiteHeader hydrate-on-idle />`).

## Deployment

Netlify builds and hosts the site. Build settings are in the Netlify UI, since there's no `netlify.toml`. On Netlify, Nitro auto-selects the `netlify-static` preset, so `yarn generate` outputs to `dist/` (not `.output/public`): publish directory must be `dist`. The preset also writes cache headers for `/_nuxt/*` into `_headers`, and `@nuxt/image` uses Netlify Image CDN (`/.netlify/images`) instead of prerendered `_ipx` files. `public/_redirects` (e.g. `/uses` → the latest setup article) is copied into the output.

## Code style

The ESLint stylistic config (in `nuxt.config.ts` → `eslint.config`) requires semicolons, single quotes, and always-multiline trailing commas. `eslint.config.mjs` adds `space-before-function-paren` (no space for named functions, a space for anonymous functions and async arrows). `yarn lint --fix` resolves most formatting issues.
