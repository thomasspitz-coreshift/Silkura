import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '@/lib/motion'

/* Image en parallaxe : l'image (agrandie) glisse plus lentement que la page dans son cadre.
   reveal : le cadre s'ouvre (masque) à l'entrée dans l'écran. */
export default function Parallax({ src, alt = '', className = '', imgClassName = '', speed = 12, reveal = false, ratio, sizes = '100vw', priority = false }) {
  const frame = useRef(null)
  const img = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !frame.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { yPercent: -speed / 2 },
        { yPercent: speed / 2, ease: 'none', scrollTrigger: { trigger: frame.current, start: 'top bottom', end: 'bottom top', scrub: true } },
      )
      if (reveal) {
        gsap.fromTo(
          frame.current,
          { clipPath: 'inset(18% 12% 18% 12%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: frame.current, start: 'top 85%', once: true } },
        )
        gsap.from(img.current, { scale: 1.35, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: frame.current, start: 'top 85%', once: true } })
      }
    }, frame)
    return () => ctx.revert()
  }, [speed, reveal])

  return (
    <div ref={frame} className={`relative overflow-hidden ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      <img
        ref={img}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`absolute inset-x-0 -top-[8%] h-[116%] w-full object-cover ${imgClassName}`}
      />
    </div>
  )
}
