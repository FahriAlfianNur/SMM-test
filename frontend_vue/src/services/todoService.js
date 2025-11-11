import axios from 'axios'

const API_URL = '/api/todos'

export async function fetchTodos() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function createTodo(title) {
  const response = await axios.post(API_URL, { title })
  return response.data
}

export async function updateTodo(id, updates) {
  const response = await axios.patch(`${API_URL}/${id}`, updates)
  return response.data
}

export async function deleteTodo(id) {
  await axios.delete(`${API_URL}/${id}`)
}
