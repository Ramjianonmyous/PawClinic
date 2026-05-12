export default function ToastContainer({ toasts }) {
  if (!toasts.length) return null
  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className={`${t.exiting ? 't-out' : 't-in'} ${t.type === 'success' ? 'bg-pri-600' : 'bg-red-500'} text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium min-w-[260px]`}>
          <i className={`fa-solid ${t.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`} /><span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}
