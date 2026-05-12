import Reveal from './Reveal'
import Counter from './Counter'
import useInView from '../hooks/useInView'

function AboutCounters({ visible }) {
  return (
    <div className="flex gap-8">
      {[{ t: 20, l: 'Expert Vets' }, { t: 500, l: 'Pets Treated' }, { t: 4, l: 'Years Exp.' }].map((c, i) => (
        <div key={c.l} className="flex items-center gap-0">
          {i > 0 && <div className="w-px h-10 bg-pri-200 mr-8" />}
          <div className="text-center"><p className="font-display text-3xl text-pri-600 ctr"><Counter target={c.t} startOn={visible} /></p><p className="text-xs text-slate-400 mt-1 font-medium">{c.l}</p></div>
        </div>
      ))}
    </div>
  )
}

function CounterWrap() {
  const [ref, visible] = useInView()
  return <div ref={ref}><AboutCounters visible={visible} /></div>
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-pri-50/40 relative overflow-hidden">
      <i className="fa-solid fa-paw text-pri-100 text-7xl absolute top-10 right-16 rotate-[25deg] pointer-events-none" />
      <i className="fa-solid fa-paw text-pri-100 text-5xl absolute bottom-16 left-12 -rotate-[20deg] pointer-events-none" />
      <i className="fa-solid fa-paw text-pri-50 text-9xl absolute -bottom-10 right-1/3 rotate-12 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-16"><p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Who We Are</p><h2 className="font-display text-4xl md:text-5xl text-pri-900">About Clinic</h2></div></Reveal>
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          <Reveal variant="left">
            <div>
              <h3 className="font-display text-2xl text-pri-800 mb-6 leading-snug">Professional veterinary care with a personal touch</h3>
              <p className="text-slate-500 leading-relaxed mb-5">At PawCare Clinic, we believe every pet deserves world-class medical attention delivered with genuine compassion. Our team of experienced veterinarians combines cutting-edge technology with a warm, friendly approach to make every visit comfortable.</p>
              <p className="text-slate-500 leading-relaxed mb-9">From state-of-the-art diagnostic equipment to specially designed recovery spaces, every detail is crafted to ensure the highest standard of care. We treat your pets like family — because that's exactly what they are.</p>
              <CounterWrap />
            </div>
          </Reveal>
          <Reveal variant="right">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-[10px] border-white shadow-2xl shadow-pri-200/40">
                  <img src="https://picsum.photos/seed/vetclinic-room/600/600.jpg" alt="PawCare Clinic Interior" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-pri-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-pri-600/30 whitespace-nowrap"><i className="fa-solid fa-paw mr-2" />Pet Care</div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-acc-400 rounded-2xl flex items-center justify-center shadow-lg shadow-acc-400/30 rotate-12"><i className="fa-solid fa-award text-white text-2xl -rotate-12" /></div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
