const About = () => {
  const stats = [
    { number: '100+', label: 'Premium Hotels' },
    { number: '50+', label: 'Countries' },
    { number: '50K+', label: 'Happy Guests' },
    { number: '24/7', label: 'Customer Support' },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We carefully curate every hotel to ensure premium standards and exceptional experiences.',
      icon: '⭐',
    },
    {
      title: 'Transparent Pricing',
      description: 'No hidden fees. What you see is what you pay. Simple and honest pricing always.',
      icon: '💰',
    },
    {
      title: 'Global Reach',
      description: 'From bustling cities to serene beaches, find the perfect stay anywhere in the world.',
      icon: '🌍',
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We\'re here 24/7 to help with any questions.',
      icon: '👥',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About FindStays</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your trusted partner in finding extraordinary hotel experiences around the world. Since 2024, we've been connecting travelers with their perfect stays.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              FindStays was founded with a simple mission: to make hotel booking effortless and enjoyable for everyone.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              We believe that finding the perfect hotel shouldn't be complicated. That's why we've created a platform that brings together the best premium hotels from around the world, with transparent pricing and honest reviews.
            </p>
            <p className="text-lg text-gray-600">
              Today, we're proud to serve thousands of travelers who trust us to help them find their next great adventure.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl h-96 flex items-center justify-center text-white text-6xl">
            🏨
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Meet Our Team</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We're a passionate team of travel enthusiasts dedicated to making your hotel booking experience exceptional.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Sarah Chen', 'Michael Rodriguez', 'Emma Thompson'].map((name, idx) => (
            <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-48 flex items-center justify-center text-white text-5xl">
                👤
              </div>
              <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
                <p className="text-gray-600 text-sm mb-4">Travel Experience Expert</p>
                <p className="text-gray-600 text-sm">Dedicated to bringing you the best hotel experiences worldwide.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Find Your Perfect Stay?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our collection of premium hotels and book with confidence.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/search"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Exploring
            </a>
            <a
              href="/contact"
              className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
