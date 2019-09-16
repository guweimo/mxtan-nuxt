export const state = () => ({
  count: 1
})

export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, res }) {
    await Promise.all([dispatch('user/getMenu')])
  }
}
