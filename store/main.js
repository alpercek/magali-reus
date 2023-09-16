export const state = () => ({
  // Add the keys of single types if you wanna get them
  about: null,
  home: null,
  work: null,
  works: [],
  sub: [],
  collapsed: false,
  previewing: null
})

export const actions = {
  SET_PREVIEWING ({ commit }, value) {
    console.log(value)
    commit('SET_PREVIEWING', value)
  },
  SET_SUB ({ commit }, value) {
    commit('SET_SUB', value)
  },
  SET_COLLAPSED ({ commit }, value) {
    commit('SET_COLLAPSED', value)
  },
  async GET_SINGLE ({ commit }, type) {
    commit('SET_SINGLE', {
      type,
      data: await this.$prismic.api.getSingle(type)
    })
  },
  async GET_SINGLE_REPEATABLE ({ commit }, data) {
    commit('SET_SINGLE', {
      type: data.type,
      data: await this.$prismic.api.getByUID(data.uid)
    })
  },
  async GET_REPEATABLE ({ commit }, type) {
    commit('SET_REPEATABLE', {
      type,
      data: await this.$prismic.api.query(
        this.$prismic.predicates.at('document.type', type)
      )
    })
  }
}

export const mutations = {
  SET_PREVIEWING (state, data) {
    state.previewing = data
  },
  SET_SUB (state, data) {
    state.sub = data
  },
  SET_COLLAPSED (state, data) {
    state.collapsed = data
  },
  SET_SINGLE (state, data) {
    state[data.type] = data.data
  },
  SET_REPEATABLE (state, data) {
    state[`${data.type}s`] = data.data
  }
}
