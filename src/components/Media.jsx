import CookwareArt from './CookwareArt'

const TONES = {
  sand: 'bg-sand',
  stone: 'bg-stone',
  clay: 'bg-clay',
  linen: 'bg-linen',
  paper: 'bg-paper-2',
  night: 'bg-night-2',
}

/* Visuel générique : la photo si elle existe, sinon l'illustration de la pièce sur un fond teinté.
   Passer une photo = renseigner `src` ; la mise en page ne bouge pas (même ratio). */
export default function Media({
  src,
  alt = '',
  shape,
  tone = 'sand',
  ratio = '4 / 5',
  className = '',
  artClassName = 'w-[86%]',
  priority = false,
  sizes = '(min-width: 1024px) 33vw, 100vw',
}) {
  return (
    <div className={`relative overflow-hidden ${TONES[tone] || TONES.sand} ${className}`} style={{ aspectRatio: ratio }}>
      {src ? (
        <img
          src={src}
          alt={alt}
          sizes={sizes}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : undefined}
          decoding="async"
          className="card-media absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="card-media absolute inset-0 flex items-center justify-center">
          <CookwareArt shape={shape} title={alt || undefined} className={artClassName} />
        </div>
      )}
    </div>
  )
}
