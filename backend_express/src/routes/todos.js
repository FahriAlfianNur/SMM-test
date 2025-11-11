import express from 'express'

const router = express.Router()

const todosStore = {}

function getTodos(userId) {
  if (!todosStore[userId]) {
    todosStore[userId] = []
  }
  return todosStore[userId]
}

function getNextId(userId) {
  const todos = getTodos(userId)
  return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1
}

router.post('/', (req, res) => {
  const { title } = req.body
  const userId = req.user.userId

  if (!title) {
    return res.status(400).json({ message: 'Title required' })
  }

  const todos = getTodos(userId)
  const newTodo = {
    id: getNextId(userId),
    title,
    completed: false,
    createdAt: new Date()
  }

  todos.push(newTodo)
  res.status(201).json(newTodo)
})

router.get('/', (req, res) => {
  const userId = req.user.userId
  const todos = getTodos(userId)
  res.json(todos)
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user.userId
  const todos = getTodos(userId)

  const todo = todos.find(t => t.id === parseInt(id))
  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  if (req.body.title !== undefined) {
    todo.title = req.body.title
  }
  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed
  }

  res.json(todo)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const userId = req.user.userId
  const todos = getTodos(userId)

  const index = todos.findIndex(t => t.id === parseInt(id))
  if (index === -1) {
    return res.status(404).json({ message: 'Todo not found' })
  }

  todos.splice(index, 1)
  res.status(204).send()
})

export default router
