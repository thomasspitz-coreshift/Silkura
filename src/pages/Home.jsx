import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import Media from '@/components/Media'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Flame, Forever, Hand, Layers } from '@/components/Icons'
import { promises, site } from '@/data/site'
import { categories, inoxFacts, products, productsIn } from '@/data/products'

const FEATURED = ['poele-inox', 'sauteuse-inox', 'casserole-inox', 'coffret-essentiel']

const PILLARS = [
  {
    icon: Layers,
    title: 'La matière avant tout',
    text: "Un seul matériau : l'inox 3 plis. Aucun revêtement qui s'use, s'écaille ou finit dans l'assiette.",
  },
  {
    icon: Flame,
    title: 'Pensées pour le feu',
    text: "Un cœur d'aluminium qui répartit la chaleur jusqu'aux bords et la garde stable. Gaz, induction, vitrocéramique, four.",
  },
  {
    icon: Hand,
    title: 'Faites pour la main',
    text: "Queues rivetées, inclinées, équilibrées. On les tient longtemps sans fatigue et sans se brûler.",
  },
  {
    icon: Forever,
    title: 'Pour toute une vie',
    text: "L'inox ne rouille pas et ne s'use pas. Une pièce Silkura ne se remplace pas, elle se transmet.",
  },
]

export default function Home() {
  const featured = FEATURED.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean)

  return (
    <>
      <Seo
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: site.name,
          url: site.url,
          logo: `${site.url}/favicon.svg`,
          email: site.email,
          sameAs: [site.instagram],
        }}
      />

      {/* ── Héros ─────────────────────────────────────────── */}
      <section className="wrap pt-10 pb-16 md:pt-16 md:pb-24">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow rise text-copper-deep">Ustensiles en inox 3 plis</p>
            <h1 className="display-xl rise rise-1 mt-6">
              Cuisiner juste.
              <br />
              <em className="text-ink-2/70">Pour longtemps.</em>
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-4">
            <p className="lede rise rise-2 max-w-md text-ink-2">
              Silkura dessine des ustensiles de cuisson sobres et durables, pensés pour la chaleur, la main et le temps.
            </p>
            <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
              <Link to="/collection" className="btn btn-primary">
                Découvrir la collection <ArrowRight />
              </Link>
              <Link to="/savoir-faire" className="btn btn-ghost">
                Notre savoir-faire
              </Link>
            </div>
          </div>
        </div>

        <div className="rise rise-4 mt-12 md:mt-16">
          <Media
            src={site.media.hero}
            alt="La Poêle Silkura en inox sur un plan de travail en pierre"
            shape="poele"
            tone="sand"
            ratio="16 / 8"
            priority
            sizes="100vw"
            artClassName="w-[62%] max-w-[760px] translate-y-[4%]"
            className="rounded-[2px] max-md:!aspect-[4/3.4]"
          />
        </div>
      </section>

      {/* ── Promesses ─────────────────────────────────────── */}
      <section aria-label="Nos engagements" className="border-y border-line py-5">
        <div className="marquee text-[0.9375rem] text-ink">
          {[0, 1].map((copy) => (
            <ul key={copy} className="marquee-track" aria-hidden={copy === 1 ? true : undefined}>
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-3.5 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-copper" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </section>

      {/* ── Catégories ────────────────────────────────────── */}
      <section className="wrap py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal="">
            <p className="eyebrow text-copper-deep">La collection</p>
            <h2 className="display-lg mt-4 max-w-2xl">Peu de pièces. Chacune à sa place.</h2>
          </div>
          <Link to="/collection" data-reveal="120" className="link-underline text-[0.9375rem] text-ink">
            Toute la collection
          </Link>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:mt-16 md:grid-cols-4 md:gap-x-6">
          {categories
            .filter((c) => c.id !== 'coffrets')
            .map((c, i) => {
              const first = productsIn(c.id)[0]
              return (
                <li key={c.id} data-reveal={i * 90}>
                  <Link to={`/collection/${c.id}`} className="group block">
                    <Media
                      src={first?.images[0]}
                      alt=""
                      shape={c.shape}
                      tone={first?.tone ?? 'sand'}
                      ratio="3 / 4"
                      className="rounded-[2px]"
                    />
                    <div className="mt-4 flex items-center justify-between">
                      <h3 className="font-display text-[1.75rem] leading-none text-ink">{c.label}</h3>
                      <ArrowRight className="h-4 w-4 -translate-x-1 text-ink opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                    </div>
                  </Link>
                </li>
              )
            })}
        </ul>
      </section>

      {/* ── Manifeste (sombre) ────────────────────────────── */}
      <section className="bg-night text-on-night">
        <div className="wrap py-24 md:py-36">
          <div className="grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p data-reveal="" className="eyebrow text-copper">Notre parti pris</p>
              <h2 data-reveal="80" className="display-lg mt-5 text-on-night">
                Moins d'objets.
                <br />
                De meilleurs objets.
              </h2>
              <p data-reveal="160" className="lede mt-8 max-w-md text-on-night-muted">
                Une cuisine n'a pas besoin de vingt casseroles. Elle a besoin de quelques pièces justes, qui chauffent bien
                et ne s'abîment pas. C'est tout ce que nous faisons.
              </p>
              <Link data-reveal="220" to="/savoir-faire" className="btn btn-light mt-10">
                Comment nous les fabriquons <ArrowRight />
              </Link>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[2px] bg-on-night/12 sm:grid-cols-2 lg:col-span-6 lg:col-start-7">
              {PILLARS.map(({ icon: Icon, title, text }, i) => (
                <li key={title} data-reveal={i * 90} className="bg-night p-8 md:p-10">
                  <Icon className="h-7 w-7 text-copper" />
                  <h3 className="mt-8 font-display text-[1.75rem] leading-tight text-on-night">{title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-on-night-muted">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Pièces phares ─────────────────────────────────── */}
      <section className="wrap py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div data-reveal="">
            <p className="eyebrow text-copper-deep">Les essentielles</p>
            <h2 className="display-lg mt-4">Par où commencer.</h2>
          </div>
          <Link to="/collection" data-reveal="120" className="link-underline text-[0.9375rem] text-ink">
            Voir les {products.length} pièces
          </Link>
        </div>
        <div className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* ── Pourquoi l'inox ──────────────────────────────── */}
      <section className="bg-paper-2">
        <div className="wrap py-24 md:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p data-reveal="" className="eyebrow text-copper-deep">La matière</p>
              <h2 data-reveal="80" className="display-lg mt-4">
                Pourquoi
                <br />
                l'inox 3 plis.
              </h2>
              <p data-reveal="140" className="lede mt-6 max-w-md text-ink-2">
                Le matériau des cuisines professionnelles. Il ne rouille pas, ne réagit pas aux aliments, ne garde pas les odeurs. Avec
                un cœur d'aluminium, il chauffe vite et partout.
              </p>
            </div>
            <div className="lg:col-span-6 lg:col-start-7" data-reveal="">
              <Media src={site.media.cuisine} alt="Une sauteuse Silkura sur le feu, légumes saisis" shape="sauteuse" tone="stone" ratio="4 / 5" className="rounded-[2px]" />
            </div>
          </div>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-[2px] bg-line sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
            {inoxFacts.map(([value, text], i) => (
              <div key={value} data-reveal={i * 90} className="bg-paper p-8 md:p-10">
                <dt className="font-display text-5xl leading-none text-ink">{value}</dt>
                <dd className="mt-5 text-[0.9375rem] leading-relaxed text-ink-2">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Entretien ─────────────────────────────────────── */}
      <section className="wrap py-24 md:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6" data-reveal="">
            <Media src={site.media.entretien} alt="Gouttes d'eau qui glissent sur une poêle en inox préchauffée" shape="poele" tone="clay" ratio="5 / 4" className="rounded-[2px]" />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p data-reveal="" className="eyebrow text-copper-deep">Entretien</p>
            <h2 data-reveal="80" className="display-lg mt-4">
              Le secret pour que rien n'attache.
            </h2>
            <p data-reveal="140" className="lede mt-6 text-ink-2">
              L'inox n'a pas besoin de revêtement, seulement d'être bien chauffé. Trois gestes, et les aliments se décollent
              tout seuls.
            </p>
            <ol data-reveal="200" className="mt-10 space-y-5">
              {[
                'Préchauffer la poêle à vide, à feu moyen.',
                "Quand une goutte d'eau roule comme une bille, ajouter l'huile.",
                'Poser les aliments et ne plus y toucher avant qu\'ils dorent.',
              ].map((step, i) => (
                <li key={step} className="flex gap-5">
                  <span className="font-display text-2xl leading-none text-copper-deep">0{i + 1}</span>
                  <span className="text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <Link data-reveal="260" to="/entretien" className="btn btn-ghost mt-10">
              Le guide complet <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
