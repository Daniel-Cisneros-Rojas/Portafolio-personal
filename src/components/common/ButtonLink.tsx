import { Link } from 'react-router-dom'

type ButtonLinkProps = {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'github' | 'linkedin'
  external?: boolean
}

export function ButtonLink({ href, children, variant = 'primary', external = false }: ButtonLinkProps) {
  const isExternal = external || /^https?:\/\//.test(href)

  if (isExternal) {
    return (
      <a
        className={`button-link ${variant}`}
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <Link className={`button-link ${variant}`} to={href}>
      {children}
    </Link>
  )
}
