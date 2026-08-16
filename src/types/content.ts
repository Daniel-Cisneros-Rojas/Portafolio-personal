export type SocialLink = {
  label: string
  href: string
}

export type Technology = {
  name: string
  category?: string
  icon?: string
}

export type SkillItem = Technology

export type SkillGroup = {
  title: string
  items: SkillItem[]
}

export type PersonalProfile = {
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

export type ProfileContent = PersonalProfile

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  logo?: string
  responsibilities: string[]
}

export type EducationEntry = {
  degree: string
  institution: string
  period: string
  area?: string
  logo?: string
}

export type CourseEntry = {
  title: string
  institution: string
  type?: string
  credential?: string
  verification?: string
  badge?: string
}

export type AchievementEntry = {
  title: string
  detailLabel?: string
  detailValue?: string
  year?: string
}

export type ProjectImage = {
  src: string
  alt?: string
}

export type ProjectSection = {
  heading: string
  content: string
  images?: ProjectImage[]
}

export type Project = {
  id: string
  slug: string
  title: string
  name: string
  category: string[]
  shortDescription?: string
  description?: string
  features: string[]
  technologies: Technology[]
  repository?: string
  demo?: string
  video?: string
  architecture?: string
  images: ProjectImage[]
  architectureImages?: ProjectImage[]
  credentials?: string[]
  sections?: ProjectSection[]
  featured?: boolean
}

export type TechnologyRef = Technology

export type CvAsset = {
  label: string
  href: string
}
