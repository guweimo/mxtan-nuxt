<template>
  <header id="header">
    <div class="container">
      <nav>
        <ul class="menu">
          <li id="logo">
            <nuxt-link to="/home">Mxtan</nuxt-link>
          </li>
          <li v-for="item in navList" :key="item.title">
            <nuxt-link
              :to="'/type/' + item.title.toLowerCase()"
              :class="{
                select: $route.params.type == item.title.toLowerCase()
              }"
              v-text="item.title"
            ></nuxt-link>
          </li>
          <li class="search">
            <input
              v-model="searchData.title"
              type="text"
              class="form-control"
              placeholder="请搜索博文"
              @keyup.13="searchTitle"
            />
          </li>
          <li>
            <mt-button v-if="userInfo.name" class="mt-primary" @click="gotoSave"
              >发布</mt-button
            >
          </li>
          <li>
            <div v-if="!userInfo.name" class="sign">
              <a href="/user/login" class="a-inline">登录</a>
              <a href="/user/register" class="a-inline">注册</a>
            </div>
            <div v-if="userInfo.name" class="user-info">
              <a class="user-info-link" @click="showDropdown">
                <img class="avatar" height="20" width="20" :src="getAvatar" />
                <span class="user-info-name">{{ userInfo.name }}</span>
                <span class="dropdown-caret"></span>
              </a>
              <div v-show="dropdown" class="dropdown-menu">
                <span></span>
                <ul>
                  <li @click="goRouter('people')">我的主页</li>
                  <li>设置</li>
                  <li @click="exit">退出</li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
import picture from '@/assets/picture.jpg'
import MtButton from '@/components/MtComponent/MtButton'

let dropdownEvent = null
export default {
  components: {
    MtButton
  },
  props: {
    navList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectType: '',
      searchData: {
        title: ''
      },
      dropdown: false,
      userInfo: {}
    }
  },
  computed: {
    getAvatar() {
      let avatar = picture
      if (this.userInfo.avatar) {
        avatar = this.userInfo.avatar
      }
      return avatar
    }
  },
  mounted() {
    this.setTitle()
    dropdownEvent = (event) => {
      const target = event.target
      const userInfoLink = document.querySelector('.user-info-link')
      let userInfoLinkChild = []
      if (userInfoLink) {
        userInfoLinkChild = userInfoLink.childNodes
      }
      let hasNode = false
      if (target === userInfoLink) {
        hasNode = true
      }
      for (const item of userInfoLinkChild) {
        if (item === target) {
          hasNode = true
          break
        }
      }
      if (this.dropdown && !hasNode) {
        this.dropdown = false
      }
    }
    window.addEventListener('click', dropdownEvent)
  },
  methods: {
    ...mapMutations('user', ['removeUserinfo', 'updateSearchTitle']),
    gotoSave() {
      this.$router.push('/save')
    },
    searchTitle() {
      if (this.searchData.title.trim()) {
        this.updateSearchTitle(this.searchData.title)
        // this.$router.push(`/search/${this.searchData.title}`)
        this.$router.push({
          path: '/search',
          query: { title: this.searchData.title }
        })
      }
    },
    setTitle() {
      if (this.$route.path.includes('/search/')) {
        this.searchData.title = this.$route.params.title
      }
    },
    showDropdown() {
      this.dropdown = !this.dropdown
    },
    exit() {
      this.removeUserinfo()
      this.$router.push('/login')
    },
    goRouter() {
      // this.$router.push('/p')
    }
  },
  beforeDestroyed() {
    if (dropdownEvent) {
      window.removeEventListener('click', dropdownEvent)
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  color: #fff;
  height: 45px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  box-shadow: 0 3px 3px -2px hsla(0, 0%, 0%, 0.13);
  z-index: 2333;
  .container {
    margin-top: 0;
  }
}
.menu {
  display: flex;
  align-items: center;
  li {
    margin: 0 10px;
    vertical-align: middle;
    position: relative;
    &:last-of-type {
      margin-left: auto;
    }
    & input {
      background: #eee;
      display: block;
    }
    &.search {
      margin-left: 20px;
    }
  }
  a {
    display: block;
    color: #ccc;
    padding: 0 10px;
    &:hover {
      color: #fff;
    }
    &.a-inline {
      display: inline-block;
    }
    &.select {
      color: #fff;
    }
  }
}
.user-info {
  position: relative;
  .dropdown-caret {
    display: inline-block;
    width: 0;
    height: 0;
    vertical-align: middle;
    content: '';
    border: 4px solid;
    border-right-color: transparent;
    border-bottom-color: transparent;
    border-left-color: transparent;
    margin-top: 5px;
  }
  .avatar {
    vertical-align: middle;
    margin-right: 3px;
    border-radius: 4px;
  }
  .dropdown-menu {
    cursor: default;
    position: absolute;
    top: 100%;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
    margin-top: 20px;
    & li {
      height: 36px;
      color: #888;
      text-align: left;
      padding: 0 20px;
      width: 100px;
      cursor: pointer;
      margin: 0;
      line-height: 36px;
      &:hover {
        color: #333;
        background-color: #c3c3c3;
      }
    }
  }
}
#logo {
  a {
    color: #69e4dc;
    font-weight: bold;
  }
}
</style>
