type SectionHeaderProps = {
  eyebrow?: string
  title: string
  align?: 'left' | 'center'
}

export function SectionHeader({ eyebrow, title, align = 'left' }: SectionHeaderProps) {
  return (
    <div className={`section-header ${align}`}>
      {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
    </div>
  )
}
