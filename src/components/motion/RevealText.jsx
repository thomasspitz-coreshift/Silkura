import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

/* Titre révélé mot à mot (chaque mot monte depuis un masque) à son entrée dans l'écran.
   Le texte complet reste dans le HTML pré-rendu (référencement) et dans aria-label (lecteurs d'écran).
   « \n » dans le texte force un retour à la ligne. */
export default function RevealText({ as: Tag = 'h2', text, className = '', delay = 0, stagger = 0.045, start = 'top 85%' }) {
  const ref = useRef(null)
  const lines = text.split('\n')

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const el = ref.current
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.rw-i'), {
        yPercent: 115,
        rotate: 2,
        duration: 1.2,
        ease: 'expo.out',
        stagger,
        delay,
        scrollTrigger: { trigger: el, start, once: true },
      })
    }, el)
    return () => ctx.revert()
  }, [delay, stagger, start])

  return (
    <Tag ref={ref} className={className} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden="true">
          {line.split(' ').map((word, wi, arr) => (
            <span key={wi}>
              <span className="rw">
                <span className="rw-i">{word}</span>
              </span>
              {wi < arr.length - 1 ? ' ' : ''}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  )
}
