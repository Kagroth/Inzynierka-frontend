import axios from 'axios'

const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/'
})

export default {
  APIInstance,

  setAuthToken (token) {
    this.APIInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  },

  sendRequest (url, method, data = null) {
    let config = {}

    if (data === null) {
      config = {
        url: url,
        method: method
      }
    } else {
      config = {
        url: url,
        method: method,
        data: data
      }
    }

    return this.APIInstance.request(config)
  },

  loginUser (loginData) {
    return this.sendRequest('token/', 'post', loginData)
  },

  createUser (registerData) {
    return this.sendRequest('users/', 'post', registerData)
  },

  loadUserData (username) {
    return this.sendRequest(`profile/${username}`, 'get')
  },

  loadAllUsers () {
    return this.sendRequest('users/', 'get')
  },

  loadStudents () {
    return this.sendRequest('students/', 'get')
  },

  loadGroups () {
    return this.sendRequest('groups/', 'get')
  },

  createGroup (newGroupData) {
    return this.sendRequest('groups/', 'post', newGroupData)
  },

  deleteGroup (primaryKey) {
    return this.sendRequest('groups/', 'delete', primaryKey)
  },

  loadAllExercises () {
    return this.sendRequest('exercises/', 'get')
  },

  loadAllTests () {
    return this.sendRequest('tests/', 'get')
  },

  loadAllTasks () {
    return this.sendRequest('tasks/', 'get')
  },

  createExercise (newExerciseData) {
    return this.sendRequest('exercises/', 'post', newExerciseData)
  },

  createTask (newTaskData) {
    return this.sendRequest('tasks/', 'post', newTaskData)
  },

  loadLanguagesAll () {
    return this.sendRequest('languages/', 'get')
  },

  loadLevelsAll () {
    return this.sendRequest('levels/', 'get')
  }
}
