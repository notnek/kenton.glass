<template>
  <main>
    <h1>Articles</h1>
    <LazyArticleList :articles="articles ?? []" />
  </main>
</template>

<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles')
    .select('title', 'createdAt', 'path')
    .order('createdAt', 'DESC')
    .all(),
);

const title = 'Articles by Kenton Glass';
const description
  = 'Ramblings about life, sports and programming from Kenton Glass.';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
