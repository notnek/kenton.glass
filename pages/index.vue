<template>
  <main>
    <template v-if="articles">
      <h2>Recent articles</h2>
      <article-list class="mt-2" :articles="articles" />
    </template>

    <template v-if="projects">
      <h2 class="mt-8">
        Featured projects
      </h2>
      <ul class="mt-2 space-y-3 list-disc list-inside">
        <li v-for="project in projects" :key="project.url">
          <a
            :href="project.url"
            rel="noopener"
            target="_blank"
            v-text="project.name"
          />
        </li>
      </ul>
    </template>

    <template v-if="externalLinks">
      <h2 class="mt-8">
        Elsewhere
      </h2>
      <ul class="mt-2 space-y-3 list-disc list-inside">
        <li v-for="link in externalLinks" :key="link.url">
          <a :href="link.url" rel="noopener" target="_blank" v-text="link.name" />
        </li>
      </ul>
    </template>
  </main>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const { skills, projects, externalLinks } = await $content('stats').fetch();
    const articles = await $content('articles')
      .only(['title', 'createdAt', 'path'])
      .sortBy('createdAt', 'desc')
      .limit(5)
      .fetch();

    return {
      skills: skills.join(', '),
      projects,
      externalLinks,
      articles,
    };
  },
  head: {
    title: 'Kenton Glass, full-stack developer',
  },
};
</script>
