export type SocialLink = {
  label: string
  href: string
}

export type ProfileContent = {
  name: string
  title: string
  role: string
  email: string
  phone: string
  linkedin: string
  github: string
  summary: string
  photo: string
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  logo: string
  responsibilities: string[]
}

export type EducationEntry = {
  degree: string
  institution: string
  period: string
  area: string
}

export type CourseEntry = {
  title: string
  institution: string
  type: string
  credential?: string
  badge: string
}

export type AchievementEntry = {
  title: string
  detailLabel: string
  detailValue: string
  year: string
}

export type TechnologyRef = {
  name: string
  category?: string
}

export type Project = {
  slug: string
  name: string
  category: string[]
  shortDescription: string
  description: string
  features: string[]
  technologies: TechnologyRef[]
  repository?: string
  images: string[]
  featured?: boolean
}

export type CvAsset = {
  label: string
  href: string
}
