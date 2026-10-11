import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import Logo from './Logo'
import { Close, Menu } from './Icons'
import { nav } from '@/data/site'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  // Fermeture du menu mobile à chaque navigation.
  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menu mobile ouvert : défilement de la page bloqué, Échap pour fermer, focus gardé dans le panneau.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector('a')?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (e.key === 'Tab' && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll('a, button')
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    `relative py-2 text-[0.9375rem] transition-colors hover:text-ink ${isActive ? 'text-ink' : 'text-ink-2/80'}`

  // Le panneau mobile est rendu à côté de l'en-tête, pas dedans : le flou (backdrop-filter) de l'en-tête
  // ferait de lui le repère des éléments « fixed » et le panneau n'aurait plus la hauteur de l'écran.
  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
          scrolled || open ? 'bg-paper/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-paper'
        }`}
      >
        <div className="wrap flex h-[68px] items-center justify-between gap-6 md:h-[76px]">
          <Link to="/" className="text-ink" aria-label="Silkura, retour à l'accueil">
            <Logo className="text-[1.9rem] md:text-[2.1rem]" />
          </Link>

          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} className={linkClass}>
                    {({ isActive }) => (
                      <>
                        {item.label}
                        <span
                          aria-hidden="true"
                          className={`absolute -bottom-0.5 left-0 h-px bg-ink transition-[width] duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/contact" className="btn btn-primary hidden !min-h-[2.75rem] !px-5 text-sm md:inline-flex">
              Nous écrire
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center text-ink md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-[68px] bottom-0 z-30 overflow-y-auto bg-paper md:hidden"
      >
        <nav aria-label="Navigation mobile" className="wrap flex min-h-full flex-col pt-6 pb-10">
          <ul className="flex flex-col">
            {[{ to: '/', label: 'Accueil' }, ...nav, { to: '/contact', label: 'Contact' }].map((item) => (
              <li key={item.to} className="border-b border-line">
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `block py-4 font-display text-4xl ${isActive ? 'text-copper-deep' : 'text-ink'}`}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-auto pt-10 text-muted">Inox 3 plis · Made in France</p>
        </nav>
      </div>
    </>
  )
}
