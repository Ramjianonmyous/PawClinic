import Reveal from './Reveal'

const team = [
  { name: 'James', role: 'Vet Doctor', seed: 'vet-james' },
  { name: 'Luna', role: 'Receptionist', seed: 'recv-luna' },
  { name: 'Alex', role: 'Clinic Manager', seed: 'mgr-alex' },
  { name: 'Olivia', role: 'Vet Tech', seed: 'tech-olivia' },
]

export default function Team() {
  return (
    <section id="team" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal><div className="text-center mb-16"><p className="text-pri-600 font-semibold text-sm tracking-[.2em] uppercase mb-3">Meet The Experts</p><h2 className="font-display text-4xl md:text-5xl text-pri-900">Our Super Team</h2></div></Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7 sg">
          {team.map(t => (
            <Reveal key={t.name}>
              <div className="ch bg-white rounded-2xl p-7 text-center border border-pri-50 shadow-sm group">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-5 ring-4 ring-pri-50 group-hover:ring-pri-200 transition-all">
                  <img src={`https://picsum.photos/seed/${t.seed}/200/200.jpg`} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-semibold text-pri-800 mb-1">{t.name}</h3>
                <p className="text-sm text-pri-500 font-medium">{t.role}</p>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="#" className="w-8 h-8 rounded-full bg-pri-50 flex items-center justify-center text-pri-400 hover:bg-pri-600 hover:text-white transition-all text-xs" aria-label="Twitter"><i className="fa-brands fa-twitter" /></a>
                  <a href="#" className="w-8 h-8 rounded-full bg-pri-50 flex items-center justify-center text-pri-400 hover:bg-pri-600 hover:text-white transition-all text-xs" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" /></a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
