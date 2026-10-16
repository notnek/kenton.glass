import type { H3Event } from 'h3';
import { Feed } from 'feed';
import { marked } from 'marked';
import { queryCollection } from '@nuxt/content/server';

const siteUrl = 'https://kenton.glass';

function stripFrontmatter(markdown: string) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
}

export async function buildArticlesFeed(event: H3Event) {
  const feed = new Feed({
    title: 'Kenton Glass',
    description:
      'Ramblings about life, sports and programming from Kenton Glass.',
    id: siteUrl,
    link: siteUrl,
    copyright: 'Kenton Glass',
    feedLinks: {
      rss: `${siteUrl}/articles/rss.xml`,
      json: `${siteUrl}/articles/feed.json`,
    },
  });

  const articles = await queryCollection(event, 'articles')
    .order('createdAt', 'DESC')
    .all();

  for (const article of articles) {
    const url = `${siteUrl}${article.path}`;
    const text = stripFrontmatter(article.rawbody);
    let summary = text;

    if (summary.length > 180) {
      summary = summary.substring(0, 180);
      summary = `${summary.substring(0, summary.lastIndexOf(' '))}…`;
    }

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      date: new Date(article.createdAt),
      description: await marked(summary),
      content: await marked(text),
      author: [{ name: 'Kenton Glass' }],
    });
  }

  return feed;
}
