import Reveal from './Reveal'

const services = [
  { icon: 'fa-solid fa-stethoscope', bg: 'bg-pri-50', ic: 'text-pri-600', title: 'Health Check-ups', desc: 'Comprehensive wellness exams to keep your pet in peak condition' },
  { icon: 'fa-solid fa-bolt', bg: 'bg-acc-400/10', ic: 'text-acc-500', title: 'Quick Care', desc: 'Fast, efficient treatment for minor injuries and urgent concerns' },
  { icon: 'fa-solid fa-syringe', bg: 'bg-emerald-50', ic: 'text-emerald-600', title: 'Vaccination', desc: "Complete vaccination programs tailored to your pet's specific needs" },
  { icon: 'fa-solid fa-scissors', bg: 'bg-rose-50', ic: 'text-rose-500', title: 'Grooming', desc: 'Professional grooming to keep your pet looking and feeling great' },
]

export default function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <i className="fa-solid fa-paw text-pri-50 text-8xl absolute top-0 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-16"><p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">What We Offer</p><h2 className="font-display text-4xl md:text-5xl text-pri-900">Our Services</h2></div></Reveal>
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto sg">
          {services.map((s, i) => (
            <Reveal key={s.title}>
              <div className={`ch bg-white rounded-2xl p-7 text-center border border-pri-50 shadow-sm ${i === 1 ? 'md:col-start-3' : ''} ${i >= 2 ? 'md:row-start-2' : ''} ${i === 3 ? 'md:col-start-3' : ''}`}>
                <div className={`w-16 h-16 ${s.bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}><i className={`${s.icon} ${s.ic} text-2xl`} /></div>
                <h3 className="font-semibold text-pri-800 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
          <Reveal variant="scale" className="flex justify-center md:col-start-2 md:row-start-1 md:row-span-2 pt-4">
            <div className="relative">
              <img src="https://picsum.photos/seed/pawcat-center/400/520.jpg" alt="Cat" className="w-52 lg:w-60 h-64 lg:h-72 object-cover rounded-3xl shadow-xl" />
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-acc-400 rounded-full flex items-center justify-center shadow-lg shadow-acc-400/30"><i className="fa-solid fa-heart text-white text-sm" /></div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-pri-500 rounded-full flex items-center justify-center shadow-lg"><i className="fa-solid fa-paw text-white text-xs" /></div>
            </div>
          </Reveal>
        </div>
        <div className="md:hidden space-y-4 sg">
          {services.map(s => (
            <Reveal key={s.title}>
              <div className="ch bg-white rounded-2xl p-5 flex items-center gap-4 border border-pri-50">
                <div className={`w-14 h-14 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}><i className={`${s.icon} ${s.ic} text-xl`} /></div>
                <div><h3 className="font-semibold text-pri-800 text-sm">{s.title}</h3><p className="text-xs text-slate-400 mt-0.5">{s.desc}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
