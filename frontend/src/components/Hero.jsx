import Reveal from './Reveal'
import FloatingPaws from './FloatingPaws'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal variant="left">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-pri-200/30 bg-white">
                <img src="/peeking_cat.png" alt="Cute kitten at PawCare" className="w-full h-[420px] md:h-[520px] object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-pri-900/10 to-transparent" />
              </div>
              <FloatingPaws />
            </div>
          </Reveal>
          <Reveal variant="right">
            <p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-5">Trusted Pet Care</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-[4.2rem] text-pri-900 leading-[1.1] mb-7">Welcome to<br /><span className="text-pri-600">PawCare</span> Clinic</h1>
            <p className="text-slate-500 text-lg leading-relaxed mb-9 max-w-lg">Providing compassionate, professional veterinary care for your beloved companions. From routine check-ups to specialized treatments, we're here for every step of your pet's health journey.</p>
            <div className="flex flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-pri-600 text-white font-semibold rounded-full hover:bg-pri-700 transition-all bs shadow-lg shadow-pri-600/25">Consult a Vet <i className="fa-solid fa-arrow-right text-sm" /></a>
              <a href="#services" className="px-8 py-3.5 border-2 border-pri-200 text-pri-700 font-semibold rounded-full hover:border-pri-600 hover:bg-pri-50 transition-all">Explore Our Care</a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
