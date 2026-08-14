export type ProjectCategory = string

export type ProjectSubsectionMap = Record<string, string>

export type ProjectRecord = {
  id: string
  slug: string
  title: string
  name: string
  category: ProjectCategory[]
  shortDescription?: string
  description?: string
  features: string[]
  technologies: Array<{ name: string; category?: string; icon?: string }>
  repository?: string
  demo?: string
  video?: string
  architecture?: string
  images: Array<{ src: string; alt?: string }>
  credentials?: string[]
  sections?: Array<{ heading: string; content: string }>
  featured?: boolean
}

export type { Project, ProjectImage, ProjectSection, SkillGroup, SkillItem, Technology } from './content'
