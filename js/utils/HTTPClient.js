import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'

var instance = null

export const setAuth = () => {
  // debugger
  if (localStorage.loginToken) {
    instance = axios.create({
      baseURL: '',
      timeout: 60000,
      headers: {
        Authorization: 'Bearer ' + localStorage.loginToken,
        'Content-Type': 'application/json',
      },
    })
  } else {
    instance = axios.create({
      baseURL: '',
      timeout: 60000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  instance.interceptors.response.use(
    function (response) {
      return response
    },
    function (error) {
      if (error.response.data.path === '/v1/login') {
        return Promise.reject(error)
      } else if (
        error.response.status !== undefined &&
        error.response.status === 401
      ) {
        localStorage.clear()
        window.location = '/login'
      } else {
        return Promise.reject(error)
      }
    }
  )
}

export const clearHTTPClient = () => {
  instance = null
}

export const Get = (route, data) => {
  instance || setAuth()
  return instance.get(route, data)
}

export const Post = (route, data) => {
  instance || setAuth()
  return instance.post(route, JSON.stringify(data))
}

export const Put = (route, data) => {
  instance || setAuth()
  return instance.put(route, JSON.stringify(data))
}

export const Delete = (route, data) => {
  instance || setAuth()
  return instance.delete(route, { data })
}
