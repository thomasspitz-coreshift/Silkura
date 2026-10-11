import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { ScrollTrigger, getLenis, scrollToTop } from './motion'

/* À chaque changement de page : retour en haut (ou vers l'ancre), et focus sur le contenu
   principal pour que les lecteurs d'écran annoncent la nouvelle page. Rien au premier chargement. */
export function useScrollManager() {
  const { pathname, hash } = useLocation()
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    // Les animations liées au défilement de l'ancienne page disparaissent avec elle :
    // on recalcule les positions une fois la nouvelle page affichée.
    requestAnimationFrame(() => ScrollTrigger.refresh())
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        const lenis = getLenis()
        if (lenis) lenis.scrollTo(target, { offset: -96 })
        else target.scrollIntoView()
        return
      }
    }
    scrollToTop()
    document.getElementById('contenu')?.focus({ preventScroll: true })
  }, [pathname, hash])
}
