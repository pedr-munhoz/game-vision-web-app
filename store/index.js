// store/index.js
export const state = () => ({
  secret: '',
})

export const mutations = {
  setSecret(state, secret) {
    state.secret = secret
  },
}

export const actions = {
  updateSecret({ commit }, secret) {
    commit('setSecret', secret)
  },
}

export const getters = {
  secret: (state) => {
    return state.secret
  },
}
