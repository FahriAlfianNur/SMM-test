import axios from 'axios'

const API_URL = '/api/profile'

export async function getProfile() {
  const response = await axios.get(API_URL)
  return response.data
}

export async function updateProfile(profileData) {
  const response = await axios.patch(API_URL, profileData)
  return response.data
}
