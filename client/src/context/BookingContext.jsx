import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyBookings = async () => {
    setLoading(true);
    try {
      const res = await api.get('/bookings');
      setBookings(res.data?.data || []);
      return res.data?.data || [];
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (hotelId, checkIn, checkOut, guests, totalPrice) => {
    try {
      const res = await api.post('/bookings', {
        hotel: hotelId,
        checkIn,
        checkOut,
        guests,
        totalPrice,
      });
      return res.data?.data;
    } catch (err) {
      throw err;
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      await api.patch(`/bookings/${bookingId}`, { status: 'cancelled' });
      setBookings((prev) => prev.map((b) => b._id === bookingId ? { ...b, status: 'cancelled' } : b));
    } catch (err) {
      throw err;
    }
  };

  return (
    <BookingContext.Provider value={{ bookings, loading, fetchMyBookings, createBooking, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
