import React, { useState } from 'react';
import { FaUserEdit, FaCamera, FaEllipsisH, FaHeart, FaComment, FaShare } from 'react-icons/fa';

function ProfilePage() {
  // Mock user data
  const [user, setUser] = useState({
    name: "Alex Johnson",
    college: "State University",
    year: "Third Year",
    bio: "Computer Science major passionate about AI and web development",
    interests: ["Tech", "Programming", "AI", "Photography"],
    posts: [
      {
        id: 1,
        content: "Just finished my final project for AI class! 🎉 #CS #AI",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
        likes: 24,
        comments: 5,
        date: "2 hours ago"
      },
      {
        id: 2,
        content: "Beautiful day on campus today ☀️",
        image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500",
        likes: 42,
        comments: 8,
        date: "1 day ago"
      }
    ]
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: user.bio,
    interests: [...user.interests]
  });

  const availableInterests = [
    "Sports", "Tech", "Music", "Art", "Science", 
    "Literature", "Gaming", "Travel", "Food", "Photography"
  ];

  const handleEditChange = (e) => {
    setEditData({...editData, [e.target.name]: e.target.value});
  };

  const toggleInterest = (interest) => {
    setEditData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const saveProfile = () => {
    setUser({
      ...user,
      bio: editData.bio,
      interests: editData.interests
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Profile Picture */}
          <div className="relative group">
            <img 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=300" 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />
            <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
              <FaCamera />
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600">{user.college} • {user.year}</p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-sm"
              >
                <FaUserEdit /> {isEditing ? 'Cancel' : 'Edit Profile'}
              </button>
            </div>

            {isEditing ? (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    className="w-full p-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {availableInterests.map(interest => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          editData.interests.includes(interest)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  onClick={saveProfile}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <>
                <p className="mt-2 text-gray-700">{user.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {user.interests.map(interest => (
                    <span key={interest} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {user.posts.map(post => (
            <div key={post.id} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">{post.date}</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FaEllipsisH />
                </button>
              </div>
              <p className="mb-3">{post.content}</p>
              {post.image && (
                <img 
                  src={post.image} 
                  alt="Post" 
                  className="w-full h-auto rounded-lg mb-3"
                />
              )}
              <div className="flex justify-between text-gray-500">
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <FaHeart /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-blue-600">
                    <FaComment /> {post.comments}
                  </button>
                </div>
                <button className="hover:text-blue-600">
                  <FaShare />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;