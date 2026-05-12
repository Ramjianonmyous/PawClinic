import { useEffect, useState } from 'react'

export default function useScrollNav(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)
  const [showBtt, setShowBtt] = useState(false)

  useEffect(() => {
    const handle = () => { setScrolled(window.scrollY > threshold); setShowBtt(window.scrollY > 600) }
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [threshold])

  return { scrolled, showBtt }
}
