import { useRef } from 'react'
import { Link } from 'react-router'
import { gsap, prefersReducedMotion, useIsomorphicLayoutEffect } from '@/lib/motion'
import { formatPrice, priceFrom, products } from '@/data/products'

/* Les pièces en défilement horizontal : la section se fige et la rangée glisse à mesure qu'on descend.
   Mobile (et mouvement réduit) : simple rangée qu'on fait glisser au doigt. */
export default function HorizontalGallery() {
  const section = useRef(null)
  const track = useRef(null)

  // Effet « layout » : l'épinglage doit être défait avant que React ne retire la section (voir motion.js).
  useIsomorphicLayoutEffect(() => {
    if (prefersReducedMotion() || !section.current) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 1024px)', () => {
      const distance = () => track.current.scrollWidth - window.innerWidth
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      })
      gsap.utils.toArray('.hg-card img').forEach((img) => {
        gsap.fromTo(img, { scale: 1.18 }, {
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: section.current, start: 'top top', end: () => `+=${distance()}`, scrub: true },
        })
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <section ref={section} aria-label="Les pièces Silkura" className="overflow-hidden bg-paper">
      <div className="flex flex-col justify-center py-24 lg:min-h-[100svh] lg:py-0">
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-[clamp(20px,4vw,48px)] pb-4 [scrollbar-width:none] lg:snap-none lg:gap-8 lg:overflow-visible lg:pb-0"
        >
          <div className="flex w-[80vw] shrink-0 snap-start flex-col justify-center pr-6 sm:w-[46vw] lg:w-[30vw]">
            <p className="eyebrow text-copper-deep">Les pièces</p>
            <h2 className="display-lg mt-5">Six pièces. Une vie de cuisine.</h2>
            <p className="lede mt-6 max-w-sm text-ink-2">Toutes en inox 3 plis, toutes compatibles induction, toutes garanties à vie.</p>
            <Link to="/collection" className="btn btn-primary mt-9 self-start">
              Voir la collection
            </Link>
          </div>
          {products.map((p, i) => (
            <Link
              key={p.slug}
              to={`/produit/${p.slug}`}
              className="hg-card group w-[80vw] shrink-0 snap-start sm:w-[46vw] lg:w-[38vw]"
            >
              <div className="relative overflow-hidden rounded-[2px] bg-night-2" style={{ aspectRatio: '3 / 2' }}>
                {p.images[0] && (
                  <img src={p.images[0]} alt={p.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute top-4 left-4 font-display text-sm text-on-night/80">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[clamp(1.6rem,2vw,2.1rem)] leading-tight text-ink">{p.name}</h3>
                <p className="shrink-0 text-[0.9375rem] text-ink">
                  {p.sizes.length > 1 && <span className="text-muted">dès </span>}
                  {formatPrice(priceFrom(p))}
                </p>
              </div>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
            </Link>
          ))}
          <div className="w-[4vw] shrink-0" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
