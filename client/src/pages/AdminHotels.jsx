import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { useToast } from '../context/ToastContext';
import api from '../services/api';

const AdminHotels = () => {
  const { showToast } = useToast();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchHotels = async () => {
    try {
      setLoading(true);
      const res = await api.get('/hotels');
      setHotels(res.data?.data || []);
    } catch (error) {
      showToast('Failed to load hotels', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (hotelId) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    try {
      await api.delete(`/admin/hotels/${hotelId}`);
      showToast('Hotel deleted successfully', 'success');
      setHotels((prev) => prev.filter((h) => h._id !== hotelId));
    } catch (error) {
      showToast('Failed to delete hotel', 'error');
    }
  };

  const filteredHotels = hotels.filter((h) =>
    h.name.toLowerCase().includes(search.toLowerCase()) ||
    h.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Hotels Management</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all hotels in the system</p>
          </div>
          <Link
            to="/admin/hotels/create"
            className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            + Add Hotel
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400"
          />
        </div>

        {/* Hotels Table */}
        <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Hotel Name</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Location</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Country</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Price/Night</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Rating</th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500 font-semibold">Visitors</th>
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
                ) : filteredHotels.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                      {search ? 'No hotels match your search' : 'No hotels found'}
                    </td>
                  </tr>
                ) : (
                  filteredHotels.map((hotel) => (
                    <tr key={hotel._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">{hotel.name}</td>
                      <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                      <td className="px-6 py-4 text-gray-600">{hotel.country}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900">${hotel.pricePerNight}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-400">★</span>
                          <span className="text-gray-900 font-medium">{Number(hotel.rating).toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{hotel.visitors || 0}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/hotels/edit/${hotel._id}`}
                            className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(hotel._id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
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
      </div>
    </AdminLayout>
  );
};

export default AdminHotels;