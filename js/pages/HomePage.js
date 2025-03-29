import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserFriends, FaComments, FaCalendarAlt, FaBookOpen } from 'react-icons/fa';

function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4 rounded-lg">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Connect with College Students Around the World</h1>
          <p className="text-xl mb-8">Share your moments, chat with friends, and discover people who share your interests.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth?type=signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Sign Up Now
            </Link>
            <Link to="/auth?type=login" className="bg-transparent border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Join UniHUB?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <FaUserFriends size={32} />, title: "Find Friends", desc: "Connect with students from your college" },
            { icon: <FaComments size={32} />, title: "Join Chats", desc: "Participate in group discussions" },
            { icon: <FaCalendarAlt size={32} />, title: "Events", desc: "Discover campus events" },
            { icon: <FaBookOpen size={32} />, title: "Study Groups", desc: "Collaborate on academic projects" }
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-12 px-4 rounded-lg">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Find Like-minded Students from Your College</h2>
          <Link to="/auth?type=signup" className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Join Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;