import useScrollNav from '../hooks/useScrollNav'

export default function BackToTop() {
  const { showBtt } = useScrollNav()
  return (
    <button id="btt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-pri-600 text-white rounded-full shadow-lg shadow-pri-600/30 flex items-center justify-center hover:bg-pri-700 transition-colors ${showBtt ? 'show' : ''}`} aria-label="Back to top">
      <i className="fa-solid fa-arrow-up text-sm" />
    </button>
  )
}
