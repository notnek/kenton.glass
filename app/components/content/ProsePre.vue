<template>
  <div class="code-block">
    <span
      v-if="filename"
      class="filename"
    >{{ filename }}</span>
    <pre :class="$props.class"><slot /></pre>
  </div>
</template>

<script setup lang="ts">
// Overrides @nuxt/content's default so ```lang[filename] fences show the filename.
defineProps<{
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}>();
</script>
