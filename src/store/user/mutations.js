import { USER } from './mutation-types'
import { getStore } from '@/utils'

const navName = 'navlist'

export default {
  [USER.GET_NAV_DATA](state, nav) {
    const navlist = getStore(navName, true)
    if (state.navData.length === 0) {
      if (navlist != null) {
        state.navData = navlist
      }

      if (nav !== null) {
        state.navData = nav
      }
    }
  },
  [USER.SELECT_TYPE](state, type) {
    state.selectType = type
  },
  [USER.GET_USERINFO](state, info) {
    const len = Object.keys(state.userInfo)
    if (len > 0 && state.userInfo.username !== info.username) {
      return
    }
    state.userInfo = {}
    if (!info.message) {
      state.userInfo = { ...info }
    }
  },
  [USER.REMOVE_USERINFO](state) {
    state.userInfo = {}
  },
  [USER.UPDATE_SEARCH_TITLE](state, title) {
    state.searchTitle = title
  }
}
