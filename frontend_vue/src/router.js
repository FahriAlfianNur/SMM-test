import { createRouter, createWebHistory } from 'vue-router'
import { isUserLoggedIn } from './services/authService'

import HomePage from './pages/HomePage.vue'
import LoginPage from './pages/LoginPage.vue'
import ProfilePage from './pages/ProfilePage.vue'
import TodosPage from './pages/TodosPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: LoginPage,
    meta: { requiresAuth: false }
  },
  {
    path: '/profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/todos',
    component: TodosPage,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const isAuthenticated = isUserLoggedIn()

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export function setupRouter(app) {
  app.use(router)
}

export default router
