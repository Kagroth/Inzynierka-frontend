import axios from 'axios'
// import API from '@/api'

const state = {
  users: [],
  groups: []
}

const getters = {

}

const mutations = {
  setUsers (state, users) {
    state.users = users
  },

  setGroups (state, groups) {
    console.log(groups)
    state.groups = groups
  }
}

const actions = {
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
