import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

const AdminLayout = ({ children }) => {
  const { user, isAdmin, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !isAdmin) navigate('/login');
  }, [user, isAdmin, navigate]);

  const links = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Hotels', path: '/admin/hotels' },
    { label: 'Bookings', path: '/admin/bookings' },
    { label: 'Users', path: '/admin/users' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col py-6 px-4 fixed h-full">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-white">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <span className="font-semibold text-sm text-gray-900">Admin Panel</span>
        </Link>

        <nav className="flex-1 space-y-1">
          {links.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                (l.path === '/admin' ? location.pathname === '/admin' : location.pathname.startsWith(l.path))
                  ? 'bg-gray-900 text-white font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 px-3 py-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
          </svg>
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;