import Vue from 'vue'
import Main from './message.vue'

const defaults = {
  show: false,
  content: '',
  duration: 3000,
  type: '',
  callback: null,
  topClass: ''
}

const messageVueConstructor = Vue.extend(Main)

messageVueConstructor.prototype.close = function() {
  this.afterLeave = () => {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
    typeof this.callback === 'function' && this.callback()
  }
  this.show = false
}

const removeMessageVue = () => {
  const messages = document.querySelectorAll('mx-message')
  for (const item of messages) {
    item.remove()
  }
}

const message = (options = {}) => {
  if (Vue.prototype.$isServer) {
    return
  }

  if (options.close) {
    removeMessageVue()
    return
  }

  options = Object.assign({}, defaults, options)
  const parent = document.body
  // eslint-disable-next-line new-cap
  const instance = new messageVueConstructor({
    el: document.createElement('div'),
    data: options
  })

  parent.appendChild(instance.$el)
  Vue.nextTick(() => {
    instance.show = true
    setTimeout(() => {
      instance.close()
    }, options.duration)
  })

  return instance
}

export default message
