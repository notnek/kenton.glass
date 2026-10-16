export default defineEventHandler(async (event) => {
  const feed = await buildArticlesFeed(event);

  setHeader(event, 'Content-Type', 'application/rss+xml; charset=utf-8');

  return feed.rss2();
});
