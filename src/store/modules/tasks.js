import axios from 'axios'

const state = {
  exercises: [],
  tasks: []
}

const getters = {

}

const mutations = {
  setExercises (state, exercises) {
    console.log(exercises)
    state.exercises = exercises
  },

  setTasks (state, tasks) {
    console.log(tasks)
    state.tasks = tasks
  }
}

const actions = {
  getAllExercises ({ commit }) {
    console.log('Wysylam zadanie pobrania ćwiczeń!')

    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token
      axios.get('http://localhost:8000/exercises/',
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          commit('setExercises', response.data)
          resolve()
        })
        .catch(error => {
          console.log('Blad pobierania cwiczen')
          reject(error)
        })
    })
  },

  getAllTasks ({ commit }) {
    console.log('Wysylam zadanie pobrania zadania!')

    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token
      axios.get('http://localhost:8000/tasks/',
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          commit('setTasks', response.data)
          resolve()
        })
        .catch(error => {
          console.log('Blad pobierania zadan')
          reject(error)
        })
    })
  },

  createExercise ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token

      axios.post('http://localhost:8000/exercises/',
        {
          params: payload
        },
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          console.log(response.data)
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  createTask ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + this.state.token

      axios.post('http://localhost:8000/tasks/',
        {
          params: payload
        },
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          console.log(response.data)
          resolve(response.data)
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
