<template>
  <button
    class="mx-button"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="[
      type ? 'mx-button--' + type : '',
      buttonSize ? 'mx-button--' + buttonSize : '',
      {
        'is-disabled': buttonSize,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    @click="handleClick"
  >
    <i v-if="loading" class="mx-icon-loading"></i>
    <i v-if="icon && !loading" :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: String,
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean
  },

  computed: {
    _mxFormItemSize() {
      return (this.mxFormItem || {}).mxFormItemSize
    },

    buttonSize() {
      return this.size || this._mxFormItemSize()
    },
    buttonDisabled() {
      return this.disabled || (this.mxForm || {}).disabled
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt)
    }
  }
}
</script>
