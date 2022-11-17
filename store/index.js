import firebase from '~/plugins/firebase'
import axios from 'axios'

export const state = () => ({
  user: {
    id: '',
    name: '',
    firebaseid: '',
    email: '',
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
        this.$router.push('/')
        dispatch('checkLogin')
      }).catch((error) => {
        alert(error)
      })
  },
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged( async function (user) {
      if (user) {
        const sendData = {
          firebaseid: user.uid,
        };
        const resData = await axios.get("http://127.0.0.1:8000/api/user/", sendData)
        console.log(resData);
        commit('getData', { id: resData.data.user.id, name: resData.name, firebaseid: resData.firebaseid, email: resData.email })
      }
    })
  },
}

export const mutations = {
  getData(state, user) {
    state.user = user
  },
}