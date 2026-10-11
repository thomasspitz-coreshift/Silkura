/* ============================================================
   Intro de l'accueil : le faitout s'ouvre au fil du défilement.

   Une vidéo (générée, 5 s) est découpée en images (scripts : voir CLAUDE.md, « Séquence d'intro »)
   que l'on dessine dans un <canvas> selon la position de défilement, comme sur les pages produit
   d'Apple : le visiteur « tient » l'animation. Deux jeux d'images : paysage (ordinateur) et
   recadré au centre (mobile, écran vertical).

   Robustesse :
   - le HTML pré-rendu contient la première image (<img>) et le logo : rien n'est vide sans JavaScript ;
   - les images se chargent par passes (1 sur 8, puis 1 sur 4…) : on peut défiler avant la fin du chargement ;
   - mouvement réduit : pas d'animation, image finale fixe et textes visibles.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import { Ornament, Tricolore } from '@/components/Logo'

export const INTRO = {
  frames: 96,
  base: '/sequences/ouverture',
  bg: '#040c18', // couleur du fond de la vidéo, pour prolonger l'image sur écran vertical
}

const frameUrl = (set, i) => `${INTRO.base}/${set}/${String(i + 1).padStart(3, '0')}.webp`

// Ordre de chargement : une image sur 8, puis sur 4, sur 2, puis toutes.
function loadOrder(count) {
  const seen = new Set()
  const order = []
  for (const step of [8, 4, 2, 1]) {
    for (let i = 0; i < count; i += step) {
      if (!seen.has(i)) {
        seen.add(i)
        order.push(i)
      }
    }
  }
  if (!seen.has(count - 1)) order.push(count - 1)
  return order
}

export default function IntroSequence() {
  const section = useRef(null)
  const canvas = useRef(null)
  const [progress, setProgress] = useState(0) // chargement, en %
  const [isStatic, setIsStatic] = useState(false)

  useEffect(() => {
    const reduced = prefersReducedMotion()
    if (reduced) {
      setIsStatic(true)
      return
    }

    const cv = canvas.current
    const ctx = cv.getContext('2d')
    const portrait = () => window.innerWidth / window.innerHeight < 0.9
    let set = portrait() ? 'm' : 'd'
    let images = []
    let wanted = 0
    let alive = true

    function nearest(i) {
      for (let d = 0; d < INTRO.frames; d++) {
        const a = images[i - d]
        if (a && a.complete && a.naturalWidth) return a
        const b = images[i + d]
        if (b && b.complete && b.naturalWidth) return b
      }
      return null
    }

    function draw() {
      const img = nearest(wanted)
      if (!img) return
      const cw = cv.width
      const ch = cv.height
      const ir = img.naturalWidth / img.naturalHeight
      ctx.fillStyle = INTRO.bg
      ctx.fillRect(0, 0, cw, ch)
      if (cw / ch >= 0.9) {
        // Paysage : l'image couvre tout l'écran.
        let w = cw
        let h = cw / ir
        if (h < ch) {
          h = ch
          w = ch * ir
        }
        ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h)
      } else {
        // Vertical : l'image occupe la largeur, centrée un peu haut, fondue dans le fond en haut et en bas.
        const w = cw * 1.06
        const h = w / ir
        const x = (cw - w) / 2
        const y = (ch - h) * 0.4
        ctx.drawImage(img, x, y, w, h)
        const fade = h * 0.22
        const top = ctx.createLinearGradient(0, y, 0, y + fade)
        top.addColorStop(0, INTRO.bg)
        top.addColorStop(1, 'rgba(4,12,24,0)')
        ctx.fillStyle = top
        ctx.fillRect(0, y - 1, cw, fade)
        const bottom = ctx.createLinearGradient(0, y + h - fade, 0, y + h)
        bottom.addColorStop(0, 'rgba(4,12,24,0)')
        bottom.addColorStop(1, INTRO.bg)
        ctx.fillStyle = bottom
        ctx.fillRect(0, y + h - fade, cw, fade + 1)
      }
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = Math.round(cv.clientWidth * dpr)
      cv.height = Math.round(cv.clientHeight * dpr)
      draw()
    }

    function load() {
      images = new Array(INTRO.frames)
      let done = 0
      const order = loadOrder(INTRO.frames)
      let next = 0
      // Six téléchargements en parallèle, dans l'ordre des passes.
      const pump = () => {
        if (!alive || next >= order.length) return
        const i = order[next++]
        const img = new Image()
        img.decoding = 'async'
        img.onload = img.onerror = () => {
          done++
          if (done % 4 === 0 || done === INTRO.frames) setProgress(Math.round((done / INTRO.frames) * 100))
          if (Math.abs(i - wanted) < 6) draw()
          pump()
        }
        img.src = frameUrl(set, i)
        images[i] = img
      }
      for (let k = 0; k < 6; k++) pump()
    }

    load()
    resize()

    const onResize = () => {
      const nextSet = portrait() ? 'm' : 'd'
      if (nextSet !== set) {
        set = nextSet
        load()
      }
      resize()
    }
    window.addEventListener('resize', onResize)

    const el = section.current
    const state = { f: 0 }
    const gctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      tl.to(state, {
        f: INTRO.frames - 1,
        duration: 0.8,
        onUpdate: () => {
          const f = Math.round(state.f)
          if (f !== wanted) {
            wanted = f
            draw()
          }
        },
      }, 0.04)
        .to('.intro-a', { autoAlpha: 0, y: -60, duration: 0.12 }, 0.02)
        .fromTo('.intro-media', { opacity: 0.38, scale: 1.06 }, { opacity: 1, scale: 1, duration: 0.14 }, 0)
        .fromTo('.intro-b', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.26)
        .to('.intro-b', { autoAlpha: 0, y: -40, duration: 0.08 }, 0.5)
        .fromTo('.intro-c > *', { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.08, stagger: 0.03 }, 0.58)
        .to('.intro-c', { autoAlpha: 0, duration: 0.06 }, 0.8)
        .to(cv, { scale: 1.18, duration: 0.14 }, 0.86)
        .to('.intro-veil', { autoAlpha: 1, duration: 0.12 }, 0.88)
        .fromTo('.intro-bar', { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
    }, el)

    return () => {
      alive = false
      window.removeEventListener('resize', onResize)
      gctx.revert()
    }
  }, [])

  return (
    <section
      id="intro"
      data-header="dark"
      ref={section}
      aria-label="Silkura, l'inox sublimé"
      data-static={isStatic || undefined}
      className="relative bg-[#040c18] text-on-night"
      style={{ height: isStatic ? undefined : '440svh' }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Image et canvas, assombris au départ derrière le logo, puis révélés au premier défilement.
            La première image est dans le HTML pré-rendu ; le canvas la remplace dès qu'il dessine. */}
        <div className="intro-media absolute inset-0 origin-center" style={{ opacity: 0.38 }}>
          <picture>
            <source media="(max-aspect-ratio: 9/10)" srcSet={`${INTRO.base}/poster-m.webp`} />
            <img
              src={`${INTRO.base}/poster.webp`}
              alt=""
              fetchPriority="high"
              className="intro-poster absolute inset-0 h-full w-full object-cover"
            />
          </picture>
          <canvas ref={canvas} className="absolute inset-0 h-full w-full will-change-transform" aria-hidden="true" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(2,6,14,0.6)_100%)]" />
        <div className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(2,6,14,0.7)_0%,transparent_30%,transparent_70%,rgba(2,6,14,0.7)_100%)] md:block" />

        {/* 1. Ouverture : le logo du coffret, au centre */}
        <div className="intro-a absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="intro-in font-display text-[clamp(3.6rem,10vw,8.5rem)] leading-none font-normal tracking-[0.01em] text-on-night">Silkura</h1>
          <Ornament className="intro-in intro-in-2 mt-5 text-on-night-muted" />
          <p className="intro-in intro-in-3 mt-4 text-[0.6875rem] tracking-[0.34em] text-on-night-muted uppercase">Made in France</p>
          <Tricolore className="intro-in intro-in-3 mt-3" />
        </div>

        {/* 2. Accroche, dans la marge gauche */}
        <div className="intro-b invisible absolute inset-x-0 bottom-[11svh] px-[clamp(20px,6vw,96px)] md:inset-x-auto md:top-1/2 md:bottom-auto md:left-0 md:max-w-[30vw] md:-translate-y-1/2 md:px-0 md:pl-[5vw]">
          <p className="eyebrow text-copper-light">Ustensiles en inox 3 plis</p>
          <p className="mt-5 font-display text-[clamp(2.8rem,4.6vw,5rem)] leading-[0.98] text-on-night">
            L'inox,
            <br />
            <em className="text-copper-light">sublimé.</em>
          </p>
        </div>

        {/* 3. Les trois promesses, dans la marge droite */}
        <ul className="intro-c absolute inset-x-0 bottom-[10svh] flex flex-col items-center gap-2 text-center md:inset-x-auto md:top-1/2 md:right-[5vw] md:bottom-auto md:-translate-y-1/2 md:items-end md:text-right">
          {['Trois couches.', 'Zéro revêtement.', 'Fabriqué en France.'].map((t) => (
            <li key={t} className="invisible font-display text-[clamp(1.9rem,2.9vw,3rem)] leading-[1.1] text-on-night">
              {t}
            </li>
          ))}
        </ul>

        {/* Indication de défilement et chargement */}
        <div className="intro-a intro-cue absolute inset-x-0 bottom-7 flex flex-col items-center gap-3 text-[0.6875rem] tracking-[0.28em] text-on-night-muted uppercase">
          <span aria-live="polite">{progress < 25 && !isStatic ? `Préparation ${progress} %` : 'Faites défiler pour ouvrir'}</span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>

        <div className="intro-bar absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-copper-light/70" aria-hidden="true" />
        <div className="intro-veil invisible absolute inset-0 bg-night" aria-hidden="true" />
      </div>
    </section>
  )
}
