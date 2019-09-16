<template>
  <main>
    <article-list
      :article-data="list"
      not-data-text="未找到搜索内容"
    ></article-list>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import articleList from '@/components/articleList'
import { searchArticle } from '@/apis/article'

export default {
  components: {
    articleList
  },
  data() {
    return {
      list: {}
    }
  },
  computed: {
    ...mapState('user', ['searchTitle'])
  },
  watch: {
    searchTitle(newVal) {
      this.search(newVal)
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search(title) {
      const data = title || this.$route.params.title
      searchArticle(data).then((res) => {
        const resData = res.data
        if (resData.status === 2000) {
          this.list = resData.data
        }
      })
    }
  }
}
</script>
