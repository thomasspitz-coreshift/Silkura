import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

/* Valeur qui défile jusqu'à son chiffre à l'entrée dans l'écran (« 260 °C », « 3 couches »).
   Le HTML pré-rendu porte la valeur finale ; un texte sans chiffre reste tel quel. */
export default function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const match = /^(\d+)(.*)$/.exec(value)

  useEffect(() => {
    if (!match || prefersReducedMotion() || !ref.current) return
    const el = ref.current
    const target = Number(match[1])
    const suffix = match[2]
    if (el.getBoundingClientRect().top < window.innerHeight) return
    const state = { n: 0 }
    el.textContent = `0${suffix}`
    const tween = gsap.to(state, {
      n: target,
      duration: 1.8,
      ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => {
        el.textContent = `${Math.round(state.n)}${suffix}`
      },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
      el.textContent = value
    }
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
