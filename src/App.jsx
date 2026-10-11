import { useEffect, useRef } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import { useReveal } from './lib/useReveal'
import { useScrollManager } from './lib/useScrollManager'
import { gsap, prefersReducedMotion, setupMotion } from './lib/motion'
import Home from './pages/Home'
import Collection from './pages/Collection'
import Product from './pages/Product'
import SavoirFaire from './pages/SavoirFaire'
import Entretien from './pages/Entretien'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import { Cgv, Confidentialite, MentionsLegales } from './pages/Legal'
import NotFound from './pages/NotFound'

/* Toute nouvelle page doit aussi être ajoutée à src/routes.js pour être pré-rendue. */
export default function App() {
  const { pathname } = useLocation()
  const curtain = useRef(null)
  const firstRender = useRef(true)

  // Défilement fluide et animations : une seule fois, dans le navigateur.
  useEffect(() => {
    setupMotion()
    document.documentElement.dataset.motion = prefersReducedMotion() ? 'reduced' : 'full'
  }, [])

  // Rideau bleu nuit qui se retire à chaque changement de page.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (prefersReducedMotion() || !curtain.current) return
    gsap.fromTo(curtain.current, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.95, ease: 'expo.inOut', delay: 0.05 })
  }, [pathname])

  useScrollManager()
  useReveal(pathname)

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
      >
        Aller au contenu
      </a>
      <Header />
      <main id="contenu" tabIndex={-1} className="outline-none">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/collection/:categoryId" element={<Collection />} />
          <Route path="/produit/:slug" element={<Product />} />
          <Route path="/savoir-faire" element={<SavoirFaire />} />
          <Route path="/entretien" element={<Entretien />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/cgv" element={<Cgv />} />
          <Route path="/confidentialite" element={<Confidentialite />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div ref={curtain} className="page-curtain" aria-hidden="true" />
    </>
  )
}
