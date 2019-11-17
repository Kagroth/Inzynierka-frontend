import API from '@/api'

const state = {
  token: '',
  isLogged: '',
  username: '',
  profile: {}
}

const getters = {

}

const mutations = {
  init (state) {
    state.token = localStorage.getItem('token')
    state.isLogged = (localStorage.getItem('token') !== 'null' &&
                      localStorage.getItem('token') !== undefined)
    state.username = localStorage.getItem('username') || ''
  },

  setToken (state, payload) {
    console.log(`Ustawiam token!`)
    localStorage.setItem('token', payload.token)
    state.token = localStorage.getItem('token')
    state.isLogged = (localStorage.getItem('token') != null)
    state.username = payload.username
    API.setAuthToken(payload.token)
    console.log(state.username)
  },

  setProfile (state, profile) {
    state.profile = profile
  },

  logout (state) {
    localStorage.setItem('token', null)
    state.token = null
    state.isLogged = false
    state.username = null
  }
}

const actions = {
  async createUser (context, registerForm) {
    console.log('Wysylam request rejestracji')

    let registerResponse = {}

    try {
      registerResponse = await API.createUser(registerForm)
      console.log(registerResponse.data)
      return registerResponse.data
    } catch (e) {
      console.log(e)
    }
  },

  async loginUser ({ commit, dispatch, state }, loginForm) {
    console.log('Wysylam request logowania')
    let loginResponse = {}
    let userDataResponse = {}

    try {
      loginResponse = await API.loginUser(loginForm)
      commit('setToken', {
        token: loginResponse.data.access,
        username: loginForm.username
      })

      userDataResponse = await API.loadUserData(state.username)
      commit('setProfile', userDataResponse.data)
    } catch (e) {
      console.log(e)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
