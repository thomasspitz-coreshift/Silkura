import { useState } from 'react'
import { submitNetlifyForm } from '@/lib/forms'
import { ArrowRight } from './Icons'

export default function Newsletter({ dark = false }) {
  const [status, setStatus] = useState('idle') // idle | sending | done | error

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

  if (status === 'done') {
    return (
      <p role="status" className={`text-[0.9375rem] ${dark ? 'text-on-night' : 'text-ink'}`}>
        Merci, c'est noté. Vous recevrez la prochaine lettre.
      </p>
    )
  }

  return (
    <form name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="w-full">
      <input type="hidden" name="form-name" value="newsletter" />
      <p hidden>
        <label>
          Ne pas remplir : <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <label htmlFor="newsletter-email" className="sr-only">
        Adresse e-mail
      </label>
      <div className={`flex items-center border-b ${dark ? 'border-on-night/30 focus-within:border-on-night' : 'border-line focus-within:border-ink'} transition-colors`}>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Votre adresse e-mail"
          className={`min-w-0 flex-1 bg-transparent py-3.5 text-[0.9375rem] outline-none ${
            dark ? 'text-on-night placeholder:text-on-night-muted' : 'text-ink placeholder:text-muted'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className={`inline-flex h-11 items-center gap-2 pl-4 text-sm font-medium ${dark ? 'text-on-night' : 'text-ink'} disabled:opacity-50`}
        >
          {status === 'sending' ? 'Envoi…' : "S'inscrire"}
          <ArrowRight />
        </button>
      </div>
      {status === 'error' && (
        <p role="alert" className="mt-3 text-sm text-copper">
          L'inscription n'a pas abouti. Réessayez dans un instant.
        </p>
      )}
    </form>
  )
}
