import { useState } from 'react'
import useScrollNav from '../hooks/useScrollNav'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ onOpenModal, user, onLogout, onOpenAuth }) {
  const { scrolled } = useScrollNav()
  const [menuOpen, setMenuOpen] = useState(false)
  const close = () => setMenuOpen(false)

  return (
    <nav id="nav" className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-s' : ''}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 bg-pri-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-solid fa-paw text-white text-lg" />
          </div>
          <span className="font-display text-xl text-pri-900">PawCare</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-medium text-slate-500 hover:text-pri-600 transition-colors">{l.label}</a>)}
          {user && <a href="#dashboard" className="text-sm font-medium text-slate-500 hover:text-pri-600 transition-colors">Dashboard</a>}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <button onClick={onOpenModal} className="px-5 py-2.5 bg-pri-600 text-white text-sm font-semibold rounded-full hover:bg-pri-700 transition-colors bs">Book Now</button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-700">Hi, {user.name}</span>
              <button onClick={onLogout} className="px-5 py-2.5 border-2 border-pri-200 text-pri-700 text-sm font-semibold rounded-full hover:border-pri-600 hover:bg-pri-50 transition-all">Logout</button>
            </div>
          ) : (
            <button onClick={onOpenAuth} className="px-5 py-2.5 border-2 border-pri-200 text-pri-700 text-sm font-semibold rounded-full hover:border-pri-600 hover:bg-pri-50 transition-all">Login</button>
          )}
        </div>
        <button className="md:hidden w-10 h-10 flex items-center justify-center text-pri-800" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`} />
        </button>
      </div>
      <div className={`md:hidden ${menuOpen ? 'flex' : 'hidden'} bg-white/95 backdrop-blur-lg border-t border-pri-50`}>
        <div className="px-6 py-5 flex flex-col gap-4">
          {links.map(l => <a key={l.href} href={l.href} className="text-sm font-medium text-slate-600" onClick={close}>{l.label}</a>)}
          {user && <a href="#dashboard" className="text-sm font-medium text-slate-600" onClick={close}>Dashboard</a>}
          <div className="flex gap-3 pt-2">
            <button onClick={() => { onOpenModal(); close() }} className="flex-1 py-2.5 bg-pri-600 text-white text-sm font-semibold rounded-full">Book Now</button>
            {user ? (
              <button onClick={() => { onLogout(); close() }} className="flex-1 py-2.5 border-2 border-pri-200 text-pri-700 text-sm font-semibold rounded-full text-center">Logout</button>
            ) : (
              <button onClick={() => { onOpenAuth(); close() }} className="flex-1 py-2.5 border-2 border-pri-200 text-pri-700 text-sm font-semibold rounded-full text-center">Login</button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
