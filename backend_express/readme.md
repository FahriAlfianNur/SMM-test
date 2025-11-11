EXPRESS.JS BACKEND SETUP

1. Install dependencies:
   npm install

2. Start the development server:
   npm run dev

   The server will run on http://localhost:3010

3. Available API Endpoints:

   AUTHENTICATION
   - POST /api/auth/login
     Body: { email, password }
     Demo: email: test@example.com, password: password123

   - POST /api/auth/register
     Body: { email, password }

   TODOS (requires JWT token)
   - POST /api/todos
     Body: { title }

   - GET /api/todos

   - PATCH /api/todos/:id
     Body: { title?, completed? }

   - DELETE /api/todos/:id

   PROFILE (requires JWT token)
   - GET /api/profile

   - PATCH /api/profile
     Body: { name?, email?, profilePicture? }

4. Project Structure:
   - src/server.js       - Main application entry
   - src/routes/        - API route handlers
   - src/middleware/    - JWT authentication middleware

5. Database:
   Uses in-memory storage (no external database required)
   Data resets on server restart
