import { USER } from './mutation-types'
import { getStore, setStore } from '@/utils/unit'
import { getMenus } from '@/apis/article'

const navName = 'navlist'

export const mutations = {
  [USER.GET_NAV_DATA](state) {
    const navlist = getStore(navName, true)
    if (state.navData.length === 0) {
      if (navlist != null) {
        state.navData = navlist
      }
      getMenus().then((res) => {
        if (res.data.status === 2000) {
          setStore(navName, res.data.data)
          state.navData = res.data.data
        }
      })
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
