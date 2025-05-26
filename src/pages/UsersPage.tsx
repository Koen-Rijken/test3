import React, { useState } from 'react';
import { users } from '../data/users';
import { Check, Edit, Lock, Unlock, Trash2, UserPlus, X, UserCheck, UserX } from 'lucide-react';

interface EditableUser extends User {
  isEditing?: boolean;
  isLocked?: boolean;
  isEnrolled?: boolean;
}

const UsersPage: React.FC = () => {
  const [editableUsers, setEditableUsers] = useState<EditableUser[]>(
    users.map(user => ({ ...user, isEditing: false, isLocked: false, isEnrolled: false }))
  );

  const handleEnrolToggle = (userId: string) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isEnrolled: !user.isEnrolled } : user
      )
    );
  };

  const handleLockToggle = (userId: string) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isLocked: !user.isLocked } : user
      )
    );
  };

  const handleEdit = (userId: string) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isEditing: true } : user
      )
    );
  };

  const handleSave = (userId: string) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isEditing: false } : user
      )
    );
  };

  const handleCancel = (userId: string) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId
          ? { ...users.find(u => u.id === userId)!, isEditing: false }
          : user
      )
    );
  };

  const handleChange = (
    userId: string,
    field: keyof User,
    value: string
  ) => {
    setEditableUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, [field]: value } : user
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Users</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-lg transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {editableUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isEditing ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange(user.id, 'name', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isEditing ? (
                      <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleChange(user.id, 'email', e.target.value)}
                        className="w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-500 dark:text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="text-sm text-gray-500 dark:text-gray-300">
                        {user.email}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.isEditing ? (
                      <select
                        value={user.role}
                        onChange={(e) => handleChange(user.id, 'role', e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="user">user</option>
                        <option value="admin">admin</option>
                      </select>
                    ) : (
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {user.isEditing ? (
                      <>
                        <button
                          onClick={() => handleSave(user.id)}
                          className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-2 transition-colors"
                        >
                          <Check className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleCancel(user.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 mr-4 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEdit(user.id)}
                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEnrolToggle(user.id)}
                      className={`${
                        user.isEnrolled
                          ? 'text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300'
                          : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300'
                      } mr-4 transition-colors`}
                      title={user.isEnrolled ? 'Unenrol User' : 'Enrol User'}
                    >
                      {user.isEnrolled ? (
                        <UserCheck className="h-4 w-4" />
                      ) : (
                        <UserX className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleLockToggle(user.id)}
                      className={`${
                        user.isLocked
                          ? 'text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 dark:hover:text-yellow-300'
                          : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                      } mr-4 transition-colors`}
                    >
                      {user.isLocked ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Unlock className="h-4 w-4" />
                      )}
                    </button>
                    <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;