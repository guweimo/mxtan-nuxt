<template>
  <div class="aritcle-detail">
    <div class="title">
      <h1 v-text="detailData.title"></h1>
    </div>
    <div class="info">
      <div class="info-submitted">
        作者：
        <span v-text="detailData.author"></span>
        日期：
        <span v-text="detailData.dateTime"></span>
      </div>
      <div class="info-tags"></div>
    </div>
    <div class="content">
      <div class="markdown-body" v-html="detailData.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.aritcle-detail .title {
  text-align: center;
}

.aritcle-detail .title h1 {
  color: #29b4f0;
}

.aritcle-detail .content {
  margin: 20px 0;
}

.aritcle-detail .info {
  color: #ccc;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 5px;
  font-size: 0.929rem;
  display: flex;
}

.markdown-body >>> ul {
  list-style-type: disc;
}

.markdown-body >>> ol {
  list-style-type: decimal;
}
</style>
