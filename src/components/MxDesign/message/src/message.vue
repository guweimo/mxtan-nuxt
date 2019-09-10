<template>
  <transition name="mx-message-fade" @after-leave="afterLeave">
    <div
      v-if="show"
      :class="['mx-message', topClass, type ? `mx-message-${type}` : '']"
    >
      <span class="mx-message-con">{{ content }}</span>
    </div>
  </transition>
</template>

<script>
const typeMap = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}
export default {
  data() {
    return {
      show: false,
      content: '',
      type: '',
      topClass: ''
    }
  },
  computed: {
    iconClass() {
      return this.type ? `mx-message-icon mx-icon-${typeMap[this.type]}` : ''
    }
  },
  methods: {
    // 绑定过渡效果结束
    afterLeave() {}
  }
}
</script>

<style lang="less" scoped>
.mx-message {
  position: fixed;
  left: 50%;
  top: 50px;
  border-radius: 4px;
  min-width: 300px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity 0.3s;
  overflow: hidden;
  padding: 15px;
  z-index: 2334;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.mx-message-top {
  top: 5px;
}
.mx-message-success {
  background-color: #83dc73;
  color: #fff;
}
.mx-message-error {
  background-color: #ff5000;
  color: #fff;
}
.mx-message-warning {
  background-color: #ccc;
}
.mx-message-icon {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.mx-message-con {
  display: inline-block;
}
@keyframes wrapper-gradient {
  0% {
    transform: translateY(-100%) translateX(-50%);
  }
  100% {
    transform: translateY(0) translateX(-50%);
  }
}
.mx-message-fade-enter-active {
  transition: all 0.3s linear;
  animation: wrapper-gradient 0.5s linear;
}
.mx-message-fade-leave-active {
  transition: all 0.3s linear;
}
.mx-message-fade-enter,
.mx-message-fade-leave-to {
  opacity: 0;
}
</style>
