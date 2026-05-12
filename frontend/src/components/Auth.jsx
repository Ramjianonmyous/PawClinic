import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Auth({ onLogin, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const url = isLogin ? `${API_URL}/api/auth/login` : `${API_URL}/api/auth/signup`;
    
    try {
      const res = await axios.post(url, formData);
      onLogin(res.data.token, res.data.user);
      onClose();
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(19,78,74,.4)', backdropFilter: 'blur(6px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="m-in bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pri-50 flex items-center justify-center text-pri-600 hover:bg-pri-100 transition-colors" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
        
        <div className="flex gap-4 mb-6 border-b border-pri-50">
          <button className={`pb-2 px-1 font-semibold text-sm ${isLogin ? 'text-pri-600 border-b-2 border-pri-600' : 'text-slate-400'}`} onClick={() => setIsLogin(true)}>Login</button>
          <button className={`pb-2 px-1 font-semibold text-sm ${!isLogin ? 'text-pri-600 border-b-2 border-pri-600' : 'text-slate-400'}`} onClick={() => setIsLogin(false)}>Sign Up</button>
        </div>

        <h3 className="font-display text-2xl text-pri-900 mb-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
        <p className="text-sm text-slate-400 mb-6">{isLogin ? 'Login to manage your appointments.' : 'Sign up to book and track appointments.'}</p>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          )}
          <input type="email" placeholder="Email Address" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          
          <button type="submit" className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
