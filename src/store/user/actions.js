import { USER } from './mutation-types'
import { getUser } from '@/apis/user'
import { setStore } from '@/utils'

import { getMenus } from '@/apis/article'

export default {
  getUserInfo({ commit, state }) {
    const len = Object.keys(state.userInfo)
    if (len.length > 0) {
      return true
    } else {
      let result = null
      // const userinfo = getStore('userinfo', true)
      const userinfo = null
      if (userinfo) {
        result = getUser(userinfo.id)
      }
      if (result) {
        result.then((res) => {
          if (res.data.status === 2000) {
            commit(USER.GET_USERINFO, res.data.data)
          }
        })
      }
    }
  },

  getMenu({ commit, state }) {
    getMenus().then((res) => {
      if (res.data.status === 2000) {
        setStore('navlist', res.data.data)
        state.navData = res.data.data
      }
    })
  }
}
