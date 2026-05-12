import { useEffect, useState } from 'react'

export default function Modal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    date: ''
  })

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const h = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', h)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', h) }
  }, [onClose])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(19,78,74,.4)', backdropFilter: 'blur(6px)' }} onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="m-in bg-white rounded-3xl p-8 w-full max-w-md relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-pri-50 flex items-center justify-center text-pri-600 hover:bg-pri-100 transition-colors" aria-label="Close"><i className="fa-solid fa-xmark" /></button>
        <h3 className="font-display text-2xl text-pri-900 mb-1">Book an Appointment</h3>
        <p className="text-sm text-slate-400 mb-6">Fill in the details and we'll confirm your slot.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Your Name" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          <input type="tel" placeholder="Phone Number" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          <input type="email" placeholder="Email Address" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
          <select required value={form.service} onChange={e => setForm({...form, service: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm text-slate-500 transition-all">
            <option value="" disabled>Select Service</option>
            <option>Health Check-up</option>
            <option>Quick Care</option>
            <option>Vaccination</option>
            <option>Grooming</option>
          </select>
          <input type="date" required value={form.date} onChange={e => setForm({...form, date: e.target.value})} className="w-full px-4 py-3 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm text-slate-500 transition-all" />
          <button type="submit" className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs">Confirm Booking</button>
        </form>
      </div>
    </div>
  )
}
