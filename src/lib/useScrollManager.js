import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

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
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (target) {
        target.scrollIntoView()
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.getElementById('contenu')?.focus({ preventScroll: true })
  }, [pathname, hash])
}
