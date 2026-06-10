import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Icon = ({ children }) => (
  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    {children}
  </svg>
);

export default function AdminSidebar({ isOpen, onClose }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/admin',
      label: 'Dashboard',
      icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M4 5h7v7H4V5zm9 0h7v4h-7V5zM4 14h7v5H4v-5zm9 3h7v2h-7v-2z" /></Icon>,
    },
    {
      path: '/admin/hotels',
      label: 'Hotels',
      icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M6 21V7l6-4 6 4v14M10 10h4v11h-4V10z" /></Icon>,
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></Icon>,
    },
    {
      path: '/admin/bookings',
      label: 'Bookings',
      icon: <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></Icon>,
    },
  ];

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      className={`fixed md:static inset-y-0 left-0 z-40 w-80 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex flex-col transition-transform duration-300 ease-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      <div className="flex items-center justify-between p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">FindStays</h1>
            <p className="text-xs text-slate-400">Admin Panel</p>
          </div>
        </div>
        <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white transition" aria-label="Close menu">
          <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></Icon>
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map(({ path, label, icon }) => (
          <Link
            key={path}
            to={path}
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive(path)
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
            }`}
          >
            {icon}
            <span className="font-medium text-sm">{label}</span>
            {isActive(path) && <div className="ml-auto w-2 h-2 rounded-full bg-white" />}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-700 p-4 space-y-4">
        <div className="px-2">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Logged in as</p>
          <p className="text-white font-semibold mt-2 text-sm truncate">{user?.name}</p>
          <p className="text-slate-400 text-xs truncate">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all duration-200 font-medium text-sm"
        >
          <Icon><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></Icon>
          Logout
        </button>
      </div>
    </aside>
  );
}
