import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const AdminBookings = () => {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [statusFilter, setStatusFilter] = useState('');

  const STATUSES = ['pending', 'confirmed', 'rejected', 'checked-in', 'completed', 'cancelled'];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    rejected: 'bg-red-100 text-red-800',
    'checked-in': 'bg-purple-100 text-purple-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800',
  };

  const fetchBookings = async (pageNum = 1) => {
    try {
      setLoading(true);
      const params = { page: pageNum, limit: 10 };
      if (statusFilter) params.status = statusFilter;
      
      const res = await api.get('/admin/bookings', { params });
      setBookings(res.data?.data || []);
      setPagination(res.data?.pagination || {});
      setPage(pageNum);
    } catch (error) {
      showToast('Failed to load bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(1);
  }, [statusFilter]);

  const updateStatus = async (bookingId, newStatus) => {
    try {
      await api.patch(`/admin/bookings/${bookingId}`, { status: newStatus });
      showToast('Booking status updated', 'success');
      fetchBookings(page);
    } catch (error) {
      showToast('Failed to update booking', 'error');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      await api.delete(`/admin/bookings/${bookingId}`);
      showToast('Booking deleted', 'success');
      fetchBookings(page);
    } catch (error) {
      showToast('Failed to delete booking', 'error');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all hotel bookings and update their status</p>
        </div>

        {/* Filter */}
        <div className="flex gap-2 items-center">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          >
            <option value="">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Guest</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Hotel</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Check-in</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Check-out</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Price</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Status</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                      </div>
                    </td>
                  </tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{booking.user?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600">{booking.hotel?.name || 'N/A'}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(booking.checkOut).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">${booking.totalPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[booking.status] || 'bg-gray-100'}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={booking.status}
                            onChange={(e) => updateStatus(booking._id, e.target.value)}
                            className="border border-gray-200 rounded px-2 py-1 text-xs focus:outline-none"
                          >
                            {STATUSES.map((s) => (
                              <option key={s} value={s}>
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => deleteBooking(booking._id)}
                            className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => fetchBookings(p)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === p
                    ? 'bg-gray-900 text-white'
                    : 'border border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminBookings;