// store/index.js
export const state = () => ({
  team: {},
})

export const mutations = {
  setTeam(state, team) {
    state.team = team
  },
}

export const actions = {
  updateTeam({ commit }, team) {
    commit('setTeam', team)
  },
}

export const getters = {
  team: (state) => {
    return state.team
  },
}
