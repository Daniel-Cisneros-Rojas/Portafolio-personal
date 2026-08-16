import { useState } from 'react'
import { buildIconifyUrl, resolveTechnologyIcon } from '../../services/technologyIcons'

type TechnologyBadgeProps = {
  name: string
}

export function TechnologyBadge({ name }: TechnologyBadgeProps) {
  const [imageFailed, setImageFailed] = useState(false)
  const icon = resolveTechnologyIcon(name)
  const iconUrl = imageFailed ? undefined : buildIconifyUrl(icon)

  if (!iconUrl) {
    return (
      <span className="technology-badge" title={icon.label}>
        <span className="technology-icon" style={{ backgroundColor: icon.fallbackColor }} aria-hidden="true">
          {icon.abbr}
        </span>
        <span>{icon.label}</span>
      </span>
    )
  }

  return (
    <span className="technology-badge" title={icon.label}>
      <img
        className="technology-icon-image"
        src={iconUrl}
        alt=""
        width={20}
        height={20}
        loading="lazy"
        aria-hidden="true"
        onError={() => setImageFailed(true)}
      />
      <span>{icon.label}</span>
    </span>
  )
}
