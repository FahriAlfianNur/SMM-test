<template>
  <div class="profile-page">
    <div class="profile-container">
      <h2>User Profile</h2>

      <div class="profile-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            v-model="profile.name"
            type="text"
            @input="handleProfileChange"
            placeholder="Enter your name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="profile.email"
            type="email"
            @input="handleProfileChange"
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            v-model="profile.profilePicture"
            type="url"
            @input="handleProfileChange"
            placeholder="Enter image URL"
          />
        </div>

        <div v-if="profile.profilePicture" class="profile-preview">
          <img :src="profile.profilePicture" :alt="profile.name" />
        </div>
      </div>

      <div class="save-status">
        <span v-if="isSaving" class="saving">💾 Saving…</span>
        <span v-else-if="hasSaved" class="saved">✓ Saved!</span>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getProfile, updateProfile } from '../services/profileService'
import { useDebounce } from '../composables/useDebounce'

const profile = reactive({
  name: '',
  email: '',
  profilePicture: ''
})

const isSaving = ref(false)
const hasSaved = ref(false)
const errorMessage = ref('')

const { debounced: debouncedSave } = useDebounce(saveProfile, 2000)

onMounted(async () => {
  try {
    const data = await getProfile()
    Object.assign(profile, data)
  } catch (error) {
    errorMessage.value = 'Failed to load profile'
  }
})

function handleProfileChange() {
  hasSaved.value = false
  errorMessage.value = ''
  debouncedSave()
}

async function saveProfile() {
  isSaving.value = true
  try {
    await updateProfile(profile)
    hasSaved.value = true
    setTimeout(() => {
      hasSaved.value = false
    }, 2000)
  } catch (error) {
    errorMessage.value = 'Failed to save profile'
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.profile-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 100px);
}

.profile-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

.profile-container h2 {
  color: #333;
  margin-bottom: 2rem;
}

.profile-form {
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.profile-preview {
  margin-top: 1rem;
  padding: 1rem;
  background: #f9f9f9;
  border-radius: 4px;
  text-align: center;
}

.profile-preview img {
  max-width: 200px;
  max-height: 200px;
  border-radius: 4px;
}

.save-status {
  margin: 1rem 0;
  font-weight: 500;
  height: 1.5rem;
}

.saving {
  color: #ff9800;
}

.saved {
  color: #4caf50;
}

.error-message {
  padding: 0.75rem;
  background: #fee;
  color: #c33;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>
