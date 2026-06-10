import api from './api';

export const getAllHotels = async (params = {}) => {
  const res = await api.get('/hotels', { params });
  return res;
};

export const getHotelById = async (id) => {
  const res = await api.get(`/hotels/${id}`);
  return res;
};

export const searchHotels = async (params = {}) => {
  const res = await api.get('/hotels/search', { params });
  return res;
};

export const getCountries = async () => {
  try {
    const res = await api.get('/hotels/countries');
    return res;
  } catch (err) {
    console.error('Error fetching countries:', err);
    return { data: { success: false, data: [] } };
  }
};