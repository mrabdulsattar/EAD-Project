import { createContext, useContext, useState, useCallback } from 'react';
import { searchHotels, getAllHotels } from '../services/hotelService';

const HotelContext = createContext(null);

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    location: '',
    country: '',
    checkIn: '',
    checkOut: '',
    persons: 1,
    name: '',
    rating: '',
    price: '',
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem('favorites')) || []; } catch { return []; }
  });

  const fetchHotels = useCallback(async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const hasSearch = params.location || params.country || params.name || params.rating || params.price;
      const res = hasSearch ? await searchHotels(params) : await getAllHotels();
      setHotels(res.data?.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleFavorite = useCallback((hotel) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f._id === hotel._id);
      const next = exists ? prev.filter((f) => f._id !== hotel._id) : [...prev, hotel];
      localStorage.setItem('favorites', JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (id) => favorites.some((f) => f._id === id),
    [favorites]
  );

  return (
    <HotelContext.Provider value={{
      hotels, loading, error, filters, setFilters,
      fetchHotels, favorites, toggleFavorite, isFavorite,
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => useContext(HotelContext);
