import { Link } from 'react-router'
import Media from './Media'
import { formatPrice, priceFrom } from '@/data/products'

export default function ProductCard({ product, priority = false, delay }) {
  const multiple = product.sizes.length > 1
  return (
    <article data-reveal={delay ?? ''} className="group relative">
      <Link to={`/produit/${product.slug}`} className="block focus-visible:outline-none">
        <div className="relative">
          <Media
            src={product.images[0]}
            alt={product.name}
            shape={product.shape}
            tone={product.tone}
            priority={priority}
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="rounded-[2px] group-focus-visible:outline group-focus-visible:outline-2 group-focus-visible:outline-offset-4 group-focus-visible:outline-copper"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1 text-[0.6875rem] font-medium tracking-[0.08em] text-ink uppercase">
              {product.badge}
            </span>
          )}
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-[1.0625rem] leading-snug font-medium text-ink">{product.name}</h3>
            <p className="mt-1 text-sm text-muted">
              {product.sizes.length > 1 ? `${product.sizes.length} tailles` : product.sizes[0].label}
            </p>
          </div>
          <p className="shrink-0 text-[0.9375rem] text-ink">
            {multiple && <span className="text-muted">dès </span>}
            {formatPrice(priceFrom(product))}
          </p>
        </div>
      </Link>
    </article>
  )
}
