import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import iconoUrl from '../docs/icono.png'
import App from './App.tsx'

let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
if (!favicon) {
  favicon = document.createElement('link')
  favicon.rel = 'icon'
  document.head.appendChild(favicon)
}
favicon.type = 'image/png'
favicon.href = iconoUrl

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
