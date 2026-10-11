import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { gsap, prefersReducedMotion } from '@/lib/motion'
import RevealText from '@/components/motion/RevealText'
import { ArrowRight } from '@/components/Icons'
import { categories, formatPrice, priceFrom, productsIn } from '@/data/products'

/* « Le menu » : juste après l'ouverture du faitout, les familles de pièces en grands panneaux.
   Ordinateur : panneaux côte à côte qui s'élargissent au survol. Mobile : panneaux empilés. */
export default function CollectionMenu() {
  const root = useRef(null)
  const items = categories
    .map((c) => {
      const list = productsIn(c.id)
      const image = list.find((p) => p.images[0])?.images[0]
      return { ...c, count: list.length, from: list.length ? Math.min(...list.map(priceFrom)) : null, image }
    })
    .filter((c) => c.count)

  useEffect(() => {
    if (prefersReducedMotion() || !root.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.menu-panel',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.out',
          stagger: 0.09,
          scrollTrigger: { trigger: '.menu-panels', start: 'top 80%', once: true },
        },
      )
      gsap.from('.menu-panel-label', {
        y: 40,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.09,
        delay: 0.35,
        scrollTrigger: { trigger: '.menu-panels', start: 'top 80%', once: true },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="menu" data-header="dark" className="grain relative bg-night pt-28 pb-16 text-on-night md:pt-36 md:pb-24">
      <div className="wrap relative z-[2] flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow text-copper-light">La collection</p>
          <RevealText as="h2" text="Choisissez votre pièce." className="display-lg mt-5 text-on-night" />
        </div>
        <Link to="/collection" className="link-underline text-[0.9375rem] text-on-night">
          Toute la collection
        </Link>
      </div>

      <ul className="menu-panels wrap relative z-[2] mt-12 flex flex-col gap-3 md:mt-16 lg:h-[74svh] lg:flex-row">
        {items.map((c, i) => (
          <li key={c.id} className="menu-panel relative min-h-[46svh] flex-1 overflow-hidden rounded-[2px] bg-night-2 lg:min-h-0">
            <Link to={`/collection/${c.id}`} className="group absolute inset-0 block">
              {c.image && (
                <img src={c.image} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-[#060b18]/90 via-[#060b18]/20 to-transparent" aria-hidden="true" />
              <span className="menu-panel-label absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                <span>
                  <span className="block font-display text-sm text-copper-light">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-2 block font-display text-[clamp(2rem,2.6vw,2.6rem)] leading-none text-on-night">{c.label}</span>
                  <span className="mt-3 block text-[0.8125rem] text-on-night-muted">
                    {c.count} {c.count > 1 ? 'pièces' : 'pièce'}
                    {c.from ? ` · dès ${formatPrice(c.from)}` : ''}
                  </span>
                </span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-on-night/30 text-on-night transition-colors duration-500 group-hover:border-copper-light group-hover:bg-copper-light group-hover:text-night">
                  <ArrowRight />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
