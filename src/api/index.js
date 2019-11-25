import axios from 'axios'

const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/'
})

let token = ''
let refreshToken = ''

export default {
  APIInstance,
  token,
  refreshToken,

  setAuthToken (token, refreshToken = null) {
    this.token = token

    if (refreshToken !== null) {
      this.refreshToken = refreshToken
      console.log(refreshToken)
    }

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
      .then(response => {
        return response
      })
      .catch(error => {
        if (error.response.status === 401) {
          console.log('Brak autoryzacji')
          console.log(this.refreshToken)

          return this.APIInstance.request({
            url: 'token/refresh/',
            method: 'POST',
            data: {
              refresh: localStorage.getItem('refresh')
            }
          })
            .then(success => {
              console.log(success)
              localStorage.setItem('token', success.data.access)
              this.setAuthToken(success.data.access)

              return this.APIInstance.request(config)
            })
            .catch(error => {
              console.log(error)
              console.log(error.response)
              return error
            })
        }
        return error
      })
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

  updateGroup (changedGroupData) {
    return this.sendRequest('groups/' + changedGroupData.pk + '/', 'put', changedGroupData)
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

  deleteExercise (exerciseToDeletePk) {
    return this.sendRequest('exercises/' + exerciseToDeletePk, 'delete')
  },

  createTest (newTestData) {
    return this.sendRequest('tests/', 'post', newTestData)
  },

  deleteTest (testToDeletePk) {
    return this.sendRequest('tests/' + testToDeletePk, 'delete')
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
