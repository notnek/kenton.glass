<template>
  <header
    class="items-center mb-16 space-y-2 md:flex md:space-y-0"
    :class="useH1 ? 'md:space-x-5' : 'md:space-x-3'"
  >
    <div>
      <NuxtLink
        class="text-gray-900 dark:text-gray-100 hover:no-underline"
        to="/"
      >
        <NuxtPicture
          alt="Go to home page"
          src="/images/kenton-glass.png"
          class="block text-sm text-gray-700 dark:text-gray-400"
          :class="useH1 ? 'w-20 h-20' : 'w-16 h-16'"
          :img-attrs="{ class: 'rounded-md' }"
          sizes="80px"
          densities="x1 x2"
          width="160"
          height="160"
        />
      </NuxtLink>
    </div>
    <div>
      <component
        :is="useH1 ? 'h1' : 'div'"
        :class="useH1 ? 'mb-0' : 'text-lg leading-tight mb-0 md:text-xl font-bold'"
      >
        <NuxtLink
          class="text-gray-900 dark:text-gray-100 hover:no-underline"
          to="/"
        >
          Kenton Glass<span class="font-normal">, full-stack developer</span>
        </NuxtLink>
      </component>

      <nav>
        <ul class="flex space-x-4">
          <li>
            <NuxtLink
              to="/"
              exact-active-class="underline"
            >
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/articles"
              active-class="underline"
            >
              Articles
            </NuxtLink>
          </li>
          <li><a href="https://bsky.app/profile/kenton.glass">Bluesky</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute();
const useH1 = computed(() => ['/', '/about'].includes(route.path));
</script>
