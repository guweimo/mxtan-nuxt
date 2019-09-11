<template>
  <div class="container">
    <div class="col-main">
      <div
        v-if="articleData.result && articleData.result.length > 0"
        class="main-wrap"
      >
        <div
          v-for="item in articleData.result"
          :key="item.id"
          class="page-content"
        >
          <div class="article">
            <h1>
              <router-link
                :to="{ name: 'article', params: { id: item.id } }"
                v-text="item.title"
              ></router-link>
            </h1>
            <div class="article-header">
              <div class>
                作者：
                <span v-text="item.author"></span>
                日期：
                <span v-text="item.date"></span>
              </div>
            </div>
            <div class="body-content">
              <div class="markdown-body" v-html="item.description"></div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="articleData.result && articleData.result.length == 0"
        class="main-not-content"
        :style="styleObj"
      >
        <div v-text="notDataText"></div>
      </div>
    </div>
  </div>
</template>

<script>
let resizeFn = null

export default {
  props: {
    articleData: {
      type: Object,
      default: () => {}
    },
    notDataText: {
      type: String,
      default: '暂无内容'
    }
  },
  data() {
    return {
      styleObj: {
        height: ''
      }
    }
  },
  mounted() {
    this.obtainWinHeight()
    resizeFn = () => {
      this.obtainWinHeight()
    }
    window.addEventListener('resize', resizeFn)
  },
  destroyed() {
    window.removeEventListener('resize', resizeFn)
  },
  methods: {
    obtainWinHeight() {
      const wH = window.innerHeight
      this.styleObj.height = `${wH - 85}px`
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content {
  background: #fff;
  padding: 20px;
  margin: 0 0 20px;
  border: 1px solid #ddd;
  position: relative;
  transition: box-shadow 0.3s ease;
  &:hover {
    box-shadow: 2px 2px 8px hsla(0, 0%, 0%, 0.13);
  }
}
.article {
  h1 {
    margin: 0 0 15px;
    a {
      display: block;
      font-size: 24px;
      transition: color 0.3s ease;
    }
  }
  p {
    font-size: 16px;
    line-height: 30px;
    margin-bottom: 25px;
  }
}
.article-header {
  margin-bottom: 10px;
  font-size: 14px;
  color: #ccc;
  padding-bottom: 5px;
  border-bottom: 1px dashed #ddd;
}

.main-not-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 12px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  font-weight: bold;
  color: rgb(216, 38, 106);
}
</style>

<style scoped>
.markdown-body >>> ul {
  list-style-type: disc;
}

.markdown-body >>> ol {
  list-style-type: decimal;
}
</style>
