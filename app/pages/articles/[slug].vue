<template>
  <main v-if="article">
    <header class="flex flex-col-reverse">
      <h1 class="font-bold text-gray-900 dark:text-gray-100 hover:no-underline">
        {{ article.title }}
      </h1>
      <div class="text-base font-normal text-gray-700 dark:text-gray-400">
        {{ formatFullDate(article.createdAt) }}
      </div>
    </header>

    <ContentRenderer
      class="nuxt-content"
      :value="article"
    />

    <footer class="flex justify-between mt-12 text-base">
      <NuxtLink
        class="block"
        to="/articles"
      >
        &larr; All Articles
      </NuxtLink>
      <NuxtLink
        class="block text-gray-700 dark:text-gray-400"
        to="/"
      >
        Kenton Glass &copy; {{ formatYear(article.createdAt) }}
      </NuxtLink>
    </footer>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: article } = await useAsyncData(route.path, () =>
  queryCollection('articles').path(route.path).first(),
);

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
}

const title = `${article.value.title} by Kenton Glass`;
const description = article.value.description || '';

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterTitle: title,
  twitterDescription: description,
});
</script>
