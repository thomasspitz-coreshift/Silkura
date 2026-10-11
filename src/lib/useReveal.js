import { useEffect } from 'react'

/* Apparitions au défilement pour tout élément portant data-reveal (valeur facultative = délai en ms).
   Seuls les éléments encore hors de l'écran sont masqués puis révélés : le contenu visible au
   chargement ne clignote jamais, et sans JavaScript tout reste affiché.
   L'état est posé dans data-reveal-state, attribut que React ne gère pas (pas d'écrasement au rendu). */
export function useReveal(key) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-reveal-state', 'in')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const viewport = window.innerHeight
    document.querySelectorAll('[data-reveal]:not([data-reveal-state])').forEach((el) => {
      if (el.getBoundingClientRect().top < viewport * 0.92) return
      const delay = el.getAttribute('data-reveal')
      if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`)
      el.setAttribute('data-reveal-state', 'pending')
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [key])
}
