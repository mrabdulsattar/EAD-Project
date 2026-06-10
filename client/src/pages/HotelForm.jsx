// BUG FIX: App.jsx does: import { CreateHotel, EditHotel } from './pages/HotelForm'
// But HotelForm.jsx only exported a default function named EditHotel (no named exports).
// CreateHotel.jsx existed as a separate file but used adminHotelService.getHotels()
// which was missing (only named exports existed in adminHotelService).
// Fix: consolidate into one HotelForm.jsx that exports both { CreateHotel, EditHotel }
// as named exports, matching what App.jsx expects, using the correct service calls.

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLayout from '../components/AdminLayout';
import { adminCreateHotel, adminUpdateHotel, adminGetHotelById } from '../services/adminHotelService';

const facilityOptions = [
  'Free WiFi', 'Swimming Pool', 'Gym', 'Restaurant', 'Spa',
  'Parking', 'Room Service', 'Air Conditioning', 'Bar', 'Conference Room',
];

const HotelForm = ({ mode = 'create' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(mode === 'edit');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [form, setForm] = useState({
    name: '',
    country: '',
    location: '',
    address: '',
    image: '',
    description: '',
    rating: 4,
    visitors: 0,
    pricePerNight: 100,
    facilities: [],
    images: '',
    amenities: '',
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
      return;
    }
    if (mode === 'edit' && id) {
      setFetchLoading(true);
      adminGetHotelById(id)
        .then((res) => {
          const h = res.data?.data;
          setForm({
            name: h.name || '',
            country: h.country || '',
            location: h.location || '',
            address: h.address || '',
            image: h.image || '',
            description: h.description || '',
            rating: h.rating || 4,
            visitors: h.visitors || h.numReviews || 0,
            pricePerNight: h.pricePerNight || 100,
            facilities: h.facilities || [],
            images: h.images?.join(', ') || '',
            amenities: h.amenities?.join(', ') || '',
          });
        })
        .catch(() => setError('Failed to load hotel'))
        .finally(() => setFetchLoading(false));
    }
  }, [mode, id, user, isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleFacilityToggle = (facility) => {
    setForm((prev) => ({
      ...prev,
      facilities: prev.facilities.includes(facility)
        ? prev.facilities.filter((f) => f !== facility)
        : [...prev.facilities, facility],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim()) { setError('Hotel name is required'); return; }
    if (!form.country.trim()) { setError('Country is required'); return; }
    if (!form.location.trim()) { setError('Location is required'); return; }
    if (!form.description.trim()) { setError('Description is required'); return; }
    if (form.pricePerNight <= 0) { setError('Price per night must be greater than 0'); return; }

    const payload = {
      ...form,
      address: form.address.trim() || form.location.trim(),
      description: form.description.trim(),
      pricePerNight: Number(form.pricePerNight),
      rating: Number(form.rating),
      images: form.images ? form.images.split(',').map((s) => s.trim()).filter(Boolean) : [],
      amenities: form.amenities ? form.amenities.split(',').map((s) => s.trim()).filter(Boolean) : [],
    };

    try {
      setLoading(true);
      if (mode === 'edit') {
        await adminUpdateHotel(id, payload);
        setSuccess('Hotel updated successfully!');
      } else {
        await adminCreateHotel(payload);
        setSuccess('Hotel created successfully!');
      }
      setTimeout(() => navigate('/admin/hotels'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save hotel');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-20">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/admin/hotels')}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back
          </button>
          <h1 className="text-xl font-bold text-gray-900">
            {mode === 'edit' ? 'Edit Hotel' : 'Add Hotel'}
          </h1>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">{error}</div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
          {/* Name + Country */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Hotel Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Grand Palace Hotel"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Country *</label>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Indonesia"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Location / City *</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="South Jakarta"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Jl. Blissful No. 1"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="A luxurious stay in the heart of the city..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors resize-none"
            />
          </div>

          {/* Price + Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Price per night ($) *</label>
              <input
                type="number"
                name="pricePerNight"
                value={form.pricePerNight}
                onChange={handleChange}
                min="1"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Rating (1–5)</label>
              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                min="1"
                max="5"
                step="0.1"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
              />
            </div>
          </div>

          {/* Image URL (single) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Main Image URL</label>
            <input
              type="url"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Extra images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Additional Image URLs (comma-separated)</label>
            <input
              type="text"
              name="images"
              value={form.images}
              onChange={handleChange}
              placeholder="https://img1.jpg, https://img2.jpg"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Extra Amenities (comma-separated)</label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
              placeholder="Ocean view, Butler service"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Facilities checkboxes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Facilities</label>
            <div className="grid grid-cols-2 gap-2">
              {facilityOptions.map((facility) => (
                <label key={facility} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.facilities.includes(facility)}
                    onChange={() => handleFacilityToggle(facility)}
                    className="rounded border-gray-300 text-gray-900"
                  />
                  <span className="text-sm text-gray-700">{facility}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Visitors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Visitors</label>
            <input
              type="number"
              name="visitors"
              value={form.visitors}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-gray-400 transition-colors"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/admin/hotels')}
              className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {loading
                ? 'Saving...'
                : mode === 'edit'
                ? 'Update Hotel'
                : 'Create Hotel'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

// Named exports as expected by App.jsx
export const CreateHotel = () => <HotelForm mode="create" />;
export const EditHotel = () => <HotelForm mode="edit" />;

export default HotelForm;
