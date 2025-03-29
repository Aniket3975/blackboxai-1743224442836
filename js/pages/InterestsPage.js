import React, { useState } from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

function InterestsPage() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const availableInterests = [
    "Sports", "Tech", "Music", "Art", "Science", 
    "Literature", "Gaming", "Travel", "Food", "Photography"
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleSave = () => {
    // Save selected interests logic
    console.log("Selected Interests:", selectedInterests);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Select Your Interests</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableInterests.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${
              selectedInterests.includes(interest) 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-800 hover:bg-gray-100'
            }`}
          >
            <span>{interest}</span>
            {selectedInterests.includes(interest) ? (
              <FaCheckCircle />
            ) : (
              <FaCircle />
            )}
          </button>
        ))}
      </div>
      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Save Interests
      </button>
    </div>
  );
}

export default InterestsPage;