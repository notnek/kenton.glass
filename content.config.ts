import { defineCollection, defineContentConfig, z } from '@nuxt/content';

export default defineContentConfig({
  collections: {
    // Only top-level files, so anything in articles/_drafts/ stays unpublished.
    articles: defineCollection({
      type: 'page',
      source: 'articles/*.md',
      schema: z.object({
        // YYYY/MM/DD, which also sorts correctly as a string.
        createdAt: z.string(),
        rawbody: z.string(),
      }),
    }),
    stats: defineCollection({
      type: 'data',
      source: 'stats.yaml',
      schema: z.object({
        skills: z.array(z.string()),
        projects: z.array(z.object({ name: z.string(), url: z.string() })),
        externalLinks: z.array(z.object({ name: z.string(), url: z.string() })),
      }),
    }),
  },
});
