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

export const actions = {
  login({ dispatch }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(user => {
        alert('ログインが完了しました')
        dispatch('checkLogin')
      }).catch((error) => {
        alert(error)
      })
  },
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        commit('getData', { id: user.id, email: user.email, name: user.name, name: user.password })
      }
    })
  },
}

export const mutations = {
  getData(state, user) {
    state.user = user
  },
}