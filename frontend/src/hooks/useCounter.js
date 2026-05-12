import { useEffect, useRef, useState } from 'react'

export default function useCounter(target, duration = 1800, startOn = true) {
  const [value, setValue] = useState(0)
  const counted = useRef(false)

  useEffect(() => {
    if (!startOn || counted.current) return
    counted.current = true
    const startTime = performance.now()
    function update(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }, [startOn, target, duration])

  return value
}
