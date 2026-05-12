import useInView from '../hooks/useInView'

export default function Reveal({ children, className = '', variant = 'up', group = false }) {
  const [ref, isVisible] = useInView()
  const vc = variant === 'left' ? 'rv-l' : variant === 'right' ? 'rv-r' : variant === 'scale' ? 'rv-s' : 'rv'
  return <div ref={ref} className={`${vc} ${isVisible ? 'on' : ''} ${group ? 'sg' : ''} ${className}`}>{children}</div>
}
