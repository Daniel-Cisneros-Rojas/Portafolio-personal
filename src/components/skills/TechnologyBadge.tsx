import { resolveTechnologyIcon } from '../../services/technologyIcons'

type TechnologyBadgeProps = {
  name: string
}

export function TechnologyBadge({ name }: TechnologyBadgeProps) {
  const icon = resolveTechnologyIcon(name)

  return (
    <span className="technology-badge" title={icon.label}>
      <span className="technology-icon" style={{ backgroundColor: icon.color ?? '#939599' }} aria-hidden="true">
        {icon.icon}
      </span>
      <span>{icon.label}</span>
    </span>
  )
}
