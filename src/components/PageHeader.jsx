/* En-tête de page intérieure : sur-titre, grand titre, introduction. */
export default function PageHeader({ eyebrow, title, intro, children }) {
  return (
    <section className="wrap pt-14 pb-12 md:pt-24 md:pb-16">
      {eyebrow && <p className="eyebrow rise text-copper-deep">{eyebrow}</p>}
      <h1 className="display-lg rise rise-1 mt-5 max-w-4xl">{title}</h1>
      {intro && <p className="lede rise rise-2 mt-6 max-w-2xl text-ink-2">{intro}</p>}
      {children && <div className="rise rise-3 mt-8">{children}</div>}
    </section>
  )
}
