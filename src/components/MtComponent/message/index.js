import Message from './src/index'

export default {
  install(Vue) {
    Vue.prototype.$message = Message
  }
}
