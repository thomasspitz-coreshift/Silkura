import { useState } from 'react'
import { Link, useParams } from 'react-router'
import { Seo } from '@/lib/head'
import Media from '@/components/Media'
import ProductCard from '@/components/ProductCard'
import { ArrowRight, Plus } from '@/components/Icons'
import NotFound from './NotFound'
import { formatPrice, getCategory, getProduct, products } from '@/data/products'
import { commerce, site } from '@/data/site'

const CARE =
  "Préchauffer à feu moyen avant d'ajouter la matière grasse : c'est le secret pour que rien n'attache. Lave-vaisselle autorisé, mais un lavage à la main garde le brillant plus longtemps. Les reflets arc-en-ciel partent avec un trait de vinaigre blanc, les traces brûlées avec du bicarbonate."

// Clé = slug : passer d'une pièce à l'autre (« Vous aimerez aussi ») repart d'un état neuf.
export default function Product() {
  const { slug } = useParams()
  return <ProductView key={slug} slug={slug} />
}

function ProductView({ slug }) {
  const product = getProduct(slug)
  const [sizeIndex, setSizeIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)

  if (!product) return <NotFound />

  const size = product.sizes[sizeIndex] ?? product.sizes[0]
  const category = getCategory(product.category)
  const related = [
    ...products.filter((p) => p.slug !== product.slug && p.category === product.category),
    ...products.filter((p) => p.slug !== product.slug && p.category !== product.category),
  ].slice(0, 4)
  const prices = product.sizes.map((s) => s.price)
  const orderLink = `/contact?sujet=commande&piece=${encodeURIComponent(`${product.name} — ${size.label}`)}`

  return (
    <>
      <Seo
        title={product.name}
        description={`${product.name} Silkura en inox 3 plis. ${product.tagline} Sans revêtement, compatible tous feux dont induction.`}
        image={product.images[0]}
        type="product"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.name,
          description: product.description,
          brand: { '@type': 'Brand', name: site.name },
          category: category?.title,
          ...(product.images[0] && { image: product.images.map((src) => site.url + src) }),
          offers: {
            '@type': 'AggregateOffer',
            priceCurrency: 'EUR',
            lowPrice: Math.min(...prices),
            highPrice: Math.max(...prices),
            offerCount: prices.length,
          },
        }}
      />

      <div className="wrap pt-6 md:pt-10">
        <nav aria-label="Fil d'Ariane" className="text-[0.8125rem] text-muted">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link to="/collection" className="hover:text-ink">
                Collection
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            {category && (
              <>
                <li>
                  <Link to={`/collection/${category.id}`} className="hover:text-ink">
                    {category.label}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
              </>
            )}
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>
      </div>

      <section className="wrap pt-8 pb-24 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Visuels : empilés sur grand écran, photo + vignettes sur mobile */}
          <div className="rise lg:col-span-7">
            <Media
              src={product.images[imageIndex]}
              alt={product.name}
              shape={product.shape}
              tone={product.tone}
              ratio="3 / 2"
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              artClassName="w-[84%]"
              className="rounded-[2px] lg:hidden"
            />
            {product.images.length > 1 && (
              <ul className="mt-3 grid grid-cols-4 gap-3 lg:hidden">
                {product.images.map((src, i) => (
                  <li key={src}>
                    <button
                      type="button"
                      onClick={() => setImageIndex(i)}
                      aria-label={`Afficher la photo ${i + 1}`}
                      aria-pressed={i === imageIndex}
                      className={`block w-full overflow-hidden rounded-[2px] ring-offset-2 ring-offset-paper ${i === imageIndex ? 'ring-1 ring-ink' : ''}`}
                    >
                      <img src={src} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="hidden space-y-4 lg:block">
              {(product.images.length ? product.images : [null]).map((src, i) => (
                <Media
                  key={src ?? 'illustration'}
                  src={src}
                  alt={i === 0 ? product.name : `${product.name}, vue ${i + 1}`}
                  shape={product.shape}
                  tone={product.tone}
                  ratio="3 / 2"
                  priority={i === 0}
                  sizes="58vw"
                  artClassName="w-[84%]"
                  className="rounded-[2px]"
                />
              ))}
            </div>
          </div>

          {/* Informations */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow rise text-copper-deep">Inox 3 plis · {category?.label}</p>
              <h1 className="display-md rise rise-1 mt-4">{product.name}</h1>
              <p className="rise rise-2 mt-4 text-lg leading-relaxed text-ink-2">{product.tagline}</p>

              <p className="rise rise-2 mt-8 font-display text-[2.25rem] leading-none text-ink" aria-live="polite">
                {formatPrice(size.price)}
              </p>

              <fieldset className="rise rise-3 mt-8">
                <legend className="label mb-3">{product.sizes.length > 1 ? 'Taille' : 'Format'}</legend>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s, i) => (
                    <label
                      key={s.label}
                      className={`relative inline-flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-copper ${
                        i === sizeIndex ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:border-ink'
                      }`}
                    >
                      <input
                        type="radio"
                        name="taille"
                        value={s.label}
                        checked={i === sizeIndex}
                        onChange={() => setSizeIndex(i)}
                        className="sr-only"
                      />
                      {s.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="rise rise-3 mt-8 flex flex-col gap-3">
                {size.buyUrl ? (
                  <a href={size.buyUrl} className="btn btn-primary w-full" rel="noopener">
                    Commander · {formatPrice(size.price)}
                  </a>
                ) : (
                  <Link to={orderLink} className="btn btn-primary w-full">
                    Commander · {formatPrice(size.price)}
                  </Link>
                )}
                <p className="text-center text-[0.8125rem] text-muted">
                  Livraison offerte dès {formatPrice(commerce.freeShippingFrom)} · Retours sous {commerce.returnDays} jours
                </p>
              </div>

              <div className="rise rise-4 mt-10 border-t border-line">
                <Detail title="Description" open>
                  <p>{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex gap-3">
                        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-copper" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Detail>
                <Detail title="Caractéristiques">
                  <dl className="divide-y divide-line">
                    {product.specs.map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-6 py-2.5">
                        <dt className="text-muted">{k}</dt>
                        <dd className="text-right text-ink">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Detail>
                <Detail title="Entretien">
                  <p>{CARE}</p>
                  <Link to="/entretien" className="link-underline mt-4 inline-block text-ink">
                    Lire le guide d'entretien
                  </Link>
                </Detail>
                <Detail title="Livraison et retours">
                  <p>
                    Expédition sous {commerce.shippingDelay}, livraison en {commerce.deliveryTime} en France métropolitaine.
                    Offerte dès {formatPrice(commerce.freeShippingFrom)} d'achat. Vous disposez de {commerce.returnDays} jours pour
                    changer d'avis.
                  </p>
                  <Link to="/faq" className="link-underline mt-4 inline-block text-ink">
                    Toutes les questions
                  </Link>
                </Detail>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-line bg-paper-2">
          <div className="wrap py-24 md:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 data-reveal="" className="display-md">
                Vous aimerez aussi
              </h2>
              <Link to="/collection" className="link-underline text-[0.9375rem] text-ink">
                Toute la collection
              </Link>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 80} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap py-20 text-center md:py-24">
        <p data-reveal="" className="display-sm mx-auto max-w-xl">
          Une question avant de choisir ? Nous répondons à chaque message.
        </p>
        <Link data-reveal="100" to="/contact" className="btn btn-ghost mt-8">
          Poser une question <ArrowRight />
        </Link>
      </section>
    </>
  )
}

function Detail({ title, open = false, children }) {
  return (
    <details className="accordion group border-b border-line" open={open}>
      <summary className="flex items-center justify-between py-5 text-[0.9375rem] font-medium text-ink">
        {title}
        <Plus className="chev h-4 w-4" />
      </summary>
      <div className="pb-6 text-[0.9375rem] leading-relaxed text-ink-2">{children}</div>
    </details>
  )
}
