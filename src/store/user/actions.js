import { USER } from './mutation-types'
import { getUser } from '@/apis/user'
import { getStore } from '@/utils'

export default {
  getUserInfo({ commit, state }) {
    const len = Object.keys(state.userInfo)
    if (len.length > 0) {
      return true
    } else {
      let result = null
      const userinfo = getStore('userinfo', true)
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
  }
}
