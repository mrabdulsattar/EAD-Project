import api from './api';

export const adminGetAllUsers = async (params = {}) => {
  const res = await api.get('/admin/users', { params });
  return res;
};

export const adminGetAllBookings = async (params = {}) => {
  const res = await api.get('/admin/bookings', { params });
  return res;
};

export const adminUpdateBookingStatus = async (id, status) => {
  const res = await api.patch(`/admin/bookings/${id}`, { status });
  return res;
};

export const adminDeleteBooking = async (id) => {
  const res = await api.delete(`/admin/bookings/${id}`);
  return res;
};

export const adminGetStats = async () => {
  // backend exposes dashboard summary at /admin/dashboard
  const res = await api.get('/admin/dashboard');
  return res;
};

// Default export for legacy files that use: import adminService from './adminService'
const adminService = {
  getBookings: adminGetAllBookings,
  updateBookingStatus: adminUpdateBookingStatus,
  deleteBooking: adminDeleteBooking,
  getStats: adminGetStats,
  getAllUsers: adminGetAllUsers,
};

export default adminService;
