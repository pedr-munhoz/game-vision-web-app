// store/index.js
export const state = () => ({
  team: {},
  loggedIn: false,
})

export const mutations = {
  setTeam(state, team) {
    state.team = team
  },
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  },
}

export const actions = {
  updateTeam({ commit }, team) {
    commit('setTeam', team)
  },
  logIn({ commit }) {
    commit('setLoggedIn', true)
  },
  logOut({ commit }) {
    commit('setLoggedIn', false)
  },
}

export const getters = {
  team: (state) => {
    return state.team
  },
  isLoggedIn: (state) => {
    return state.loggedIn
  },
}
