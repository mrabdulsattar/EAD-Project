import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const StatCard = ({ label, value, loading, icon = '📊' }) => (
  <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-xs text-gray-400 mb-2 font-medium uppercase tracking-wide">{label}</p>
        {loading ? (
          <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
        ) : (
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        )}
      </div>
      <div className="text-3xl">{icon}</div>
    </div>
  </div>
);

const AdminDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admin/dashboard');
        setStats(res.data?.data);
      } catch (error) {
        showToast('Failed to load dashboard', 'error');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [showToast]);

  const bookingsByStatus = stats?.bookingsByStatus || {};
  const recentBookings = stats?.recentBookings || [];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome to FindStays Admin Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard label="Total Hotels" value={stats?.totalHotels || 0} loading={loading} icon="🏨" />
          <StatCard label="Total Users" value={stats?.totalUsers || 0} loading={loading} icon="👥" />
          <StatCard label="Total Bookings" value={stats?.totalBookings || 0} loading={loading} icon="📅" />
          <StatCard label="Total Revenue" value={`$${(stats?.totalRevenue || 0).toLocaleString()}`} loading={loading} icon="💰" />
        </div>

        {/* Booking Status Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-xs text-yellow-700 font-medium mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-900">{bookingsByStatus.pending || 0}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs text-blue-700 font-medium mb-1">Confirmed</p>
            <p className="text-2xl font-bold text-blue-900">{bookingsByStatus.confirmed || 0}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <p className="text-xs text-green-700 font-medium mb-1">Checked-in</p>
            <p className="text-2xl font-bold text-green-900">{bookingsByStatus['checked-in'] || 0}</p>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
            <p className="text-xs text-purple-700 font-medium mb-1">Completed</p>
            <p className="text-2xl font-bold text-purple-900">{bookingsByStatus.completed || 0}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-xs text-red-700 font-medium mb-1">Rejected</p>
            <p className="text-2xl font-bold text-red-900">{bookingsByStatus.rejected || 0}</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-700 font-medium mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-gray-900">{bookingsByStatus.cancelled || 0}</p>
          </div>
        </div>

        {/* Recent Bookings */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h2>
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
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center">
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                        </div>
                      </td>
                    </tr>
                  ) : recentBookings.length > 0 ? (
                    recentBookings.map((booking) => (
                      <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-gray-900">{booking.user?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-gray-900">{booking.hotel?.name || 'N/A'}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(booking.checkIn).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-gray-600">{new Date(booking.checkOut).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-gray-900 font-semibold">${booking.totalPrice}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                            booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                            booking.status === 'checked-in' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No bookings found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;