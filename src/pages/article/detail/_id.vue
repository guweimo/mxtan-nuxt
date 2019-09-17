<template>
  <div class="container">
    <div v-if="Object.keys(detailData).length != 0" class="detail">
      <article-detail :detail-data="detailData"></article-detail>
    </div>
  </div>
</template>

<script>
import articleDetail from '@/components/articleDetail'
import { getArticleDetail } from '@/apis/article'

export default {
  layout: 'main',
  validate({ params }) {
    return !isNaN(+params.id)
  },
  components: {
    articleDetail
  },
  data() {
    return {}
  },
  async asyncData({ params, error }) {
    const { data } = await getArticleDetail(params.id)
    if (data.status !== 2000) {
      return error({ message: 'User not found', statusCode: 404 })
    }
    return { detailData: data.data }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
