# Mastery Document - Version 01

## 1. Project Identity
Project Name: FindStays

Project Type:
- Full-stack hotel booking and accommodation discovery platform
- Backend: Node.js + Express + MongoDB + Mongoose
- Frontend: React + Vite + Tailwind CSS

Primary Goal:
- Provide hotel listing, search, favorites, authentication, and booking-related APIs
- Support frontend integration for booking and accommodation browsing

---

## 2. Repository Structure Summary

Root folder contains:
- backend/ : server-side application
- client/ : frontend application
- mastery document.md : earlier summary file
- mastery document version_01.md : current versioned mastery summary

---

## 3. Backend Folder Structure and Purpose

### backend/
Main server application folder.

Contents:
- package.json
  - Defines backend dependencies and scripts
  - Main script: node server.js
  - Dev script: nodemon server.js
  - Core dependencies:
    - express
    - mongoose
    - cors
    - dotenv
    - bcryptjs
    - jsonwebtoken
    - express-validator
    - multer
  - Developer dependency:
    - nodemon

- package-lock.json
  - Lock file for installed backend packages

- server.js
  - Main backend entry point
  - Loads environment variables
  - Starts Express server
  - Registers routes
  - Uses CORS and JSON middleware
  - Connects to database through config/db.js

- .env
  - Runtime environment variables for the server
  - Contains database and JWT settings

- .env.example
  - Template for environment setup

---

## 4. Backend Subfolders

### backend/config/
- db.js
  - Connects the backend to MongoDB using Mongoose
  - Uses MONGO_URI environment variable
  - Handles connection fallback and runtime warnings if MongoDB is unavailable

### backend/controllers/
- authController.js
  - Handles user registration and login
  - Uses bcrypt for password hashing
  - Uses JWT for token generation

- hotelController.js
  - Handles hotel CRUD operations
  - Supports hotel listing, fetch by ID, create, update, patch, delete
  - Supports search/filter logic by location, rating, price, and name

- bookingController.js
  - Handles booking CRUD operations
  - Enforces authenticated user access
  - Populates user and hotel relationships

### backend/middleware/
- authMiddleware.js
  - Verifies JWT tokens
  - Attaches the authenticated user to req.user

- errorMiddleware.js
  - Centralized error handler for API errors

- validateMiddleware.js
  - Collects express-validator errors and returns them in a clean JSON format

### backend/models/
- User.js
  - Stores authentication data
  - Fields: name, email, password, role
  - Password is hashed before save

- Hotel.js
  - Stores hotel details
  - Fields: name, location, address, image, rating, visitors, description, facilities, pricePerNight

- Booking.js
  - Stores booking records
  - Fields: user, hotel, checkIn, checkOut, guests, totalPrice, status
  - Uses relationships with User and Hotel

### backend/routes/
- authRoutes.js
  - POST /api/auth/register
  - POST /api/auth/login

- hotelRoutes.js
  - GET /api/hotels
  - GET /api/hotels/:id
  - POST /api/hotels
  - PUT /api/hotels/:id
  - PATCH /api/hotels/:id
  - DELETE /api/hotels/:id
  - GET /api/hotels/search

- bookingRoutes.js
  - Protected booking routes
  - Uses authMiddleware

### backend/validators/
- authValidator.js
  - Validates register and login input

- hotelValidator.js
  - Validates hotel create/update input

- bookingValidator.js
  - Validates booking create/update input

### backend/uploads/
- Stores uploaded files if file upload support is used in the future

---

## 5. Frontend Folder Structure and Purpose

### client/
Main frontend application folder.

Contents:
- package.json
  - Frontend dependencies and scripts
  - Scripts:
    - npm run dev
    - npm run build
    - npm run lint
    - npm run preview
  - Dependencies include React, ReactDOM, React Router, Axios, Tailwind CSS

- package-lock.json
  - Locked dependency versions for the frontend

- vite.config.js
  - Vite configuration for the client app

- eslint.config.js
  - ESLint rules for the frontend

- index.html
  - App entry HTML file for Vite

- src/
  - Main React source code

### client/src/
- App.jsx
  - Root app router and global layout

- main.jsx
  - Entry point for React rendering

- index.css
  - Global styles

### client/src/components/
- Navbar.jsx
  - Website navigation bar

- Footer.jsx
  - Footer section

- HotelCard.jsx
  - Hotel card UI for listing

- SearchFilters.jsx
  - Search and filter UI

- HotelList.jsx
  - Displays hotel list

### client/src/context/
- HotelContext.jsx
  - Manages favorites and hotel-related UI state

### client/src/pages/
- Home.jsx
  - Main landing page

- SearchPage.jsx
  - Search results page

- HotelDetails.jsx
  - Details page for a hotel

- Favorites.jsx
  - Displays saved favorite hotels

- Login.jsx
  - Login page for user authentication

- Signup.jsx
  - Signup page for creating a new account

- EditAppointment.jsx
  - Appointment editing page

### client/public/
- favicon.svg
- icons.svg

### client/assets/
- Static assets folder

### client/hooks/
- Custom hooks folder

### client/services/
- hotelService.js
  - Handles frontend API calls for hotel data

---

## 6. Current Feature Summary

Implemented/backend-ready features:
- User registration and login
- JWT authentication
- Hotel CRUD operations
- Hotel search and filter endpoints
- Booking CRUD operations
- Validation middleware for all major endpoints
- Centralized error handling
- Frontend login and signup pages
- Hotel listing and favorites UI

---

## 7. API Endpoints Overview

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Hotels
- GET /api/hotels
- GET /api/hotels/:id
- POST /api/hotels
- PUT /api/hotels/:id
- PATCH /api/hotels/:id
- DELETE /api/hotels/:id
- GET /api/hotels/search

### Bookings
- GET /api/bookings
- GET /api/bookings/:id
- POST /api/bookings
- PUT /api/bookings/:id
- PATCH /api/bookings/:id
- DELETE /api/bookings/:id

---

## 8. Runtime and Environment Notes

Current backend behavior:
- The server starts on port 5000
- The project uses MongoDB Atlas URI through .env
- If the MongoDB service is unavailable, the backend starts but may show a connection warning
- The frontend uses Vite and React Router

---

## 9. Development Status

Current state:
- Backend file structure is complete
- Controllers, models, validators, and middleware are implemented
- Frontend auth pages are implemented
- Runtime validation shows that the API server boots, but full DB-backed requests depend on stable MongoDB connectivity

---

## 10. Final Summary
This project is structured as a modern full-stack hotel booking platform with distinct backend and frontend modules.

The backend is responsible for:
- authentication
- hotel management
- booking management
- validation and error handling

The frontend is responsible for:
- UI presentation
- hotel search and favorites
- authentication pages
- integration with backend APIs

This version_01 summary captures the complete project structure, responsibilities, and implementation status of the current workspace.
