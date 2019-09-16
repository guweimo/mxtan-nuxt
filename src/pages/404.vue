<template>
  <div class="not-found" :style="styleObj">404 - not found</div>
</template>

<script>
let resizeFn = null

export default {
  layout: 'main',
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
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  color: red;
  font-weight: bold;
  font-size: 24px;
}
</style>
