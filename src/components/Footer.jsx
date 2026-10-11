import { Link } from 'react-router'
import { Mark } from './Logo'
import Newsletter from './Newsletter'
import { Instagram, Mail } from './Icons'
import { legalNav, site } from '@/data/site'
import { categories } from '@/data/products'

/* global __BUILD_YEAR__ */

export default function Footer() {
  return (
    <footer className="bg-night text-on-night">
      <div className="wrap pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display-md max-w-md text-on-night">Des nouvelles de l'atelier, quatre fois par an.</p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-on-night-muted">
              Nouvelles pièces, conseils d'entretien, recettes de saison. Jamais de publicité envahissante.
            </p>
            <div className="mt-8 max-w-md">
              <Newsletter dark />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-6 md:col-start-7">
            <FooterColumn title="Collection">
              {categories.map((c) => (
                <FooterLink key={c.id} to={`/collection/${c.id}`}>
                  {c.label}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="La maison">
              <FooterLink to="/savoir-faire">Savoir-faire</FooterLink>
              <FooterLink to="/entretien">Entretien</FooterLink>
              <FooterLink to="/faq">Questions fréquentes</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterColumn>
            <FooterColumn title="Nous suivre">
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-on-night-muted transition-colors hover:text-on-night">
                  <Instagram className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 text-on-night-muted transition-colors hover:text-on-night">
                  <Mail className="h-4 w-4" /> E-mail
                </a>
              </li>
            </FooterColumn>
          </div>
        </div>

        <div aria-hidden="true" className="mt-24 flex items-end gap-4 overflow-hidden md:mt-32">
          <Mark className="mb-[1.2vw] h-[11vw] w-[14.5vw] shrink-0 text-on-night" />
          <span className="font-display text-[22vw] leading-[0.72] tracking-[-0.03em] text-on-night">Silkura</span>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-on-night/15 pt-6 text-[0.8125rem] text-on-night-muted md:flex-row md:items-center md:justify-between">
          <p>© {__BUILD_YEAR__} Silkura. Tous droits réservés.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalNav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-on-night">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }) {
  return (
    <div>
      <p className="eyebrow mb-5 text-on-night/50">{title}</p>
      <ul className="space-y-3 text-[0.9375rem]">{children}</ul>
    </div>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-on-night-muted transition-colors hover:text-on-night">
        {children}
      </Link>
    </li>
  )
}
