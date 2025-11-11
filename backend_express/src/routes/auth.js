import express from 'express'
import { generateToken } from '../middleware/auth.js'

const router = express.Router()

const users = [
  { id: 1, email: 'test@example.com', password: 'password123' }
]

router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = generateToken(user.id, user.email)
  res.json({ token, user: { id: user.id, email: user.email } })
})

router.post('/register', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' })
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' })
  }

  const newUser = {
    id: users.length + 1,
    email,
    password
  }
  users.push(newUser)

  const token = generateToken(newUser.id, newUser.email)
  res.status(201).json({ token, user: { id: newUser.id, email: newUser.email } })
})

export default router
