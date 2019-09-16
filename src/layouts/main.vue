<template>
  <div class="main-page">
    <mx-header :nav-list="navData"></mx-header>
    <nuxt />
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
  },
  mounted() {
    const body = document.querySelector('body')
    body.classList.add('body-pt45')
  },
  beforeDestroy() {
    const body = document.querySelector('body')
    body.classList.remove('body-pt45')
  }
}
</script>
