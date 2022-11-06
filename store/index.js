export const state = () => ({
  token: null,
})

export const getters = {
  isAuthenticated(state) {
    return state.token != null
  }
}