import useCounter from '../hooks/useCounter'

export default function Counter({ target, startOn }) {
  const value = useCounter(target, 1800, startOn)
  return <span>{value}+</span>
}
