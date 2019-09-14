<template>
  <div id="sign-in">
    <div class="form">
      <form @submit.prevent="loginUser">
        <h2>登录Mxtan</h2>
        <label for="login_name">用户名</label>
        <input
          id="login_name"
          v-model="formData.name"
          type="text"
          class="form-control input-block"
          @keyup="cancelError"
        />
        <label for="login_pass">密码</label>
        <input
          id="login_pass"
          v-model="formData.pass"
          type="password"
          class="form-control input-block"
          @keyup="cancelError"
        />
        <p class="error" ng-show="isError" v-text="errorText"></p>
        <mt-button class="mt-primary" type="submit">登录</mt-button>
      </form>
    </div>
  </div>
</template>

<script>
import { setStore } from '@/utils'
import MtButton from '@/components/MtComponent/MtButton'
import { login } from '@/apis/user'

// 登录
export default {
  layout: 'default',
  components: {
    MtButton
  },
  data() {
    return {
      isError: false,
      errorText: '',
      formData: {
        name: '',
        pass: ''
      }
    }
  },
  methods: {
    loginUser() {
      const tip = this.validation()
      if (tip) {
        return false
      }
      login(this.formData).then((res) => {
        if (res.data.status === 2001) {
          this.isError = true
          this.errorText = res.data.message
        } else if (res.data.status === 2000) {
          setStore('userinfo', res.data.data)
          // this.$router.go(-1)
          this.$router.replace('/home')
        }
      })
    },
    cancelError() {
      this.errorText = ''
      this.isError = false
    },
    validation() {
      let tips = false
      if (this.formData.name === '' || this.formData.pass === '') {
        this.isError = true
        this.errorText = '用户名或密码不能为空！'
        tips = true
      }
      return tips
    }
  }
}
</script>

<style lang="scss" scoped>
$color-default: #5c4fb4;
$color-green: #52bab3;

#sign-in {
  background: $color-green;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  width: 300px;
  min-height: 300px;
  border: 1px solid #d8dee2;
  background: #eee;
  border-radius: 1%;
  box-shadow: 5px 6px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  h2 {
    text-align: center;
    // color: $color-default;
    font-weight: 300;
    font-size: 24px;
    margin-bottom: 20px;
  }
  label {
    display: block;
    margin-bottom: 7px;
  }
  input:first-of-type {
    margin-top: 7px;
    margin-bottom: 15px;
  }
  button {
    width: 100%;
    // margin-top: 25px;
    margin-top: 0.285rem;
  }
  p {
    margin-top: 0.357rem;
  }
}
</style>
