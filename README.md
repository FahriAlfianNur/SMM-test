# SMM Test Project

## Project Structure

```
SMM-test/
├── frontend_vue/          # Vue.js frontend application
├── backend_laravel/       # Laravel backend API
└── backend_express/       # Express.js backend API (alternative)
```

## Quick Start

### Prerequisites
- Node.js 16+ (for frontend)
- PHP 8.0+ (for Laravel backend)
- npm or yarn (for Node.js projects)
- Composer (for Laravel)

### Frontend (Vue.js)

```bash
cd frontend_vue
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000` (or as shown in terminal)

### Backend - Laravel

```bash
cd backend_laravel
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

The API will be available at `http://localhost:8000`

### Backend - Express

```bash
cd backend_express
npm install
npm run dev
# or npm start
```

The API will be available at `http://localhost:3010` (or as configured)

## Documentation

For detailed information, see:
- [Frontend README](./frontend_vue/README.md)
- [Laravel Backend README](./backend_laravel/README.md)
- [Express Backend README](./backend_express/README.md)
