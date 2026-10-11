import { Link } from 'react-router'
import { Seo } from '@/lib/head'
import CookwareArt from '@/components/CookwareArt'
import { ArrowRight } from '@/components/Icons'

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" description="Cette page n'existe pas ou a été déplacée." noindex />
      <section className="wrap flex flex-col items-center py-20 text-center md:py-28">
        <CookwareArt shape="poele" className="rise w-64 -rotate-6 md:w-80" />
        <p className="eyebrow rise rise-1 mt-6 text-copper-deep">Erreur 404</p>
        <h1 className="display-lg rise rise-2 mt-4 max-w-2xl">Cette page a dû rester sur le feu.</h1>
        <p className="lede rise rise-3 mt-5 max-w-md text-ink-2">Elle n'existe pas, ou plus. Le reste du site, lui, est bien là.</p>
        <div className="rise rise-4 mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/collection" className="btn btn-ghost">
            La collection <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  )
}
