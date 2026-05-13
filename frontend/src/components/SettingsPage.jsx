import React, { useState } from 'react';
import axios from 'axios';

export default function SettingsPage({ user, token, addToast, onUpdateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`${API_URL}/api/auth/update`, { name, email }, {
        headers: { 'x-auth-token': token }
      });
      addToast('Profile updated successfully!', 'success');
      onUpdateUser(res.data);
    } catch (error) {
      console.error('Error updating profile:', error);
      addToast(error.response?.data?.msg || 'Failed to update profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast('New passwords do not match!', 'warning');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`${API_URL}/api/auth/reset-password`, { currentPassword, newPassword }, {
        headers: { 'x-auth-token': token }
      });
      addToast('Password changed successfully!', 'success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Error resetting password:', error);
      addToast(error.response?.data?.msg || 'Failed to reset password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl w-full max-w-3xl p-8 mx-auto shadow-sm">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Details Form */}
        <form onSubmit={handleUpdateDetails} className="space-y-4">
          <h3 className="font-semibold text-slate-800 mb-2 border-b pb-2">Profile Details</h3>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-pri-500 focus:ring-1 focus:ring-pri-500 outline-none" 
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 block mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 focus:border-pri-500 focus:ring-1 focus:ring-pri-500 outline-none" 
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-3 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            Update Details
          </button>
        </form>

          /* Password Change Form */
          <form onSubmit={handleResetPassword} className="space-y-4">
            <h3 className="font-semibold text-slate-800 mb-2 border-b pb-2">Change Password</h3>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Current Password</label>
              <input 
                type="password" 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-pri-500 focus:ring-1 focus:ring-pri-500 outline-none" 
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">New Password</label>
              <input 
                type="password" 
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-pri-500 focus:ring-1 focus:ring-pri-500 outline-none" 
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 block mb-1">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 focus:border-pri-500 focus:ring-1 focus:ring-pri-500 outline-none" 
                required
              />
            </div>
            <button 
              type="submit" 
              className={`w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-900 transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              Change Password
            </button>
          </form>
      </div>
    </div>
  );
}
