// import axios from 'axios'
import API from '@/api'

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
  async getLanguagesAll () {
    console.log('Pobieram jezyki')

    let getLanguagesAllResponse = {}

    try {
      getLanguagesAllResponse = await API.loadLanguagesAll()
      console.log(getLanguagesAllResponse.data)
      return getLanguagesAllResponse.data
    } catch (e) {
      console.log(e)
    }
  },

  async getLevelsAll () {
    console.log('Pobieram poziomy zaawansowania')

    let getLevelsAllResponse = {}

    try {
      getLevelsAllResponse = await API.loadLevelsAll()
      console.log(getLevelsAllResponse.data)
      return getLevelsAllResponse.data
    } catch (e) {
      console.log(e)
    }
  },

  async getAllExercises ({ commit }) {
    console.log('Wysylam zadanie pobrania wszystkich ćwiczeń')

    let getAllExercisesResponse = {}

    try {
      getAllExercisesResponse = await API.loadAllExercises()
      console.log(getAllExercisesResponse)
      commit('setExercises', getAllExercisesResponse.data)
    } catch (e) {
      console.log(e)
    }
  },

  async getAllTasks ({ commit }) {
    console.log('Wysylam zadanie pobrania wszystkich zadan')

    let getAllTasksResponse = {}

    try {
      getAllTasksResponse = await API.loadAllTasks()
      console.log(getAllTasksResponse)
      commit('setTasks', getAllTasksResponse.data)
    } catch (e) {
      console.log(e)
    }
  },

  async createExercise ({ commit }, newExerciseData) {
    console.log('Wysylam zadanie utworzenia nowego cwiczenia')

    let createExerciseResponse = {}

    try {
      createExerciseResponse = await API.createExercise(newExerciseData)
      console.log(createExerciseResponse)
    } catch (e) {
      console.log(e)
    }
  },

  async createTask ({ commit }, newTaskData) {
    console.log('Wysylam zadanie utworzenia nowego zadania')

    let createTaskResponse = {}

    try {
      createTaskResponse = await API.createTask(newTaskData)
      console.log(createTaskResponse)
    } catch (e) {
      console.log(e)
    }
  }

  /*
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
  */

  /*
  getAllTasks (context) {
    console.log('Wysylam zadanie pobrania zadania!')

    return new Promise((resolve, reject) => {
      let authHeader = 'Bearer ' + context.state.token
      console.log(authHeader)
      axios.get('http://localhost:8000/tasks/',
        {
          headers: {
            'Authorization': authHeader
          }
        })
        .then((response) => {
          context.commit('setTasks', response.data)
          resolve()
        })
        .catch(error => {
          console.log('Blad pobierania zadan')
          reject(error)
        })
    })
  },
  */

  /* createExercise ({ commit }, payload) {
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
  }, */

  /* createTask ({ commit }, payload) {
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
  } */
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
