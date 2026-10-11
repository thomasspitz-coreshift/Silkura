import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

/* Paragraphe dont les mots s'allument un à un au fil du défilement (lecture guidée). */
export default function ScrubWords({ as: Tag = 'p', text, className = '', dim = 0.18 }) {
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.sw'),
        { opacity: dim },
        { opacity: 1, ease: 'none', stagger: 0.12, scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } },
      )
    }, el)
    return () => ctx.revert()
  }, [dim])

  return (
    <Tag ref={ref} className={className}>
      {text.split(' ').map((word, i, arr) => (
        <span key={i}>
          <span className="sw">{word}</span>
          {i < arr.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
