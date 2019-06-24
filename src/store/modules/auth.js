import axios from 'axios'
// import API from '@/api'

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
  createUser (context, payload) {
    console.log('Wysylam request rejestracji')

    axios.post('http://localhost:8000/users/', payload)
      .then(response => console.log(response.data))
      .catch(error => console.log(error.response))
  },

  loginUser ({ commit, dispatch }, payload) {
    console.log('Wysylam request logowania')

    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/token/', payload)
        .then(response => {
          console.log(response.data.access)
          commit('setToken', {
            token: response.data.access,
            username: payload.username
          })
          dispatch('setLoggedUserData')

          resolve()
        })
        .catch(error => {
          console.log(error.response)
          reject(error)
        })
    })
  },

  setLoggedUserData ({ commit, state }) {
    console.log('Wysylam request pobrania danych usera')

    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/profile/' + state.username)
        .then(response => {
          console.log(response.data)
          commit('setProfile', response.data)
          resolve()
        })
        .catch(error => {
          console.log(error.response)
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
