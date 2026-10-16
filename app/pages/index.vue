<template>
  <main>
    <template v-if="articles">
      <h2>Recent articles</h2>
      <ArticleList
        class="mt-2"
        :articles="articles"
      />
    </template>

    <template v-if="stats?.projects">
      <h2 class="mt-8">
        Featured projects
      </h2>
      <ul class="mt-2 space-y-3 list-disc list-inside">
        <li
          v-for="project in stats.projects"
          :key="project.url"
        >
          <a
            :href="project.url"
            rel="noopener"
            target="_blank"
            v-text="project.name"
          />
        </li>
      </ul>
    </template>

    <template v-if="stats?.externalLinks">
      <h2 class="mt-8">
        Elsewhere
      </h2>
      <ul class="mt-2 space-y-3 list-disc list-inside">
        <li
          v-for="link in stats.externalLinks"
          :key="link.url"
        >
          <a
            :href="link.url"
            rel="noopener"
            target="_blank"
            v-text="link.name"
          />
        </li>
      </ul>
    </template>
  </main>
</template>

<script setup lang="ts">
const { data: stats } = await useAsyncData('stats', () =>
  queryCollection('stats').first(),
);

const { data: articles } = await useAsyncData('recent-articles', () =>
  queryCollection('articles')
    .select('title', 'createdAt', 'path')
    .order('createdAt', 'DESC')
    .limit(5)
    .all(),
);

useHead({
  title: 'Kenton Glass, full-stack developer',
});
</script>
