import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import '@fontsource-variable/geist'
import '@fontsource/instrument-serif/400.css'
import '@fontsource/instrument-serif/400-italic.css'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// En production, la page arrive pré-rendue : React s'y raccroche (hydratation).
// En développement, #root ne contient qu'un commentaire : rendu classique.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
