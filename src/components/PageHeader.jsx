import RevealText from './motion/RevealText'

/* En-tête de page intérieure : sur-titre, grand titre (révélé mot à mot), introduction. */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <section className="wrap pt-14 pb-12 md:pt-24 md:pb-16">
      {eyebrow && <p className="eyebrow rise text-copper-deep">{eyebrow}</p>}
      <RevealText as="h1" text={title} delay={0.1} className="display-lg mt-5 max-w-4xl" />
      {intro && <p className="lede rise rise-2 mt-6 max-w-2xl text-ink-2">{intro}</p>}
      {children && <div className="rise rise-3 mt-8">{children}</div>}
    </section>
  )
}
