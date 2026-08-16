import { Link } from 'react-router-dom'
import { UI_TEXT } from '../config/ui'

export function NotFoundPage() {
  return (
    <main className="page-shell narrow">
      <h1>{UI_TEXT.notFound.title}</h1>
      <p>{UI_TEXT.notFound.message}</p>
      <Link to="/">{UI_TEXT.notFound.backToHome}</Link>
    </main>
  )
}
