import React from 'react';
import { Link } from 'react-router-dom';
import { FaUniversity, FaSearch, FaBell, FaEnvelope, FaUser } from 'react-icons/fa';

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <FaUniversity className="text-blue-600 text-2xl" />
          <span className="text-xl font-bold text-blue-600">UniHUB</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/discover" className="text-gray-700 hover:text-blue-600">Discover</Link>
          <Link to="/messages" className="text-gray-700 hover:text-blue-600">Messages</Link>
          <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
          <Link to="/interests" className="text-gray-700 hover:text-blue-600">Interests</Link>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-blue-600">
            <FaSearch className="text-lg" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600">
            <FaBell className="text-lg" />
          </button>
          <button className="p-2 text-gray-500 hover:text-blue-600">
            <FaEnvelope className="text-lg" />
          </button>
          <Link to="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;