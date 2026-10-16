<template>
  <ul
    v-if="articles.length > 0"
    class="space-y-3 list-disc list-inside"
  >
    <li
      v-for="article in articles"
      :key="article.path"
    >
      <NuxtLink :to="article.path">
        {{ article.title }}
      </NuxtLink>
      {{ ' ' }}
      <span class="text-base text-gray-800 dark:text-gray-400">
        {{ formatFullDate(article.createdAt) }}
      </span>
    </li>
  </ul>
  <p v-else>
    No articles yet.
  </p>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  articles?: { path: string; title: string; createdAt: string }[];
}>(), {
  articles: () => [],
});
</script>
