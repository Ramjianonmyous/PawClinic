import Reveal from './Reveal'

const reviews = [
  { name: 'Liyyo_01', role: 'Cat Owner', seed: 'liyyo-user', stars: 5, text: "Absolutely wonderful experience! The vet was so gentle with my cat and explained everything clearly. The clinic is spotlessly clean and the staff couldn't be more welcoming. Highly recommend PawCare to every pet parent." },
  { name: 'Barra', role: 'Dog Owner', seed: 'barra-user', stars: 5, text: "Brought my golden retriever in for a vaccination and grooming session. The team was incredibly professional and my dog actually enjoyed the visit — that says a lot! Great pricing too for the quality of service." },
  { name: 'Eisya', role: 'Puppy Owner', seed: 'eisya-user', stars: 4, text: "The quick care service saved us when my puppy had an allergic reaction on a weekend. They saw us within 30 minutes and handled everything perfectly. So grateful for this clinic and their dedicated team." },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-pri-50/40 relative overflow-hidden">
      <i className="fa-solid fa-paw text-pri-100 text-8xl absolute top-6 right-8 rotate-[20deg] pointer-events-none" />
      <i className="fa-solid fa-paw text-pri-100 text-6xl absolute bottom-10 left-12 -rotate-[25deg] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-16"><p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Real Stories</p><h2 className="font-display text-4xl md:text-5xl text-pri-900">Client Experiences</h2></div></Reveal>
        <div className="grid md:grid-cols-3 gap-7 sg">
          {reviews.map(r => (
            <Reveal key={r.name}>
              <div className="ch bg-white rounded-2xl p-7 border border-pri-50 shadow-sm">
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, i) => <i key={i} className={`${i < r.stars ? 'fa-solid' : 'fa-regular'} fa-star text-acc-400 text-sm`} />)}</div>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">"{r.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-pri-100"><img src={`https://picsum.photos/seed/${r.seed}/80/80.jpg`} alt={r.name} className="w-full h-full object-cover" /></div>
                  <div><p className="font-semibold text-pri-800 text-sm">{r.name}</p><p className="text-xs text-slate-400">{r.role}</p></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
