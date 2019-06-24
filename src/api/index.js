import axios from 'axios'

const APIInstance = axios.create({
  baseURL: 'http://localhost:8000/',
  headers: {
    Authorization: `Bearer `
  }
})

export default {
  APIInstance,

  simpleGet () {
    return new Promise((resolve, reject) => {
      APIInstance.post('token/', {
        username: 'jankowalek',
        password: 'student123'
      }).then(response => resolve(response))
        .catch(error => reject(error))
    })
  }
}
