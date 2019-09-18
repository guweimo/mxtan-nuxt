<template>
  <main>
    <article-list
      :article-data="list"
      not-data-text="未找到搜索内容"
    ></article-list>
  </main>
</template>

<script>
import ArticleList from '@/components/ArticleComponent/ArticleList'
import { searchArticle } from '@/apis/article'

export default {
  layout: 'main',
  watchQuery: ['title'],
  components: {
    ArticleList
  },
  async asyncData({ query }) {
    const { data } = await searchArticle(query.title)
    return { list: data.data }
  }
}
</script>
