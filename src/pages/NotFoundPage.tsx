import { ButtonLink } from '../components/common/ButtonLink'
import { UI_TEXT } from '../config/ui'

export function NotFoundPage() {
  return (
    <main className="page-shell narrow">
      <section className="not-found-panel">
        <span className="not-found-code" aria-hidden="true">404</span>
        <h1>{UI_TEXT.notFound.title}</h1>
        <p>{UI_TEXT.notFound.message}</p>
        <ButtonLink href="/" variant="primary">{UI_TEXT.notFound.backToHome}</ButtonLink>
      </section>
    </main>
  )
}
