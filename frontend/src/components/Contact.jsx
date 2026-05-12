import Reveal from './Reveal'

const contactInfo = [
  { icon: 'fa-solid fa-phone', label: 'Phone', value: '021 9848 8876' },
  { icon: 'fa-solid fa-envelope', label: 'Email', value: 'Pawcare@clinic.com' },
  { icon: 'fa-solid fa-location-dot', label: 'Address', value: 'Jonggol, Indonesia' },
]

export default function Contact({ onContactSubmit }) {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-16"><p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Reach Out</p><h2 className="font-display text-4xl md:text-5xl text-pri-900">Get in Touch</h2></div></Reveal>
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <Reveal variant="left">
            <div className="bg-gradient-to-br from-pri-700 to-pri-900 rounded-3xl p-9 text-white relative overflow-hidden">
              <i className="fa-solid fa-paw text-pri-600 text-[120px] absolute -bottom-6 -right-6 rotate-12 pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6"><i className="fa-solid fa-headset text-2xl text-pri-200" /></div>
                <h3 className="font-display text-2xl mb-2">Contact a Vet</h3>
                <p className="text-pri-200 text-sm leading-relaxed mb-8">Professional advice to keep your pet healthy and safe. We're always here when you need us.</p>
                <div className="space-y-5">
                  {contactInfo.map(c => (
                    <div key={c.label} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0"><i className={`${c.icon} text-pri-200 text-sm`} /></div>
                      <div><p className="text-xs text-pri-300 font-medium">{c.label}</p><p className="text-sm font-semibold">{c.value}</p></div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-8">
                  {['fa-brands fa-facebook-f', 'fa-brands fa-instagram', 'fa-brands fa-twitter'].map(ic => (
                    <a key={ic} href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors" aria-label={ic}><i className={`${ic} text-sm`} /></a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal variant="right">
            <form onSubmit={onContactSubmit} className="bg-white rounded-3xl p-9 border border-pri-50 shadow-sm space-y-5">
              {[
                { label: 'Your Name', type: 'text', ph: 'John Doe' },
                { label: 'Email Address', type: 'email', ph: 'john@example.com' },
                { label: 'Subject', type: 'text', ph: 'How can we help?' },
              ].map(f => (
                <div key={f.label}>
                  <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">{f.label}</label>
                  <input type={f.type} required placeholder={f.ph} className="w-full px-4 py-3.5 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea rows="4" required placeholder="Tell us about your pet's needs..." className="w-full px-4 py-3.5 rounded-xl border border-pri-100 focus:border-pri-400 focus:ring-2 focus:ring-pri-100 outline-none text-sm transition-all resize-none" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-pri-600 text-white font-semibold rounded-xl hover:bg-pri-700 transition-colors bs shadow-lg shadow-pri-600/20">Send Message <i className="fa-solid fa-paper-plane ml-2 text-sm" /></button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )}
