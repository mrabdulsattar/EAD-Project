# Mastery Document

## Project Overview
This repository is organized as a full-stack appointment management application with separate `backend` and `client` folders.

- `backend/`: Node.js + Express API server with authentication, appointment management, file uploads, and MongoDB integration.
- `client/`: React + Vite front-end application with Tailwind CSS support, routing, appointment UI, and API service integration.

---

## Root Folder

Files and folders in project root:

- `.gitignore`: Ignore file for Git-managed files and folders.
- `backend/`: Server-side application.
- `client/`: Front-end application.

---

## Backend Structure

### backend/

- `package.json`
  - Defines backend dependencies and scripts.
  - Scripts:
    - `start`: `node server.js`
    - `dev`: `nodemon server.js`
  - Dependencies:
    - `express`
    - `mongoose`
    - `cors`
    - `dotenv`
    - `bcryptjs`
    - `jsonwebtoken`
    - `express-validator`
    - `multer`
  - Dev dependency:
    - `nodemon`
- `package-lock.json`: NPM lockfile.
- `server.js`: Entry point for the backend server. Likely sets up Express, middleware, routes, and listens on a port.
- `.env`: Environment variable file for local secrets and configuration (likely not committed with real values).
- `.env.example`: Example environment variable file for development reference.

### backend/config/

- `db.js`
  - Database configuration file.
  - Likely exports a connection function to initialize MongoDB via Mongoose.

### backend/controllers/

- `appointmentController.js`
  - Contains appointment-related controller logic.
  - Likely handles create, read, update, delete operations and business rules for appointments.

### backend/middleware/

- `authMiddleware.js`
  - Middleware to protect routes via authentication.
  - Likely validates JWT tokens and attaches user data to requests.

### backend/models/

- `Appointment.js`
  - Mongoose schema/model for appointment data.
  - Defines appointment fields and validation rules.
- `User.js`
  - Mongoose schema/model for user authentication data.
  - Defines user fields, hashed password storage, and user metadata.

### backend/routes/

- `appointmentRoutes.js`
  - Defines API endpoints for appointment CRUD operations.
  - Likely uses `appointmentController` functions.
- `authRoutes.js`
  - Defines authentication endpoints such as login, registration, and possibly token refresh.

### backend/uploads/

- Directory for storing uploaded files.
- Likely used by Multer to handle file uploads for appointment attachments or user uploads.

---

## Client Structure

### client/

- `package.json`
  - Front-end dependencies and build scripts.
  - Scripts:
    - `dev`: `vite`
    - `build`: `vite build`
    - `lint`: `eslint .`
    - `preview`: `vite preview`
  - Dependencies:
    - `react`
    - `react-dom`
    - `react-router-dom`
    - `axios`
    - `tailwindcss`
    - `@tailwindcss/vite`
  - Dev dependencies:
    - `vite`
    - `@vitejs/plugin-react`
    - `eslint`
    - `@eslint/js`
    - `eslint-plugin-react-hooks`
    - `eslint-plugin-react-refresh`
    - `globals`
    - TypeScript typings for React (`@types/react`, `@types/react-dom`)
- `package-lock.json`: NPM lockfile.
- `vite.config.js`: Vite configuration file for the React application.
- `eslint.config.js`: ESLint configuration file to enforce front-end code quality.
- `README.md`: Client-side documentation or usage instructions.
- `.gitignore`: Git ignore settings for the client app.

### client/assets/

- Folder is present and currently empty.
- Intended for static assets such as images, icons, or other media used in the React app.

### client/components/

- `AppointmentCard.jsx`
  - Likely displays appointment details in a card layout.
- `AppointmentForm.jsx`
  - Form component for creating or editing appointments.
- `Footer.jsx`
  - Page footer component.
- `Navbar.jsx`
  - Navigation header component.

### client/context/

- `AppointmentContext.jsx`
  - React context for global appointment state management.
  - Provides state and actions across components.

### client/hooks/

- Folder exists but is currently empty.
- Reserved for custom React hooks.

### client/pages/

- `AddAppointment.jsx`
  - Page for adding a new appointment.
- `AppointmentDetails.jsx`
  - Page for viewing details of a selected appointment.
- `Appointments.jsx`
  - Main appointments list page.
- `EditAppointment.jsx`
  - Page for editing an existing appointment.
- `Home.jsx`
  - Landing or dashboard page.

### client/public/

- `favicon.svg`: Site favicon image.
- `icons.svg`: SVG icon sprite or icon set.

### client/services/

- `appointmentService.js`
  - API service module for appointment-related requests.
  - Likely uses `axios` to call backend endpoints.

### client/src/

- `App.jsx`
  - Root React component for app layout, routing, and global composition.
- `main.jsx`
  - React application entry point that mounts the app into the DOM.
- `index.css`
  - Global CSS styles for the application.
- `assets/`
  - Nested asset folder for source-managed assets used by Vite.

---

## Summary of Responsibilities

- `backend/` handles server-side logic, data models, authentication, and API routing.
- `client/` handles UI rendering, routing, state management, and API communication.
- `backend/config/db.js` connects to the database.
- `backend/models/` defines data schemas.
- `backend/controllers/` contains business logic.
- `backend/routes/` exposes HTTP endpoints.
- `backend/middleware/authMiddleware.js` protects secure routes.
- `client/components/` contains reusable UI controls.
- `client/pages/` contains page-level screens.
- `client/context/` stores shared React state.
- `client/services/` centralizes backend API calls.

---

## Notes

- The project uses modern React with Vite and Tailwind integration.
- The backend is built on Express and MongoDB with JWT authentication support.
- The structure is separated cleanly between server and client concerns.
- Empty folders exist for future growth: `client/assets/`, `client/hooks/`, and `backend/uploads/`.
