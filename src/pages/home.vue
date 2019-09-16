<template>
  <main>
    <article-list :article-data="list"></article-list>
  </main>
</template>

<script>
import articleList from '@/components/ArticleList'
import { getList } from '@/apis/article'

export default {
  layout: 'main',
  components: {
    articleList
  },
  data() {},
  async asyncData() {
    const { data } = await getList()
    if (data.status === 2000) {
      return { list: data.data }
    } else {
      return { list: [] }
    }
  }
}
</script>
