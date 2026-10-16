import tailwindcss from '@tailwindcss/vite';

const siteTitle = 'Kenton Glass';
const siteDescription
  = 'Kenton Glass is a full-stack developer in Louisville, KY';

export default defineNuxtConfig({
  modules: ['@nuxt/content', '@nuxt/image', '@nuxt/eslint'],
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      // Set here rather than in app.vue so error.vue (which replaces app.vue) gets it too.
      bodyAttrs: {
        class:
          'px-4 pt-6 pb-24 md:pt-24 bg-white text-gray-900 font-sans dark:bg-gray-900 dark:text-gray-100 text-xl leading-relaxed',
      },
      title: siteTitle,
      meta: [
        { name: 'description', content: siteDescription },
        { property: 'og:title', content: siteTitle },
        { property: 'og:description', content: siteDescription },
        { name: 'twitter:title', content: siteTitle },
        { name: 'twitter:description', content: siteDescription },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/icon.png' },
        { rel: 'apple-touch-icon', href: '/icon.png' },
        {
          rel: 'alternate',
          href: 'https://kenton.glass/articles/rss.xml',
          type: 'application/rss+xml',
        },
        {
          rel: 'alternate',
          href: 'https://kenton.glass/articles/feed.json',
          type: 'application/json',
        },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark',
          },
          langs: ['js', 'html', 'bash', 'php', 'json', 'css'],
        },
      },
    },
  },
  compatibilityDate: '2026-10-16',
  nitro: {
    prerender: {
      routes: ['/articles/rss.xml', '/articles/feed.json'],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  eslint: {
    config: {
      stylistic: {
        semi: true,
        quotes: 'single',
        commaDangle: 'always-multiline',
      },
    },
  },
});
