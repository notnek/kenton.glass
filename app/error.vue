<template>
  <NuxtLayout>
    <main>
      <h1 v-if="is404">
        404<span>, page not found</span>
      </h1>
      <h1 v-else>
        Sorry<span>, an error occurred</span>
      </h1>
      <NuxtLink to="/">
        Go to the homepage.
      </NuxtLink>
    </main>
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{ error: NuxtError }>();

const is404 = computed(() => props.error.statusCode === 404);
const title = computed(() =>
  is404.value ? '404, page not found | Kenton Glass' : 'Error | Kenton Glass',
);

useSeoMeta({
  title,
  titleTemplate: null,
  description: '',
  ogTitle: title,
  ogDescription: '',
  twitterTitle: title,
  twitterDescription: '',
});
</script>
