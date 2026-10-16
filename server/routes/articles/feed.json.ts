export default defineEventHandler(async (event) => {
  const feed = await buildArticlesFeed(event);

  setHeader(event, 'Content-Type', 'application/feed+json; charset=utf-8');

  return feed.json1();
});
