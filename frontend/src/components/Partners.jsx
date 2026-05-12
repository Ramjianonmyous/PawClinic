import Reveal from './Reveal'

const partners = [
  { icon: 'fa-solid fa-hospital', name: 'VetPro' },
  { icon: 'fa-solid fa-shield-dog', name: 'PetGuard' },
  { icon: 'fa-solid fa-heart-pulse', name: 'AnimalHub' },
]

export default function Partners() {
  return (
    <section className="py-14 border-y border-pri-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><p className="text-center text-xs font-bold text-slate-300 tracking-[.25em] uppercase mb-10">Our Partners</p></Reveal>
        <div className="sg flex flex-wrap justify-center items-center gap-14 md:gap-24">
          {partners.map(p => (
            <Reveal key={p.name}>
              <div className="flex items-center gap-2.5 text-slate-300 hover:text-pri-500 transition-colors duration-300 cursor-default">
                <i className={`${p.icon} text-3xl`} /><span className="font-display text-xl">{p.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
