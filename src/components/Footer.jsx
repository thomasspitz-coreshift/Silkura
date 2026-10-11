import { Link } from 'react-router'
import { Ornament, Tricolore } from './Logo'
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

        <div aria-hidden="true" className="mt-24 flex flex-col items-center text-center md:mt-32">
          <span className="font-display text-[24vw] leading-[0.8] font-normal tracking-[-0.01em] text-on-night md:text-[17vw]">Silkura</span>
          <Ornament className="mt-6 text-on-night-muted" />
          <span className="mt-4 text-[0.6875rem] tracking-[0.34em] text-on-night-muted uppercase">Made in France</span>
          <Tricolore className="mt-3" />
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
      <p className="eyebrow mb-5 text-copper-light">{title}</p>
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
