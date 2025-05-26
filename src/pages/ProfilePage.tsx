import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Shield, Check, X } from 'lucide-react';

const ProfilePage: React.FC = () => {
  const { currentUser } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser);

  const handleSave = () => {
    // Here you would typically make an API call to update the user
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-all duration-300">
        <div className="px-4 py-5 sm:px-6 bg-gray-50 dark:bg-gray-700">
          <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
            User Information
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
            Personal details and account settings
          </p>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700">
          <dl>
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-colors">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <User className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" />
                Full name
              </dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser?.name}
                    onChange={(e) => setEditedUser({ ...editedUser!, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-white">{currentUser.name}</span>
                )}
              </dd>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-750 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-colors">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" />
                Email address
              </dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser?.email}
                    onChange={(e) => setEditedUser({ ...editedUser!, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-white">{currentUser.email}</span>
                )}
              </dd>
            </div>
            
            <div className="bg-white dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-colors">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" />
                Role
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 capitalize">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  currentUser.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                }`}>
                  {currentUser.role}
                </span>
              </dd>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-750 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-colors">
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 flex items-center">
                Theme
              </dt>
              <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">
                <select
                  value={theme}
                  onChange={() => toggleTheme()}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              <Check className="h-4 w-4 mr-2" />
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-650 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;