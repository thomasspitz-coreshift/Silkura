/* ============================================================
   Moteur d'animation : GSAP + ScrollTrigger + Lenis (défilement fluide), comme coreshift.fr.

   - Navigateur uniquement : rien ne s'exécute au pré-rendu (Node).
   - Mouvement réduit (préférence système) : pas de Lenis, pas d'animation pilotée par le défilement ;
     chaque composant affiche alors son état final, statique.
   ============================================================ */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { useEffect, useLayoutEffect } from 'react'

let lenis = null

// Enregistré dès l'import côté navigateur : les composants de page créent leurs animations
// dans leurs propres effets, qui s'exécutent avant celui de l'application.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function setupMotion() {
  if (typeof window === 'undefined') return null
  if (lenis || prefersReducedMotion()) return lenis

  lenis = new Lenis({ lerp: 0.085, smoothWheel: true, anchors: { offset: -96 } })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function getLenis() {
  return lenis
}

/* Remonte en haut de page sans animation (changement de page). */
export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true })
  else window.scrollTo({ top: 0, behavior: 'instant' })
}

export function stopScroll() {
  lenis?.stop()
}

export function startScroll() {
  lenis?.start()
}

/* Effet « layout » dans le navigateur, effet normal au pré-rendu (Node).
   À utiliser pour tout ce qui épingle (pin) un élément : GSAP l'enveloppe dans un conteneur, et ce
   nettoyage doit avoir lieu AVANT que React retire la page du DOM (sinon erreur removeChild). */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export { gsap, ScrollTrigger }
