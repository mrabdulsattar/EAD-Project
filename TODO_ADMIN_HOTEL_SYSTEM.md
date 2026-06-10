# TODO - Admin-Controlled Hotel Management System (FindStays)

## Phase 1: Backend hardening (admin seeding + admin endpoints)
- [ ] Create production seed on server startup that adds default admin:
  - [ ] email: admin@gmail.com
  - [ ] password: curl http://localhost:5000/api/hotels
  - [ ] role: admin
  - [ ] hash password with bcrypt
  - [ ] skip if admin already exists
- [ ] Add/verify middleware/validation for admin routes.
- [ ] Extend `backend/routes/adminRoutes.js` with admin APIs:
  - [ ] GET /api/admin/users
  - [ ] GET /api/admin/users/:id
  - [ ] PATCH /api/admin/users/:id/status
  - [ ] PATCH /api/admin/users/:id/role
  - [ ] GET /api/admin/bookings
  - [ ] PATCH /api/bookings/:id (admin update status)
  - [ ] DELETE /api/bookings/:id
- [ ] Ensure all admin endpoints are protected by `authMiddleware` + `adminMiddleware`.
- [ ] Ensure proper error handling + express-validator usage.

## Phase 2: Frontend hotel system (remove mocks + implement admin hotel pages)
- [ ] Remove mock dataset from `client/src/services/hotelService.js`.
- [ ] Create `client/src/services/adminHotelService.js`.
- [ ] Create admin pages:
  - [ ] `client/src/pages/AdminHotels.jsx`
  - [ ] `client/src/pages/CreateHotel.jsx`
  - [ ] `client/src/pages/EditHotel.jsx`
- [ ] Add pagination/search/filter UI.
- [ ] Add delete confirmation modal + toast/success messaging.

## Phase 3: Frontend admin dashboard + user/booking modules
- [ ] Replace static `client/src/pages/AdminDashboard.jsx` with API data from `GET /api/admin/dashboard`.
- [ ] Create `client/src/services/adminService.js`.
- [ ] Create admin pages:
  - [ ] `client/src/pages/AdminUsers.jsx`
  - [ ] `client/src/pages/AdminBookings.jsx`
- [ ] Implement filtering/search and action buttons.

## Phase 4: Protected admin routes + final cleanup
- [ ] Update `client/src/App.jsx` routing to protect `/admin*`.
- [ ] Redirect unauthenticated users to `/login`.
- [ ] Redirect non-admin users to `/`.
- [ ] Ensure only role=admin can access admin pages.
- [ ] Final check: no remaining mock hotel fetching.

## Phase 5: Testing
- [ ] Run backend and verify admin login using required credentials.
- [ ] Verify regular user cannot access admin routes.
- [ ] Verify admin can CRUD hotels, manage users, manage bookings.
- [ ] Verify frontend admin dashboard loads.

