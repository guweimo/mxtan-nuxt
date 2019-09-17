<template>
  <div class="main-page">
    <mx-header :nav-list="navData"></mx-header>
    <nuxt class="main-layout" />
    <mx-footer></mx-footer>
  </div>
</template>

<script>
import MxHeader from '@/components/MxHeader'
import MxFooter from '@/components/MxFooter'

export default {
  components: {
    MxFooter,
    MxHeader
  },
  data() {
    return {}
  },
  computed: {
    navData() {
      return this.$store.state.user.navData
    }
  }
}
</script>

<style lang="scss" scoped>
.main-layout {
  margin-top: 65px;
}
</style>
