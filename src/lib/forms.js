/* Envoi des formulaires vers Netlify Forms (aucun serveur à maintenir).
   Netlify repère les formulaires dans le HTML pré-rendu grâce à data-netlify="true" et au champ
   caché form-name ; les envois arrivent dans l'interface Netlify (et par e-mail si configuré).
   Le champ « bot-field » est un piège à robots : invisible pour un humain, rempli par les spams. */

export async function submitNetlifyForm(formElement) {
  const data = new FormData(formElement)
  const body = new URLSearchParams()
  for (const [key, value] of data.entries()) body.append(key, String(value))

  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })
  if (!response.ok) throw new Error(`Envoi refusé (${response.status})`)
}
