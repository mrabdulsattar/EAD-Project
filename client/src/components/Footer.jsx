import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <span className="text-white font-bold text-lg">FindStays</span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Your trusted platform for finding premium hotel stays worldwide.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">f</a>
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition">𝕏</a>
            <a href="#" className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition">📷</a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Explore</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/search" className="hover:text-white transition-colors">Search Hotels</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/favorites" className="hover:text-white transition-colors">Favorites</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Account</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/login" className="hover:text-white transition-colors">Log In</Link></li>
            <li><Link to="/signup" className="hover:text-white transition-colors">Sign Up</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Support</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">Legal</h4>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 pt-8">
        {/* Newsletter */}
        <div className="mb-8 pb-8 border-b border-gray-800">
          <h4 className="text-white text-sm font-semibold mb-4">Subscribe to Our Newsletter</h4>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 outline-none text-sm"
            />
            <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} FindStays. All rights reserved.
          </p>
          <p className="text-sm text-gray-500">
            Made with ❤️ for travelers worldwide
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;