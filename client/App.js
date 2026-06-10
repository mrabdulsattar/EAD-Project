import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HotelProvider } from "./context/HotelContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SearchPage from "./pages/SearchPage";
import HotelDetails from "./pages/HotelDetails";
import Favorites from "./pages/Favorites";

export default function App() {
  return (
    <HotelProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/hotel/:id" element={<HotelDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* Fallback */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HotelProvider>
  );
}