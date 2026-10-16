<template>
  <div
    v-if="isLoading"
    class="fixed w-6 h-6 border-2 border-gray-400 border-solid rounded-full dark:border-gray-600 top-6 right-6"
  />
</template>

<script setup lang="ts">
const { isLoading } = useLoadingIndicator();
</script>

<style scoped>
div {
  border-left: 0.25rem solid transparent;
  transform: translateZ(0);
  animation: spinning 1s infinite linear;
}

@keyframes spinning {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
