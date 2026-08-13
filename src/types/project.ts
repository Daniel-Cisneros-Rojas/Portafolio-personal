export type ProjectCategory = string

export type ProjectRecord = {
  slug: string
  name: string
  category: ProjectCategory[]
  shortDescription: string
  description: string
  features: string[]
  technologyNames: string[]
  repository?: string
  images: string[]
  featured?: boolean
}
