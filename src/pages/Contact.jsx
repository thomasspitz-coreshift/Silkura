import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { Seo } from '@/lib/head'
import PageHeader from '@/components/PageHeader'
import { ArrowRight, Instagram, Mail } from '@/components/Icons'
import { submitNetlifyForm } from '@/lib/forms'
import { site } from '@/data/site'

const SUBJECTS = [
  ['question', 'Une question sur une pièce'],
  ['commande', 'Passer commande'],
  ['sav', 'Garantie, entretien, réparation'],
  ['pro', 'Professionnels (restaurants, écoles)'],
  ['presse', 'Presse et partenariats'],
  ['autre', 'Autre chose'],
]

export default function Contact() {
  const [params] = useSearchParams()
  const [subject, setSubject] = useState('question')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | done | error

  // Pré-remplissage depuis une fiche produit (/contact?sujet=commande&piece=…).
  // Fait après le premier rendu : la page statique est générée sans paramètres.
  useEffect(() => {
    const s = params.get('sujet')
    if (s && SUBJECTS.some(([id]) => id === s)) setSubject(s)
    const piece = params.get('piece')
    if (piece) setMessage(`Bonjour,\n\nJe souhaite commander : ${piece}.\n\n`)
  }, [params])

  async function onSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    try {
      await submitNetlifyForm(e.currentTarget)
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo title="Contact" description="Une question sur une pièce, une commande, un projet professionnel ? Écrivez à Silkura, nous répondons à chaque message sous 48 h." />
      <PageHeader eyebrow="Contact" title="Écrivez-nous." intro="Une question, une commande, une poêle à sauver ? Nous répondons à chaque message, en général sous 48 heures." />

      <section className="wrap pb-28 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {status === 'done' ? (
              <div role="status" className="bg-paper-2 p-10 md:p-14">
                <p className="display-md">Merci, message bien reçu.</p>
                <p className="mt-4 max-w-md leading-relaxed text-ink-2">Nous revenons vers vous très vite, à l'adresse indiquée.</p>
                <Link to="/collection" className="btn btn-ghost mt-8">
                  Retour à la collection <ArrowRight />
                </Link>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-10">
                <input type="hidden" name="form-name" value="contact" />
                <p hidden>
                  <label>
                    Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div>
                    <label htmlFor="nom" className="label">
                      Nom
                    </label>
                    <input id="nom" name="nom" required autoComplete="name" className="field" />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">
                      E-mail
                    </label>
                    <input id="email" name="email" type="email" required autoComplete="email" className="field" />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="label">
                    Sujet
                  </label>
                  <select id="sujet" name="sujet" value={subject} onChange={(e) => setSubject(e.target.value)} className="field">
                    {SUBJECTS.map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="field resize-y"
                  />
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-sm text-[0.8125rem] leading-relaxed text-muted">
                    Vos informations servent uniquement à vous répondre.{' '}
                    <Link to="/confidentialite" className="underline underline-offset-2 hover:text-ink">
                      En savoir plus
                    </Link>
                  </p>
                  <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Envoi en cours…' : 'Envoyer'} <ArrowRight />
                  </button>
                </div>

                {status === 'error' && (
                  <p role="alert" className="text-sm text-copper-deep">
                    L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à{' '}
                    <a href={`mailto:${site.email}`} className="underline">
                      {site.email}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <div className="space-y-10 border-t border-line pt-8">
              <div>
                <p className="label">Par e-mail</p>
                <a href={`mailto:${site.email}`} className="mt-3 inline-flex items-center gap-3 text-lg text-ink hover:text-copper-deep">
                  <Mail /> {site.email}
                </a>
              </div>
              <div>
                <p className="label">Sur Instagram</p>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-3 text-lg text-ink hover:text-copper-deep">
                  <Instagram /> {site.instagramHandle}
                </a>
              </div>
              <div>
                <p className="label">Professionnels</p>
                <p className="mt-3 leading-relaxed text-ink-2">
                  Restaurants, écoles de cuisine, boutiques : nous proposons des tarifs et des conditions dédiés. Choisissez « Professionnels » dans le sujet.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
