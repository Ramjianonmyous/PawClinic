import React, { useState } from 'react';
import axios from 'axios';

export default function SettingsModal({ user, token, onClose, addToast, onUpdateUser }) {
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
      onUpdateUser(res.data); // Update user in App state
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
      addToast('Password reset successfully!', 'success');
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

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email: user.email });
      addToast(res.data.msg, 'success');
    } catch (error) {
      console.error('Error in forgot password:', error);
      addToast('Failed to trigger forgot password.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-8 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl text-pri-900">User Settings</h2>
        </div>
        
        {/* Profile Details Form */}
        <form onSubmit={handleUpdateDetails} className="space-y-4 mb-8">
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

        {/* Password Change Form */}
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
          <div className="text-center mt-2">
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-pri-600 hover:text-pri-700 font-medium"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
