# FindStays 🏨

A full-stack hotel booking web application that allows users to search, browse, and book hotels with ease. Built as a semester project demonstrating a complete three-tier architecture.

---

## 📌 Project Description

FindStays is a real-world hotel reservation system where users can search for hotels by location, check available rooms, view detailed hotel information, make bookings, and manage their reservations. An admin panel is also included for managing hotels, rooms, and bookings.

---

## ✨ Features

- 🔍 Search hotels by location, check-in/check-out date, and guests
- 🏨 Browse hotels with filtering and sorting options
- 📋 View detailed hotel and room information
- 📅 Book a room with date selection
- ❤️ Save favourite hotels (stored in localStorage)
- 👤 User authentication (Register / Login)
- 🛠️ Admin dashboard to manage hotels, rooms, and bookings
- 📊 Full CRUD operations on hotels and bookings
- ✅ Form validation with proper success and error messages
- 📱 Responsive design for all screen sizes
- 💀 Skeleton loading for better UX

---

## 🛠️ Technologies Used

### Frontend
- React JS (Vite)
- React Router DOM
- Context API (State Management)
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express JS
- REST API (GET, POST, PUT, PATCH, DELETE)
- JWT Authentication
- bcryptjs

### Database
- MongoDB (via Mongoose ODM)

### Tools
- Postman (API testing)
- Git & GitHub

---

## 📁 Folder Structure

```
FindStays/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── main.jsx
│   └── package.json
│
├── backend/           # Node.js + Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── seed.js
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

Make sure you have the following installed:
- Node.js (v18 or above)
- npm
- MongoDB (local or MongoDB Atlas)
- Git

---

### 1. Clone the Repository

```bash
git clone https://github.com/mrabdulsattar/EAD-Project.git
cd EAD-Project
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/findstays
JWT_SECRET=your_jwt_secret_key
```

> See `.env.example` for reference.

Start the backend server:

```bash
npm run dev
```

The backend will run at: `http://localhost:5000`

---

### 3. Seed the Database (Optional)

To populate the database with sample hotel data:

```bash
node seed.js
```

---

### 4. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will run at: `http://localhost:5173`

---

## 🔌 Environment Variables

| Variable     | Description                        |
|--------------|------------------------------------|
| `PORT`       | Port for the Express server        |
| `MONGO_URI`  | MongoDB connection string          |
| `JWT_SECRET` | Secret key for JWT token signing   |

---

## 📡 API Endpoints

### Hotels
| Method | Endpoint              | Description          |
|--------|-----------------------|----------------------|
| GET    | `/api/hotels`         | Get all hotels       |
| GET    | `/api/hotels/:id`     | Get hotel by ID      |
| POST   | `/api/hotels`         | Create a new hotel   |
| PUT    | `/api/hotels/:id`     | Update a hotel       |
| DELETE | `/api/hotels/:id`     | Delete a hotel       |

### Bookings
| Method | Endpoint                | Description             |
|--------|-------------------------|-------------------------|
| GET    | `/api/bookings`         | Get all bookings        |
| GET    | `/api/bookings/:id`     | Get booking by ID       |
| POST   | `/api/bookings`         | Create a new booking    |
| PATCH  | `/api/bookings/:id`     | Update booking status   |
| DELETE | `/api/bookings/:id`     | Cancel a booking        |

### Auth
| Method | Endpoint              | Description     |
|--------|-----------------------|-----------------|
| POST   | `/api/auth/register`  | Register user   |
| POST   | `/api/auth/login`     | Login user      |

---

## 🚀 Running the Project

1. Start MongoDB locally (or use Atlas connection string in `.env`)
2. Run the backend: `cd backend && npm run dev`
3. Run the frontend: `cd frontend && npm run dev`
4. Open your browser at `http://localhost:5173`

---

## 👨‍💻 Developed By

**Abdul Sattar**
BS Computer Science — 6th Semester
Sukkur IBA University
