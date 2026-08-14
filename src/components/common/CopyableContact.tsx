import { useState, useRef } from 'react'

type CopyableContactProps = {
  href: string
  icon: React.ReactNode
  label: string
  displayValue: string
  copyValue: string
  isExternal?: boolean
}

export function CopyableContact({ href, icon, label, displayValue, copyValue, isExternal = false }: CopyableContactProps) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    navigator.clipboard.writeText(copyValue).then(() => {
      setCopied(true)

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  return (
    <div className="contact-item-wrapper">
      <a href={href} className="contact-item" target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
        <span className="contact-icon" aria-hidden="true">
          {icon}
        </span>
        <span>
          <strong>{label}</strong>
          <small>{displayValue}</small>
        </span>
      </a>
      <button onClick={handleCopy} className="contact-copy-button" title={`Copiar ${label}`} aria-label={`Copiar ${label}`}>
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
    </div>
  )
}
