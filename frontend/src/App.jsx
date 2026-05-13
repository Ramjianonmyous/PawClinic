import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AIFeatures from './components/AIFeatures'
import Footer from './components/Footer'
import Modal from './components/Modal'
import ToastContainer from './components/ToastContainer'
import BackToTop from './components/BackToTop'
import Dashboard from './components/Dashboard'
import Auth from './components/Auth'

import SettingsModal from './components/SettingsModal'
import SettingsPage from './components/SettingsPage'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const [toasts, setToasts] = useState([])
  const [appointments, setAppointments] = useState([])
  const [aiQueries, setAiQueries] = useState([])
  const [token, setToken] = useState(localStorage.getItem('token') || '')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
  const [currentPage, setCurrentPage] = useState('home')

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // AI Chatbot State
  const [aiOpen, setAiOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState([
    { role: 'ai', text: 'Hello! I am your PawClinic AI assistant. How can I help you today?' }
  ])
  const [aiInput, setAiInput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const addToast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, type, exiting: false }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 400)
    }, 3500)
  }, [])

  const fetchAppointments = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/appointments`, {
        headers: { 'x-auth-token': token }
      });
      setAppointments(res.data);
    } catch (err) {
      console.error("Failed to fetch appointments");
    }
  };

  const fetchAiQueries = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_URL}/api/ai/history`, {
        headers: { 'x-auth-token': token }
      });
      setAiQueries(res.data);
    } catch (err) {
      console.error("Failed to fetch AI queries");
    }
  };



  useEffect(() => {
    fetchAppointments();
    fetchAiQueries();
  }, [token]);

  const handleLogin = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    addToast(`Welcome back, ${newUser.name}!`);
  };

  const handleLogout = () => {
    setToken('');
    setUser(null);
    setAppointments([]);
    setAiQueries([]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    addToast('Logged out successfully');
  };

  const handleBook = async (formData) => {
    if (!token) {
      addToast('Please login to book appointments', 'error');
      setAuthOpen(true);
      return;
    }
    setModalOpen(false);
    
    try {
      addToast('Booking appointment...', 'success');
      const res = await axios.post(`${API_URL}/api/appointments`, {
        patientName: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date
      }, {
        headers: { 'x-auth-token': token }
      });
      addToast('Appointment booked successfully!');
      fetchAppointments();
    } catch (error) {
      addToast('Failed to book appointment', 'error');
    }
  }

  const handleDelete = async (id) => {
    try {
      addToast('Deleting appointment...', 'success');
      await axios.delete(`${API_URL}/api/appointments/${id}`, {
        headers: { 'x-auth-token': token }
      });
      addToast('Appointment deleted successfully!');
      fetchAppointments();
    } catch (error) {
      addToast('Failed to delete appointment', 'error');
    }
  };

  const handleContact = (e) => { e.preventDefault(); addToast("Message sent! We'll get back to you soon."); e.target.reset() }

  const sendAiMessage = async () => {
    if (!aiInput.trim()) return;
    
    const userMsg = aiInput;
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setAiInput('');
    setAiLoading(true);

    setTimeout(() => {
      const aiReply = `I understand you are asking about "${userMsg}". As an AI assistant, I recommend consulting one of our professional vets for specific advice. Is there anything else I can help with?`;
      
      setAiMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
      setAiLoading(false);
    }, 1000);
  };

  return (
    <>
      <Navbar onOpenModal={() => setModalOpen(true)} user={user} onLogout={handleLogout} onOpenAuth={() => setAuthOpen(true)} onOpenDashboard={() => setCurrentPage('dashboard')} onOpenSettings={() => setCurrentPage('settings')} onOpenAIFeatures={() => setCurrentPage('ai-features')} />
      {currentPage === 'home' && (
        <Home token={token} addToast={addToast} handleContact={handleContact} onOpenAIFeatures={() => setCurrentPage('ai-features')} />
      )}

      {currentPage === 'dashboard' && (
        <div className="py-24 bg-pri-50/20 min-h-screen mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <button onClick={() => setCurrentPage('home')} className="mb-6 text-pri-600 hover:text-pri-700 flex items-center gap-2 font-medium">
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>
            <div className="text-center mb-16">
              <p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Management</p>
              <h2 className="font-display text-4xl text-pri-900">Your Appointments</h2>
            </div>
            <Dashboard appointments={appointments} onDelete={handleDelete} aiQueries={aiQueries} />
          </div>
        </div>
      )}

      {currentPage === 'settings' && (
        <div className="py-24 bg-pri-50/20 min-h-screen mt-20">
          <div className="max-w-7xl mx-auto px-6">
            <button onClick={() => setCurrentPage('home')} className="mb-6 text-pri-600 hover:text-pri-700 flex items-center gap-2 font-medium">
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl text-pri-900">User Settings</h2>
            </div>
            <SettingsPage user={user} token={token} addToast={addToast} onUpdateUser={handleUpdateUser} />
          </div>
        </div>
      )}

      {currentPage === 'ai-features' && (
        <div className="mt-20">
          <div className="max-w-7xl mx-auto px-6 pt-6">
            <button onClick={() => setCurrentPage('home')} className="text-pri-600 hover:text-pri-700 flex items-center gap-2 font-medium">
              <i className="fa-solid fa-arrow-left"></i> Back to Home
            </button>
          </div>
          <AIFeatures token={token} addToast={addToast} />
        </div>
      )}

      <Footer />
      {modalOpen && <Modal onClose={() => setModalOpen(false)} onSubmit={handleBook} />}
      {authOpen && <Auth onLogin={handleLogin} onClose={() => setAuthOpen(false)} />}
      <ToastContainer toasts={toasts} />
      <BackToTop />

      {/* AI Chatbot Widget */}
      <div className={`ai-widget ${aiOpen ? 'open' : ''}`} style={{
        position: 'fixed', bottom: '80px', right: '24px', zIndex: 100,
        width: aiOpen ? '350px' : '60px', height: aiOpen ? '500px' : '60px',
        background: 'white', border: '1px solid #e5e7eb',
        borderRadius: aiOpen ? '18px' : '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        {!aiOpen ? (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: '#0d9488', color: 'white' }} onClick={() => setAiOpen(true)}>
            <i className="fas fa-comment-dots" style={{ fontSize: '24px' }}></i>
          </div>
        ) : (
          <>
            <div style={{ background: '#0d9488', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fas fa-robot"></i>
                <span style={{ fontWeight: 600 }}>PawClinic AI</span>
              </div>
              <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }} onClick={() => setAiOpen(false)}>
                <i className="fas fa-xmark"></i>
              </button>
            </div>
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {aiMessages.map((msg, idx) => (
                <div key={idx} style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: '12px',
                  fontSize: '13px', lineHeight: '1.4',
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  background: msg.role === 'user' ? '#0d9488' : '#f3f4f6',
                  color: msg.role === 'user' ? 'white' : '#1f2937'
                }}>
                  {msg.text}
                </div>
              ))}
              {aiLoading && (
                <div style={{ alignSelf: 'flex-start', background: '#f3f4f6', padding: '10px 14px', borderRadius: '12px', fontSize: '13px', color: '#6b7280' }}>
                  Thinking...
                </div>
              )}
            </div>
            <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={aiInput} 
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendAiMessage()}
                placeholder="Type a message..." 
                style={{ flex: 1, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '10px', fontSize: '13px', outline: 'none' }}
              />
              <button style={{ background: '#0d9488', color: 'white', padding: '0 14px', borderRadius: '8px' }} onClick={sendAiMessage} disabled={aiLoading}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}
