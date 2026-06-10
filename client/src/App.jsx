import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { HotelProvider } from './context/HotelContext';
import { ToastProvider } from './context/ToastContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import HotelDetails from './pages/HotelDetails';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminDashboard from './pages/AdminDashboard';
import AdminHotels from './pages/AdminHotels';
import AdminBookings from './pages/AdminBookings';
import AdminUsers from './pages/AdminUsers';
import { CreateHotel, EditHotel } from './pages/HotelForm';

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <AuthProvider>
          <BookingProvider>
            <HotelProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
                <Route path="/search" element={<PublicLayout><SearchPage /></PublicLayout>} />
                <Route path="/hotels/:id" element={<PublicLayout><HotelDetails /></PublicLayout>} />
                <Route path="/favorites" element={<PublicLayout><Favorites /></PublicLayout>} />
                <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
                <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
                <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
                <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />

                {/* User Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <PublicLayout><UserDashboard /></PublicLayout>
                    </ProtectedRoute>
                  }
                />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/hotels"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminHotels />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/hotels/create"
                  element={
                    <ProtectedRoute adminOnly>
                      <CreateHotel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/hotels/edit/:id"
                  element={
                    <ProtectedRoute adminOnly>
                      <EditHotel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/bookings"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminBookings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </HotelProvider>
          </BookingProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;