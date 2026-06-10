import api from './api';

export const adminGetAllHotels = async () => {
  const res = await api.get('/hotels');
  return res;
};

export const adminCreateHotel = async (data) => {
  const res = await api.post('/hotels', data);
  return res;
};

export const adminUpdateHotel = async (id, data) => {
  const res = await api.put(`/hotels/${id}`, data);
  return res;
};

export const adminDeleteHotel = async (id) => {
  const res = await api.delete(`/hotels/${id}`);
  return res;
};

export const adminGetHotelById = async (id) => {
  const res = await api.get(`/hotels/${id}`);
  return res;
};

// BUG FIX: CreateHotel.jsx and HotelForm.jsx import adminHotelService as a default
// and call adminHotelService.getHotels(), adminHotelService.getHotel(id),
// adminHotelService.createHotel(), adminHotelService.updateHotel() — none of which
// existed. Fix: add a default export object with all needed methods.
const adminHotelService = {
  getHotels: adminGetAllHotels,
  getHotel: adminGetHotelById,
  createHotel: adminCreateHotel,
  updateHotel: adminUpdateHotel,
  deleteHotel: adminDeleteHotel,
};

export default adminHotelService;
