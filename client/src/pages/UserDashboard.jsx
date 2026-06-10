import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    api.get('/bookings').then(res => setBookings(res.data?.data || [])).catch(() => {}).finally(() => setLoading(false));
  }, [user, navigate]);

  const statusColor = {
    pending: 'bg-amber-50 text-amber-700',
    confirmed: 'bg-green-50 text-green-700',
    cancelled: 'bg-red-50 text-red-600',
    completed: 'bg-gray-100 text-gray-600',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Log out
        </button>
      </div>

      {/* Bookings */}
      <h2 className="font-semibold text-gray-900 mb-4">My Bookings</h2>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />)}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🛎️</div>
          <p className="text-gray-500">No bookings yet</p>
          <button onClick={() => navigate('/search')} className="mt-4 text-sm text-gray-900 underline">Browse hotels</button>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div key={b._id} className="border border-gray-100 rounded-xl p-4 flex items-center justify-between hover:border-gray-200 transition-colors">
              <div>
                <p className="font-medium text-gray-900 text-sm">{b.hotel?.name || 'Hotel'}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {b.checkIn ? new Date(b.checkIn).toLocaleDateString() : '—'} →{' '}
                  {b.checkOut ? new Date(b.checkOut).toLocaleDateString() : '—'}
                </p>
                <p className="text-xs text-gray-400">{b.guests} guest{b.guests > 1 ? 's' : ''}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${statusColor[b.status] || 'bg-gray-100 text-gray-600'}`}>
                {b.status || 'pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;