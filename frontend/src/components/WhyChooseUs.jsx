import Reveal from './Reveal'
import Counter from './Counter'
import useInView from '../hooks/useInView'

const stats = [
  { icon: 'fa-solid fa-comments', bg: 'bg-pri-600/50', ic: 'text-pri-200', target: 100, label: 'Client Testimonies' },
  { icon: 'fa-solid fa-calendar-check', bg: 'bg-acc-500/20', ic: 'text-acc-400', target: 4, label: 'Years of Experience' },
  { icon: 'fa-solid fa-user-doctor', bg: 'bg-pri-600/50', ic: 'text-pri-200', target: 20, label: 'Professional Vets' },
  { icon: 'fa-solid fa-face-smile', bg: 'bg-emerald-500/20', ic: 'text-emerald-400', target: 500, label: 'Happy Clients' },
]

function StatCard({ icon, bg, ic, target, label, visible }) {
  return (
    <div className="ch bg-gradient-to-br from-pri-700 to-pri-800 rounded-2xl p-7 text-center border border-pri-600/30">
      <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}><i className={`${icon} ${ic} text-xl`} /></div>
      <p className="font-display text-4xl text-white mb-1 ctr"><Counter target={target} startOn={visible} /></p>
      <p className="text-pri-300 text-sm font-medium">{label}</p>
    </div>
  )
}

export default function WhyChooseUs() {
  const [ref, visible] = useInView()
  return (
    <section className="py-24 bg-pri-900 relative overflow-hidden">
      <i className="fa-solid fa-paw text-pri-800 text-9xl absolute top-[-40px] right-[-30px] rotate-12 pointer-events-none" />
      <i className="fa-solid fa-paw text-pri-800 text-7xl absolute bottom-[-20px] left-10 -rotate-[15deg] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <Reveal><div className="text-center mb-16"><p className="text-pri-300 font-semibold text-sm tracking-[.2em] uppercase mb-3">Our Strengths</p><h2 className="font-display text-4xl md:text-5xl text-white">Why Choose Us</h2></div></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sg">
          {stats.map(s => <Reveal key={s.label}><StatCard {...s} visible={visible} /></Reveal>)}
        </div>
      </div>
    </section>
  )
}
