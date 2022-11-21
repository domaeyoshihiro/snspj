import firebase from '~/plugins/firebase';
import axios from 'axios';

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
        switch (error.code) {
          case 'auth/invalid-email':
            alert('メールアドレスの形式が違います。')
            break
          case 'auth/user-disabled':
            alert('ユーザーが無効になっています。')
            break
          case 'auth/user-not-found':
            alert('ユーザーが存在しません。')
            break
          case 'auth/wrong-password':
            alert('パスワードが間違っております。')
            break
          default:
            alert('エラーが起きました。しばらくしてから再度お試しください。')
            break
        }
      })
  },
  checkLogin({ commit }) {
    firebase.auth().onAuthStateChanged( async function (user) {
      if (user) {
        const sendData = {
          firebaseid: user.uid,
        };
        const resData = await axios.get("http://127.0.0.1:8000/api/user/", { params: sendData })
        commit('getData', {
          id: resData.data.data.user.id,
          name: resData.data.data.user.name,
          firebaseid: resData.data.data.user.firebaseid,
          email: resData.data.data.user.email,
        })
      }
    })
  },
}

export const mutations = {
  getData(state, user) {
    state.user = user
  },
};