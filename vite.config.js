import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Année figée au build : le pied de page est pré-rendu, une année calculée au chargement
// pourrait différer du HTML statique (erreur d'hydratation au passage du 1er janvier).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': '/src' },
  },
  define: {
    __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()),
  },
})
