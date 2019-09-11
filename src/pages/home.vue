<template>
  <main>
    <article-list :article-data="list"></article-list>
  </main>
</template>

<script>
import articleList from '@/components/ArticleList'

export default {
  components: {
    articleList
  }
}
</script>
