import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRouter from './routes/auth.js'
import todoRouter from './routes/todos.js'
import profileRouter from './routes/profile.js'
import { authenticateToken } from './middleware/auth.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3010

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRouter)
app.use('/api/todos', authenticateToken, todoRouter)
app.use('/api/profile', authenticateToken, profileRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
