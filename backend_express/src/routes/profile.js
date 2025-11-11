import express from 'express'

const router = express.Router()

const profileStore = {}

router.get('/', (req, res) => {
  const userId = req.user.userId
  const profile = profileStore[userId] || {
    id: userId,
    name: 'John Doe',
    email: req.user.email,
    profilePicture: ''
  }
  res.json(profile)
})

router.patch('/', (req, res) => {
  const userId = req.user.userId
  const { name, email, profilePicture } = req.body

  if (!profileStore[userId]) {
    profileStore[userId] = {
      id: userId,
      name: 'John Doe',
      email: req.user.email,
      profilePicture: ''
    }
  }

  const profile = profileStore[userId]

  if (name !== undefined) {
    profile.name = name
  }
  if (email !== undefined) {
    profile.email = email
  }
  if (profilePicture !== undefined) {
    profile.profilePicture = profilePicture
  }

  res.json(profile)
})

export default router
