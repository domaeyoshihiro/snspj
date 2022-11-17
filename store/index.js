export const state = () => ({
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
  },
})

export const getters = {
  user: state => {
    return state.user
  }
}

export const mutations = {
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { id: user.id, name: user.name, email: user.email, password: user.password,  })
      }
    })
  },
}

export const actions = {
  getData(state, user) {
    state.user = user
  },
}