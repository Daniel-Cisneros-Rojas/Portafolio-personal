import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      {(eyebrow || title) && (
        <div className="section-heading">
          {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
          {title ? <h2>{title}</h2> : null}
        </div>
      )}
      {children}
    </section>
  )
}
