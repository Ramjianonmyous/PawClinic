import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function Auth({ onLogin, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState('input'); // 'input', 'verify'
  const [resendTimer, setResendTimer] = useState(0);
  const [generatedOtp, setGeneratedOtp] = useState('');



  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const handleTriggerForgotPassword = () => {
    setError('');
    setIsForgotPassword(true);
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    try {
      const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { identifier: formData.email });
      alert(res.data.msg);
      setResendTimer(60);
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      setError('Please enter your email first.');
      return;
    }
    setError('');
    try {
      // 1. Check if user exists in backend
      await axios.post(`${API_URL}/api/auth/forgot-password`, { identifier: formData.email });
      
      // 2. Generate 6-digit OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      
      // 3. Send Email via EmailJS
      const serviceId = "service_jul90m6";
      const templateId = "template_tqlucu8";
      const publicKey = "077Ao5SU2hbPAQhjU";
      
      const emailData = {
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          to_email: formData.email,
          otp: otpCode,
          app_name: "PawClinic"
        }
      };
      
      await axios.post('https://api.emailjs.com/api/v1.0/email/send', emailData);
      
      alert('OTP sent successfully to your email via EmailJS!');
      setForgotPasswordStep('verify');
      setResendTimer(60);
    } catch (err) {
      setError(err.response?.data?.msg || err.message || 'Failed to send OTP');
    }
  };

  const handleVerifyOtpAndReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (otp !== generatedOtp) {
      setError('Invalid OTP!');
      return;
    }
    setError('');
    try {
      const resReset = await axios.post(`${API_URL}/api/auth/forgot-password-reset`, { identifier: formData.email, newPassword });
      alert(`AI: Password reset successful.`);
      setIsForgotPassword(false);
      setForgotPasswordStep('input');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setGeneratedOtp('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to reset password');
      console.error(err);
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

        {isForgotPassword ? (
          <>
            <h3 className="font-display text-2xl text-pri-900 mb-1">Reset Password</h3>
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {forgotPasswordStep === 'input' ? (
              /* Step 1: Enter Email/Phone and Send OTP */
              <div className="space-y-4">
                <p className="text-sm text-slate-400 mb-6">Enter your email or phone to receive an OTP.</p>
                <input type="text" placeholder="Email or Phone" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                <button type="button" onClick={handleSendOtp} className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs">
                  Send OTP
                </button>
                <div className="text-center mt-2">
                  <button type="button" onClick={() => setIsForgotPassword(false)} className="text-sm text-slate-500 hover:text-slate-600 font-medium">
                    Back to Login
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Enter OTP and New Password */
              <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
                <p className="text-sm text-slate-400 mb-6">Enter the OTP and your new password.</p>
                <input type="text" placeholder="Email or Phone" required value={formData.email} disabled className="w-full px-4 py-3 rounded-xl border border-pri-100 bg-slate-50 text-sm transition-all" />
                <input type="text" placeholder="OTP (Sent by AI)" required value={otp} onChange={e => setOtp(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                <input type="password" placeholder="New Password" required value={newPassword} onChange={e => setNewPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                <input type="password" placeholder="Confirm New Password" required value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                
                <div className="text-right">
                  <button 
                    type="button" 
                    onClick={handleResendOtp} 
                    disabled={resendTimer > 0}
                    className={`text-sm font-medium ${resendTimer > 0 ? 'text-slate-400' : 'text-pri-600 hover:text-pri-700'}`}
                  >
                    {resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>

                <button type="submit" className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs">
                  Reset Password
                </button>
                <div className="text-center mt-2">
                  <button type="button" onClick={() => setForgotPasswordStep('input')} className="text-sm text-slate-500 hover:text-slate-600 font-medium">
                    Back to Send OTP
                  </button>
                </div>
              </form>
            )}
          </>
        ) : (
          <>
            <h3 className="font-display text-2xl text-pri-900 mb-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
            <p className="text-sm text-slate-400 mb-6">{isLogin ? 'Login to manage your appointments.' : 'Sign up to book and track appointments.'}</p>
            
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <input type="text" placeholder="Your Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                  <input type="tel" placeholder="Phone Number" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                </>
              )}
              <input type="text" placeholder="Email or Phone" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
              <input type="password" placeholder="Password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
              
              {isLogin && (
                <div className="text-right">
                  <button type="button" onClick={handleTriggerForgotPassword} className="text-sm text-pri-600 hover:text-pri-700 font-medium">Forgot Password?</button>
                </div>
              )}
              
              <button type="submit" className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs">
                {isLogin ? 'Login' : 'Sign Up'}
              </button>
            </form>
          </>
        )}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
