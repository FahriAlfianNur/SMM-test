<template>
  <div class="todos-page">
    <div class="todos-container">
      <h2>My Todos</h2>

      <div class="add-todo-form">
        <input
          v-model="newTodoTitle"
          type="text"
          placeholder="Add a new todo..."
          @keyup.enter="handleAddTodo"
          class="todo-input"
        />
        <button @click="handleAddTodo" class="btn-add">Add</button>
      </div>

      <div v-if="isLoading" class="loading">Loading todos...</div>

      <div v-else-if="todos.length === 0" class="empty-state">
        No todos yet. Create one to get started!
      </div>

      <div v-else class="todos-list">
        <div
          v-for="todo in todos"
          :key="todo.id"
          class="todo-item"
          :class="{ completed: todo.completed }"
        >
          <input
            type="checkbox"
            :checked="todo.completed"
            @change="handleToggleTodo(todo.id, !todo.completed)"
            class="todo-checkbox"
          />
          <span class="todo-title">{{ todo.title }}</span>
          <button @click="handleDeleteTodo(todo.id)" class="btn-delete">Delete</button>
        </div>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService'

const todos = ref([])
const newTodoTitle = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(loadTodos)

async function loadTodos() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    todos.value = await fetchTodos()
  } catch (error) {
    errorMessage.value = 'Failed to load todos'
  } finally {
    isLoading.value = false
  }
}

async function handleAddTodo() {
  if (!newTodoTitle.value.trim()) return

  try {
    const newTodo = await createTodo(newTodoTitle.value)
    todos.value.push(newTodo)
    newTodoTitle.value = ''
  } catch (error) {
    errorMessage.value = 'Failed to create todo'
  }
}

async function handleToggleTodo(id, completed) {
  try {
    await updateTodo(id, { completed })
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = completed
    }
  } catch (error) {
    errorMessage.value = 'Failed to update todo'
  }
}

async function handleDeleteTodo(id) {
  try {
    await deleteTodo(id)
    todos.value = todos.value.filter(t => t.id !== id)
  } catch (error) {
    errorMessage.value = 'Failed to delete todo'
  }
}
</script>

<style scoped>
.todos-page {
  min-height: calc(100vh - 100px);
}

.todos-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.todos-container h2 {
  color: #333;
  margin-bottom: 2rem;
}

.add-todo-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.todo-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.todo-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.btn-add {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.3s;
}

.btn-add:hover {
  opacity: 0.9;
}

.loading,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.todos-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
}

.todo-item.completed .todo-title {
  text-decoration: line-through;
  color: #999;
}

.todo-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.todo-title {
  flex: 1;
  color: #333;
}

.btn-delete {
  padding: 0.5rem 1rem;
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: opacity 0.3s;
}

.btn-delete:hover {
  opacity: 0.8;
}

.error-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
