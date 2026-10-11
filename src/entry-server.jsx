import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { HeadContext, buildHead, renderHead } from './lib/head'

export { getRoutes } from './routes'
export { site } from './data/site'

/* Rendu d'une adresse en HTML (utilisé par scripts/prerender.mjs au build). */
export function render(url) {
  const collector = {}
  const html = renderToString(
    <StrictMode>
      <HeadContext.Provider value={collector}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HeadContext.Provider>
    </StrictMode>,
  )
  const head = collector.title ? collector : buildHead({ pathname: url })
  return { html, head: renderHead(head), noindex: head.noindex }
}
