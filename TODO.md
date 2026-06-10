# FindStays (HotelHub) — Implementation Tracker

## Backend
1. Update `backend/models/User.js` to solidify auth foundations (password hashing, role handling).
2. Update `backend/controllers/authController.js` and `backend/routes/authRoutes.js` to fully match required endpoints/response shapes.
3. Ensure server auto-seeds admin account on startup if none exists.
4. Update `backend/models/Hotel.js`:
   - Add `HOTEL_IMAGE_POOL` (30+ unique Unsplash URLs)
   - Pre-save hook assigns image NOT already used by any other hotel.
5. Update `backend/seedHotels.js`:
   - Shuffle `HOTEL_IMAGE_POOL`
   - Seed 60+ hotels across 3+ countries (20+ per country)
   - Sequential image assignment with no duplication.
6. Update `backend/models/Booking.js`:
   - Full status enum
   - Ensure nights/totalPrice computation rules align with controllers.
7. Update `backend/controllers/bookingController.js` + `backend/routes/bookingRoutes.js` for complete user booking flow.
8. Update Admin system:
   - Verify/adjust `backend/middleware/adminMiddleware.js`
   - Expand `backend/routes/adminRoutes.js` + `backend/controllers/adminController.js` to required endpoints and analytics.
9. Add/merge hotel CRUD admin endpoints (POST/PUT/PATCH/DELETE).

## Frontend
10. Implement Axios base instance (auth header from localStorage token).
11. Update `AuthContext` + `ProtectedRoute` to enforce auth + admin-only protection.
12. Implement `/login`, `/signup` pages with inline validation and toasts.
13. Navbar auth-aware rendering and logout button.
14. Implement Booking modal on `/hotels/:id` page and user `/dashboard` booking tabs.
15. Implement admin UI pages:
   - `/admin/dashboard` analytics with recharts
   - `/admin/hotels` CRUD table + pagination + create/edit forms
   - `/admin/bookings` status actions table
   - `/admin/users` block/unblock + role management + search
16. Implement ToastContext and use across all flows.
17. Ensure responsive layout + remove any mock data.

## Completion
18. Run backend + frontend locally, verify all API endpoints and UI interactions end-to-end.

