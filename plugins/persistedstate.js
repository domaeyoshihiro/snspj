import createPersistedState from 'vuex-persistedstate'

export default ({ store }) => {
  createPersistedState({

    key: 'appName',
    storage: window.sessionStorage,
  })(store)
}