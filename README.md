# HotelHub (FindStays) — Fullstack Booking App

This workspace contains a production-ready backend (Express + MongoDB) and a React frontend (Vite + Tailwind).

## Quick Start

1. Ensure MongoDB is running locally or get an Atlas URI.
2. Open two terminals.

Backend:
```bash
cd backend
npm install
# create .env with MONGO_URI and JWT_SECRET (see example below)
# optional: DEFAULT_ADMIN_EMAIL and DEFAULT_ADMIN_PASSWORD to override teacher credentials
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173` (Vite) and backend on `http://localhost:5000`.

## Environment (.env)
Create `backend/.env` with:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/findstays
JWT_SECRET=your_jwt_secret_here
# optional override for teacher/admin check
DEFAULT_ADMIN_EMAIL=admin@hotelhub.com
DEFAULT_ADMIN_PASSWORD=Admin@123
```

## Teacher Admin Credentials
For evaluation there's a default admin account (can be overridden via `.env`):
- Email: admin@hotelhub.com
- Password: Admin@123

## Seeding Hotels
A seeder is included at `backend/seedHotels.js` — run it after ensuring `MONGO_URI` is set:
```bash
node backend/seedHotels.js
```

## API highlights
- Auth: `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- Hotels: `GET /api/hotels`, `GET /api/hotels/:id`, `GET /api/hotels/search`
- Bookings: `GET/POST/PATCH/PUT /api/bookings`
- Admin: `GET /api/admin/dashboard`, `GET /api/admin/users`

## Notes
- Frontend uses `localStorage` to store JWT token (for simplicity).
- If you need help running the project locally, tell me which OS/terminal you use and I can paste exact commands.
