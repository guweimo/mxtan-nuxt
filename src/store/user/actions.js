import { USER } from './mutation-types'
import { getUser } from '@/apis/user'

import { getMenus } from '@/apis/article'

export default {
  async getUserInfo({ commit, state }) {
    const token = state.token
    const { data } = await getUser(token)
    commit(USER.GET_USERINFO, data.data)
  },

  getUserMessage({ commit, state }) {
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

  async getMenu({ commit, state }) {
    const { data } = await getMenus()
    commit(USER.GET_NAV_DATA, data.data)
  }
}
