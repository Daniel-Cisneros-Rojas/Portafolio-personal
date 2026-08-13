type ButtonLinkProps = {
  href: string
  children: string
  variant?: 'primary' | 'secondary'
  external?: boolean
}

export function ButtonLink({ href, children, variant = 'primary', external = false }: ButtonLinkProps) {
  const isExternal = external || /^https?:\/\//.test(href)

  return (
    <a
      className={`button-link ${variant}`}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
    </a>
  )
}
