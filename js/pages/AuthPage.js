import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaUser, FaLock, FaUniversity, FaCalendarAlt, FaImage } from 'react-icons/fa';

function AuthPage() {
  const [searchParams] = useSearchParams();
  const authType = searchParams.get('type') || 'login';
  const isLogin = authType === 'login';

  // Form state
  const [formData, setFormData] = useState({
    rollNumber: '',
    fullName: '',
    email: '',
    collegeYear: '',
    collegeName: '',
    password: '',
    confirmPassword: '',
    interests: []
  });

  const [selectedInterests, setSelectedInterests] = useState([]);
  const availableInterests = [
    'Sports', 'Tech', 'Music', 'Art', 'Science', 
    'Literature', 'Gaming', 'Travel', 'Food', 'Photography'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log({
      ...formData,
      interests: selectedInterests
    });
  };

  return (
    <div className="max-w-md mx-auto my-12 bg-white p-8 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {isLogin ? 'Log In to UniHUB' : 'Create Your UniHUB Account'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* College Roll Number (Required for verification) */}
        <div className="space-y-1">
          <label className="flex items-center text-gray-700">
            <FaUniversity className="mr-2" />
            College Roll Number *
          </label>
          <input
            type="text"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your college ID"
            required
          />
        </div>

        {!isLogin && (
          <>
            {/* Full Name */}
            <div className="space-y-1">
              <label className="flex items-center text-gray-700">
                <FaUser className="mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Your full name"
                required
              />
            </div>

            {/* College Year */}
            <div className="space-y-1">
              <label className="flex items-center text-gray-700">
                <FaCalendarAlt className="mr-2" />
                College Year *
              </label>
              <select
                name="collegeYear"
                value={formData.collegeYear}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select your year</option>
                <option value="1">First Year</option>
                <option value="2">Second Year</option>
                <option value="3">Third Year</option>
                <option value="4">Fourth Year</option>
                <option value="5+">Postgrad/Other</option>
              </select>
            </div>

            {/* College Name */}
            <div className="space-y-1">
              <label className="flex items-center text-gray-700">
                <FaUniversity className="mr-2" />
                College Name *
              </label>
              <input
                type="text"
                name="collegeName"
                value={formData.collegeName}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Your college/university"
                required
              />
            </div>

            {/* Interests (Multi-select) */}
            <div className="space-y-2">
              <label className="text-gray-700">Your Interests</label>
              <div className="flex flex-wrap gap-2">
                {availableInterests.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      selectedInterests.includes(interest)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Password */}
        <div className="space-y-1">
          <label className="flex items-center text-gray-700">
            <FaLock className="mr-2" />
            Password *
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Create a password"
            required
          />
        </div>

        {!isLogin && (
          <div className="space-y-1">
            <label className="flex items-center text-gray-700">
              <FaLock className="mr-2" />
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              placeholder="Confirm your password"
              required
            />
          </div>
        )}

        {/* Terms and Conditions */}
        {!isLogin && (
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-blue-600">Terms and Conditions</a>
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {isLogin ? 'Log In' : 'Create Account'}
        </button>

        {/* Switch between login/signup */}
        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <a 
            href={`/auth?type=${isLogin ? 'signup' : 'login'}`} 
            className="text-blue-600"
          >
            {isLogin ? 'Sign up' : 'Log in'}
          </a>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;