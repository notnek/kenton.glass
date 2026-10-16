<template>
  <div class="max-w-2xl mx-auto">
    <LoadingIndicator />
    <LazySiteHeader hydrate-on-idle />
    <slot />
  </div>
</template>
