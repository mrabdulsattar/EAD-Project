# FindStays Backend

## Project Description
FindStays is a hotel booking and accommodation discovery platform backend built with Node.js, Express.js, MongoDB, and Mongoose.

## Features
- User authentication with JWT
- Hotel CRUD operations
- Hotel search and filters
- Booking CRUD operations
- Centralized validation and error handling

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- cors
- express-validator

## Installation
1. cd backend
2. npm install
3. Copy .env.example to .env and update values

## Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Running Project
npm run dev

## API Endpoints
### Auth
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

## Folder Structure
backend/
  config/
  controllers/
  middleware/
  models/
  routes/
  validators/
  server.js
