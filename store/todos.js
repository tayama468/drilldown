export const state = () => ({
  list: []
})
  
export const mutations = {
  add(state, data) {
    const list = Array.isArray(data) ? data : [{
      text: data,
      done: false
    }]
    list.forEach(data => {
      state.list.push(data)
    })
  },
  remove(state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle(state, todo) {
    todo.done = !todo.done
  }
}

export const actions = {
   async fetch({ commit }) {
    const path = `/todos`
    const { todos } = await this.$axios.$get(path)
    commit('add', todos)
  }
}