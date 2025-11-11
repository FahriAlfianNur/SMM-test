import { ref } from 'vue'

export function useDebounce(callback, delay) {
  let timeoutId = null
  const isPending = ref(false)

  function debounced(...args) {
    isPending.value = true

    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      callback(...args)
      isPending.value = false
    }, delay)
  }

  function cancel() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      isPending.value = false
    }
  }

  return {
    debounced,
    cancel,
    isPending
  }
}
