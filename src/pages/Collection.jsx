import { NavLink, useParams } from 'react-router'
import { Seo } from '@/lib/head'
import PageHeader from '@/components/PageHeader'
import ProductCard from '@/components/ProductCard'
import NotFound from './NotFound'
import { categories, getCategory, products, productsIn } from '@/data/products'
import { site } from '@/data/site'

export default function Collection() {
  const { categoryId } = useParams()
  const category = categoryId ? getCategory(categoryId) : null
  if (categoryId && !category) return <NotFound />

  const list = category ? productsIn(category.id) : products
  const title = category ? category.title : 'La collection'
  const intro = category
    ? category.intro
    : "Poêles, sauteuses, casseroles et faitouts en inox 3 plis. Des pièces sans revêtement, compatibles tous feux, faites pour durer toute une vie."

  const tabClass = ({ isActive }) =>
    `inline-flex h-10 items-center rounded-full border px-4 text-sm whitespace-nowrap transition-colors ${
      isActive ? 'border-ink bg-ink text-paper' : 'border-line text-ink hover:border-ink'
    }`

  return (
    <>
      <Seo
        title={category ? category.title : 'Collection'}
        description={intro}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: list.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            url: `${site.url}/produit/${p.slug}`,
            name: p.name,
          })),
        }}
      />
      <PageHeader eyebrow={category ? 'Collection' : `${products.length} pièces`} title={title} intro={intro} />

      <nav aria-label="Catégories" className="wrap">
        <ul className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]">
          <li>
            <NavLink to="/collection" end className={tabClass}>
              Tout
            </NavLink>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <NavLink to={`/collection/${c.id}`} className={tabClass}>
                {c.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-label={title} className="wrap pt-10 pb-28 md:pt-14 md:pb-36">
        <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} delay={(i % 4) * 80} />
          ))}
        </div>
      </section>
    </>
  )
}
