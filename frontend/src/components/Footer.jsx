const serviceLinks = ['Health Check-ups', 'Quick Care', 'Vaccination', 'Grooming']
const socialLinks = [
  { icon: 'fa-brands fa-facebook-f', label: 'Facebook' },
  { icon: 'fa-brands fa-instagram', label: 'Instagram' },
  { icon: 'fa-brands fa-twitter', label: 'Twitter' },
  { icon: 'fa-brands fa-youtube', label: 'YouTube' },
]
const companyLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Our Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-pri-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pri-700/50">
          <div>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-pri-600 rounded-xl flex items-center justify-center"><i className="fa-solid fa-paw text-white text-lg" /></div>
              <span className="font-display text-xl">PawCare</span>
            </div>
            <p className="text-pri-300 text-sm leading-relaxed mb-5">Keeping your pets healthy, happy, and loved every day. Your trusted partner in veterinary care.</p>
            <p className="text-pri-400 text-sm"><i className="fa-solid fa-envelope mr-2 text-pri-500" />Pawcare@clinic.com</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-5 tracking-wider uppercase text-pri-300">Services</h4>
            <ul className="space-y-3">{serviceLinks.map(s => <li key={s}><a href="#services" className="text-pri-400 text-sm hover:text-white transition-colors">{s}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-5 tracking-wider uppercase text-pri-300">Follow Us</h4>
            <ul className="space-y-3">{socialLinks.map(s => <li key={s.label}><a href="#" className="text-pri-400 text-sm hover:text-white transition-colors"><i className={`${s.icon} mr-2 w-4 text-center`} />{s.label}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-5 tracking-wider uppercase text-pri-300">Company</h4>
            <ul className="space-y-3">{companyLinks.map(s => <li key={s.label}><a href={s.href} className="text-pri-400 text-sm hover:text-white transition-colors">{s.label}</a></li>)}</ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-pri-500 text-xs">&copy; 2025 PawCare Clinic. All rights reserved.</p>
          <p className="text-pri-600 text-xs">Designed with <i className="fa-solid fa-heart text-acc-400 mx-1" /> for pets everywhere</p>
        </div>
      </div>
    </footer>
  )
}
