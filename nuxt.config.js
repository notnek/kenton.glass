import marked from 'marked';

const siteTitle = 'Kenton Glass';
const siteDescription =
  'Kenton Glass is a full-stack developer in Louisville, KY';

export default {
  target: 'static',
  features: {
    store: false,
    layouts: true,
    meta: true,
    middleware: false,
    transitions: false,
    deprecations: false,
    validate: false,
    asyncData: true,
    fetch: false,
    clientOnline: false,
    clientPrefetch: true,
    clientUseUrl: true,
    componentAliases: true,
    componentClientOnly: true,
  },
  components: true,
  loading: '~/components/LoadingIndicator.vue',
  generate: {
    fallback: true,
  },
  head: {
    htmlAttrs: {
      lang: 'en',
    },
    title: siteTitle,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: siteDescription,
      },
      { hid: 'og:title', property: 'og:title', content: siteTitle },
      {
        hid: 'og:description',
        property: 'og:description',
        content: siteDescription,
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: siteTitle,
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: siteDescription,
      },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'mask-icon', href: '/pinned-tab.svg', color: '#2B6CB0' },
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
  plugins: ['@/plugins/filters.js'],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/tailwindcss',
  ],
  modules: ['@nuxt/content', '@nuxtjs/feed'],
  content: {
    markdown: {
      prism: {
        theme: false,
      },
    },
  },
  feed() {
    const { $content } = require('@nuxt/content');
    const createFeedArticles = async (feed) => {
      feed.options = {
        title: 'Kenton Glass',
        description:
          'Ramblings about life, sports and programming from Kenton Glass.',
        link: 'https://kenton.glass',
      };

      const articles = await $content('articles', { text: true })
        .sortBy('createdAt', 'desc')
        .fetch();

      articles.forEach((article) => {
        const url = `${feed.options.link}${article.path}`;
        let summary = article.text;

        if (summary.length > 180) {
          summary = summary.substring(0, 180);
          summary = `${summary.substring(0, summary.lastIndexOf(' '))}…`;
        }

        feed.addItem({
          title: article.title,
          id: url,
          link: url,
          date: new Date(article.createdAt),
          description: marked(summary),
          content: marked(article.text),
          author: 'Kenton Glass',
        });
      });
    };

    const feedFormats = {
      rss: { type: 'rss2', file: 'rss.xml' },
      json: { type: 'json1', file: 'feed.json' },
    };

    return Object.values(feedFormats).map(({ file, type }) => ({
      path: `/articles/${file}`,
      type,
      create: createFeedArticles,
    }));
  },
  build: {
    postcss: {
      plugins: {
        'postcss-nested': {},
        'postcss-import': {},
      },
    },
  },
};
