VUE.JS FRONTEND SETUP

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

   The frontend will run on http://localhost:3000
   API proxy configured to http://localhost:3010

3. Features:

   HOME PAGE
   - Welcome screen with feature overview

   LOGIN PAGE
   - Email/password authentication
   - JWT token storage in localStorage
   - Auto-redirect to profile after login
   - Demo credentials: test@example.com / password123

   PROFILE PAGE
   - Edit name, email, profile picture
   - Auto-save after 2 seconds of inactivity (debounced)
   - "Saving..." and "Saved!" status indicators
   - Profile picture preview

   TODOS PAGE
   - Add new todos
   - Toggle completion status
   - Delete todos
   - Real-time UI updates

4. Project Structure:
   - src/main.js              - App entry point
   - src/App.vue              - Root component with navigation
   - src/router.js            - Route definitions and guards
   - src/pages/               - Page components
   - src/components/          - Reusable components
   - src/services/            - API communication
   - src/composables/         - Reusable logic (debounce)
