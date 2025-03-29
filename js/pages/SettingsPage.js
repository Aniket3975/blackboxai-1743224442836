import React, { useState } from 'react';
import { FaUserShield, FaBell, FaLock, FaSignOutAlt } from 'react-icons/fa';

function SettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    emailNotifications: true,
    pushNotifications: true,
    darkMode: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle settings save
    console.log("Settings saved:", settings);
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Profile Settings */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaUserShield className="mr-2 text-blue-600" />
            Profile Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Visibility
              </label>
              <select
                name="profileVisibility"
                value={settings.profileVisibility}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="public">Public</option>
                <option value="friends">Friends Only</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaBell className="mr-2 text-blue-600" />
            Notification Settings
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Email Notifications</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={settings.emailNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="text-gray-700">Push Notifications</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={settings.pushNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <FaLock className="mr-2 text-blue-600" />
            Privacy & Security
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={settings.currentPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter current password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Enter new password"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
                placeholder="Confirm new password"
              />
            </div>
            
            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Update Password
            </button>
          </form>
        </div>

        {/* Account Actions */}
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Account Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left text-red-600 hover:text-red-800 flex items-center">
              <FaSignOutAlt className="mr-2" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsPage;