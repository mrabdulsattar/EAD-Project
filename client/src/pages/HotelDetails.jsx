// BUG FIX: HotelDetails.jsx contained HotelForm code (create/edit hotel admin form)
// instead of the actual hotel details page for users. This caused the /hotels/:id
// route to render an admin form instead of hotel info, and also broke the
// /admin/hotels/create and /admin/hotels/edit/:id routes because App.jsx imports
// { CreateHotel, EditHotel } from './pages/HotelForm' which was also a duplicate.
// Fix: restore HotelDetails.jsx to a proper hotel detail page for users.

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getHotelById } from '../services/hotelService';
import { useAuth } from '../context/AuthContext';
import { useHotels } from '../context/HotelContext';
import { useToast } from '../context/ToastContext';
import api from '../services/api';
import { getHotelDetailImage, handleHotelImageError } from '../utils/hotelImages';

const StarRating = ({ rating = 0 }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        className={`w-5 h-5 ${s <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
    <span className="text-sm text-gray-500 ml-1">{rating?.toFixed(1)}</span>
  </div>
);

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useHotels();
  const { showToast } = useToast();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Booking state
  const [bookingForm, setBookingForm] = useState({
    checkIn: '',
    checkOut: '',
    persons: 1,
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setLoading(true);
    getHotelById(id)
      .then((res) => setHotel(res.data?.data))
      .catch(() => setError('Hotel not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    if (!bookingForm.checkIn || !bookingForm.checkOut) {
      showToast('Please select check-in and check-out dates', 'warning');
      return;
    }
    if (bookingForm.checkOut <= bookingForm.checkIn) {
      showToast('Check-out must be after check-in', 'error');
      return;
    }
    setBookingLoading(true);
    try {
      const bookNights = Math.max(
        1,
        Math.round(
          (new Date(bookingForm.checkOut) - new Date(bookingForm.checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      );
      const totalPrice = hotel.pricePerNight * bookNights;
      await api.post('/bookings', {
        hotel: id,
        checkIn: bookingForm.checkIn,
        checkOut: bookingForm.checkOut,
        guests: bookingForm.persons,
        totalPrice,
      });
      showToast('Booking confirmed! Check your dashboard.', 'success');
      setBookingForm({ checkIn: '', checkOut: '', persons: 1 });
    } catch (err) {
      const msg = err.response?.data?.message || 'Booking failed. Please try again.';
      showToast(msg, 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <p className="text-gray-500 mb-4">{error || 'Hotel not found'}</p>
        <Link to="/search" className="text-sm text-gray-900 underline">Browse all hotels</Link>
      </div>
    );
  }

  const heroImage = getHotelDetailImage(hotel);
  const images = hotel.images?.length > 1 ? hotel.images : [heroImage];
  const favorited = isFavorite(hotel._id);

  // Calculate nights
  const nights =
    bookingForm.checkIn && bookingForm.checkOut
      ? Math.max(
          0,
          Math.round(
            (new Date(bookingForm.checkOut) - new Date(bookingForm.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-500 hover:text-gray-900 mb-6 flex items-center gap-1 transition-colors"
      >
        ← Back
      </button>

      {/* Hero image */}
      <div className="relative rounded-2xl overflow-hidden mb-8 h-72 sm:h-96 bg-gray-100">
        <img
          src={images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
          onError={(e) => handleHotelImageError(e, hotel)}
        />
        <button
          onClick={() => toggleFavorite(hotel)}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform"
        >
          <svg
            className={`w-5 h-5 ${favorited ? 'text-red-500 fill-red-500' : 'text-gray-400 fill-none'}`}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Extra images */}
      {images.length > 1 && (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {images.slice(1, 4).map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden h-28 bg-gray-100">
              <img src={img} alt="" className="w-full h-full object-cover" onError={(e) => handleHotelImageError(e, hotel)} />
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Hotel Info */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">{hotel.name}</h1>
            <p className="text-gray-500">{hotel.location || hotel.address}</p>
            {hotel.country && <p className="text-sm text-gray-400">{hotel.country}</p>}
          </div>

          <div className="flex items-center gap-4">
            <StarRating rating={hotel.rating} />
            <span className="text-sm text-gray-400">
              {hotel.reviews || hotel.numReviews || 0} reviews
            </span>
          </div>

          {hotel.description && (
            <div>
              <h2 className="font-semibold text-gray-900 mb-2">About</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{hotel.description}</p>
            </div>
          )}

          {/* Amenities / Facilities */}
          {(hotel.amenities?.length > 0 || hotel.facilities?.length > 0) && (
            <div>
              <h2 className="font-semibold text-gray-900 mb-3">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {(hotel.amenities || hotel.facilities || []).map((a) => (
                  <span
                    key={a}
                    className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-lg font-medium"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Booking Card */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-2xl p-6 sticky top-24">
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-2xl font-bold text-gray-900">
                ${hotel.pricePerNight}
              </span>
              <span className="text-sm text-gray-400">/night</span>
            </div>

            <form onSubmit={handleBook} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Check-in</label>
                <input
                  type="date"
                  min={today}
                  value={bookingForm.checkIn}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, checkIn: e.target.value, checkOut: '' }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Check-out</label>
                <input
                  type="date"
                  min={bookingForm.checkIn || today}
                  value={bookingForm.checkOut}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, checkOut: e.target.value }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1 font-medium">Guests</label>
                <select
                  value={bookingForm.persons}
                  onChange={(e) =>
                    setBookingForm((p) => ({ ...p, persons: Number(e.target.value) }))
                  }
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-gray-400 transition-colors bg-white"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {nights > 0 && (
                <div className="flex justify-between text-sm text-gray-600 pt-1">
                  <span>${hotel.pricePerNight} × {nights} night{nights > 1 ? 's' : ''}</span>
                  <span className="font-semibold text-gray-900">
                    ${(hotel.pricePerNight * nights).toLocaleString()}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-50 mt-2 flex items-center justify-center"
              >
                {bookingLoading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Booking...
                  </>
                ) : user ? (
                  'Book Now'
                ) : (
                  'Log in to Book'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
