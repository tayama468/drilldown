export const state = () => ({
  option2: null,
  option3: null
})

export const mutations = {
  SET(state, obj) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]]) {
        state[keys[i]] = obj[keys[i]]
        break
      }
    }
  }
}

export const actions = {
  async fetch({ commit }, params) {
    const path = `/drillDown`
    return this.$axios.$get(path, {params: params})
      .then(res => {
        const { drillDown } = res
        commit('SET', drillDown)
      })
  }
}
