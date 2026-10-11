import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import { ArrowRight } from '@/components/Icons'

const STEPS = [
  ['Préchauffez à vide.', "Feu moyen, deux à trois minutes. L'inox n'a besoin de rien d'autre."],
  ["Versez une goutte d'eau.", "Si elle danse et roule comme une bille de mercure, la température est parfaite."],
  ['Huile, puis aliments.', "Ils accrochent un instant, dorent, puis se décollent d'eux-mêmes."],
]

/* Le test de la goutte d'eau : vidéo en boucle plein écran, figée pendant que les trois gestes défilent.
   La vidéo ne se lit que lorsqu'elle est à l'écran (économie de batterie), jamais en mouvement réduit. */
export default function DropletsSection() {
  const section = useRef(null)
  const video = useRef(null)
  // Étapes superposées seulement quand l'animation tourne ; sinon (HTML pré-rendu, mouvement réduit) empilées.
  const [stacked, setStacked] = useState(false)

  useEffect(() => {
    const v = video.current
    const reduced = prefersReducedMotion()
    if (!v) return

    v.playbackRate = 0.8
    const io = new IntersectionObserver(([entry]) => {
      if (reduced) return
      if (entry.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(v)
    if (reduced) return () => io.disconnect()

    setStacked(true)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      tl.fromTo('.dr-video', { scale: 1.25 }, { scale: 1, duration: 1 }, 0)
      tl.fromTo('.dr-title', { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 0.02)
      gsap.utils.toArray('.dr-step', section.current).forEach((step, i) => {
        const at = 0.18 + i * 0.24
        tl.fromTo(step, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.08 }, at)
        if (i < STEPS.length - 1) tl.to(step, { autoAlpha: 0, y: -40, duration: 0.07 }, at + 0.17)
      })
      tl.fromTo('.dr-cta', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.86)
      tl.fromTo('.dr-progress', { scaleY: 0 }, { scaleY: 1, duration: 1 }, 0)
    }, section)

    return () => {
      io.disconnect()
      ctx.revert()
    }
  }, [])

  return (
    <section ref={section} data-header="dark" className="relative bg-[#05080f] text-on-night" style={{ height: '320svh' }}>
      <div className="grain sticky top-0 h-[100svh] overflow-hidden">
        <video
          ref={video}
          className="dr-video absolute inset-0 h-full w-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/videos/gouttes-poster.webp"
          aria-hidden="true"
        >
          <source src="/videos/gouttes-mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
          <source src="/videos/gouttes.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,15,0.85)_0%,rgba(5,8,15,0.35)_55%,rgba(5,8,15,0.1)_100%)] max-md:bg-[linear-gradient(0deg,rgba(5,8,15,0.92)_0%,rgba(5,8,15,0.4)_60%,rgba(5,8,15,0.2)_100%)]" />

        <div className="wrap relative z-[2] flex h-full flex-col justify-end pb-[12svh] md:justify-center md:pb-0">
          <div className="dr-title max-w-xl">
            <p className="eyebrow text-copper-light">Le secret de l'inox</p>
            <h2 className="display-lg mt-5 text-on-night">Le test de la goutte d'eau.</h2>
          </div>

          <div className={`relative mt-10 max-w-lg md:mt-14 ${stacked ? 'min-h-[9.5rem]' : 'space-y-8'}`}>
            {STEPS.map(([title, text], i) => (
              <div key={title} className={`dr-step ${stacked && i ? 'absolute inset-x-0 top-0' : ''}`}>
                <p className="font-display text-sm text-copper-light">0{i + 1} — 03</p>
                <p className="mt-3 font-display text-[clamp(1.8rem,3vw,2.6rem)] leading-tight text-on-night">{title}</p>
                <p className="mt-3 max-w-md leading-relaxed text-on-night-muted">{text}</p>
              </div>
            ))}
          </div>

          <Link to="/entretien" className="dr-cta btn btn-ghost-light mt-8 self-start">
            Tout le guide d'entretien <ArrowRight />
          </Link>
        </div>

        <div className="absolute top-1/2 right-[clamp(20px,4vw,48px)] hidden h-40 w-px -translate-y-1/2 bg-on-night/15 md:block" aria-hidden="true">
          <div className="dr-progress h-full w-full origin-top bg-copper-light" />
        </div>
      </div>
    </section>
  )
}
