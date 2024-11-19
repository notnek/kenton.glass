<template>
  <header
    class="items-center mb-16 space-y-2 md:flex md:space-y-0"
    :class="containerClasses"
  >
    <div>
      <nuxt-link
        class="text-gray-900 dark:text-gray-100 hover:no-underline"
        to="/"
      >
        <nuxt-picture
          alt="Go to home page"
          src="/images/kenton-glass.png"
          class="block text-sm text-gray-700 dark:text-gray-400"
          :class="imageClasses"
          width="160"
          height="160"
        />
      </nuxt-link>
    </div>
    <div>
      <component :is="component" :class="nameClasses">
        <nuxt-link
          class="text-gray-900 dark:text-gray-100 hover:no-underline"
          to="/"
        >
          Kenton Glass<span class="font-normal">, full-stack developer</span>
        </nuxt-link>
      </component>

      <nav>
        <ul class="flex space-x-4">
          <li>
            <nuxt-link to="/" exact-active-class="underline">
              Home
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/articles" active-class="underline">
              Articles
            </nuxt-link>
          </li>
          <li><a href="https://bsky.app/profile/kenton.glass">Bluesky</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    component() {
      return this.useH1 ? 'h1' : 'div';
    },
    containerClasses() {
      return this.useH1 ? 'md:space-x-5' : 'md:space-x-3';
    },
    imageClasses() {
      return this.useH1 ? 'w-20 h-20' : 'w-16 h-16';
    },
    nameClasses() {
      if (this.useH1) {
        return 'mb-0';
      }

      return 'text-lg leading-tight mb-0 md:text-xl font-bold';
    },
    useH1() {
      return ['/', '/about'].includes(this.$route.path);
    },
  },
};
</script>

<style lang="postcss" scoped>
picture >>> img {
  @apply rounded-md;
}
</style>
