import axios from 'axios'

const API_URL = '/api'
const TOKEN_KEY = 'auth_token'

export function setupAuthInterceptor() {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEY)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  }, (error) => {
    return Promise.reject(error)
  })

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}

export async function login(email, password) {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password })
  if (response.data.token) {
    localStorage.setItem(TOKEN_KEY, response.data.token)
  }
  return response.data
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY)
}

export function isUserLoggedIn() {
  return !!localStorage.getItem(TOKEN_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY)
}
