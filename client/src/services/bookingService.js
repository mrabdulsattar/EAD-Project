import api from './api';

export const bookingService = {
  // Get all bookings (user's bookings if not admin)
  getAllBookings: async (page = 1, limit = 10) => {
    const response = await api.get(`/bookings?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get booking by ID
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Update booking (full update)
  updateBooking: async (id, bookingData) => {
    const response = await api.put(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Partial update booking
  patchBooking: async (id, bookingData) => {
    const response = await api.patch(`/bookings/${id}`, bookingData);
    return response.data;
  },

  // Delete booking
  deleteBooking: async (id) => {
    const response = await api.delete(`/bookings/${id}`);
    return response.data;
  },
};

export default bookingService;
