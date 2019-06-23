import axios from 'axios'

const state = {
  token: '',
  isLogged: '',
  username: '',
  profile: {},
  users: [],
  groups: []
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

  setUsers (state, users) {
    state.users = users
  },

  setGroups (state, groups) {
    console.log(groups)
    state.groups = groups
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
  },

  getAllUsers ({ commit }, payload) {
    console.log('Wysylam zadanie pobrania userow!')

    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/users/')
        .then((response) => {
          commit('setUsers', response.data)
          resolve()
        })
        .catch(error => {
          console.log('Blad pobierania userow')
          reject(error)
        })
    })
  },

  getAllStudents ({ commit }, payload) {
    console.log('Wysylam zadanie pobrania studentow!')

    return new Promise((resolve, reject) => {
      axios.get('http://localhost:8000/students/')
        .then((response) => {
          commit('setUsers', response.data)
          resolve()
        })
        .catch(error => {
          console.log('Blad pobierania userow')
          reject(error)
        })
    })
  },

  getAllGroups (context, payload) {
    console.log('Wysylam zadanie wyswietlenia grup!')

    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + context.state.token
      console.log(authHeader)
      axios.get('http://localhost:8000/groups/', { headers: {
        'Authorization': authHeader
      } })
        .then((response) => {
          context.commit('setGroups', response.data)
          resolve()
        })
        .catch(error => {
          alert('Blad pobierania grup')
          reject(error)
        })
    })
  },

  createGroup ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token

      axios.post('http://localhost:8000/groups/',
        {
          params: payload
        },
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  deleteGroup ({ commit }, pk) {
    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token

      axios.delete('http://localhost:8000/groups/' + pk,
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          console.log(response)
          resolve(response)
        })
        .catch((error) => {
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
