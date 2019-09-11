<template>
  <div class="main-page">
    <mx-header :nav-list="navData"></mx-header>
    <router-view />
    <mx-footer></mx-footer>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
    ...mapState('user', ['navData'])
  },
  created() {
    this.getUserInfo()
  },
  mounted() {
    this.getNavData()
  },
  methods: {
    ...mapMutations('user', ['getNavData']),
    ...mapActions('user', ['getUserInfo'])
  }
}
</script>
