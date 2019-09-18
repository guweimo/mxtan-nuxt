<template>
  <main>
    <article-list :article-data="list"></article-list>
  </main>
</template>

<script>
import ArticleList from '@/components/ArticleComponent/ArticleList'
import { getList } from '@/apis/article'

export default {
  layout: 'main',
  components: {
    ArticleList
  },
  async asyncData({ params, store, error }) {
    const navData = store.state.user.navData
    let id = 0
    for (const item of navData) {
      if (item.title.toLowerCase() === params.type) {
        id = item.id
        break
      }
    }
    if (id === 0) {
      return error({ message: '不存在该分类列表', statusCode: 404 })
    }
    const { data } = await getList(id)
    return { list: data.data }
  }
}
</script>
