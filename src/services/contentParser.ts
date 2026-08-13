import type { AchievementEntry, CourseEntry, EducationEntry, ExperienceEntry, ProfileContent, SocialLink, TechnologyRef } from '../types/content'
import type { ProjectRecord } from '../types/project'

const toParagraphs = (text: string): string[] =>
  text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)

const stripMarkdown = (text: string): string =>
  text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .trim()

const parseList = (content: string): string[] =>
  content
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter(Boolean)

const parseHashSections = (content: string): Record<string, string> => {
  const sections: Record<string, string> = {}
  const lines = content.split(/\n/)
  let currentHeading = ''
  let currentValue: string[] = []

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.*)$/)
    if (headingMatch) {
      if (currentHeading) {
        sections[currentHeading] = currentValue.join('\n').trim()
      }
      currentHeading = headingMatch[1].trim()
      currentValue = []
      continue
    }

    if (currentHeading) {
      currentValue.push(line)
    }
  }

  if (currentHeading) {
    sections[currentHeading] = currentValue.join('\n').trim()
  }

  return sections
}

export function parseProfile(raw: string): ProfileContent {
  const sections = parseHashSections(raw)

  const name = stripMarkdown(sections['Nombre'] || 'Daniel Cisneros Rojas')
  const title = stripMarkdown(sections['Título Profesional'] || 'Ingeniero en Ciencias de la Computación')
  const role = stripMarkdown(sections['Rol Profesional'] || 'Desarrollador de Software')
  const email = stripMarkdown(sections['Correo Electrónico'] || '')
  const phone = stripMarkdown(sections['Teléfono'] || '')
  const linkedin = stripMarkdown(sections['LinkedIn'] || '')
  const github = stripMarkdown(sections['GitHub'] || '')

  const summary = stripMarkdown(raw.replace(/#.*?\n/g, '').replace(/##.*?\n/g, '').trim())

  return {
    name,
    title,
    role,
    email,
    phone,
    linkedin,
    github,
    summary,
    photo: '/images/profile/foto-personal.png',
  }
}

export function parsePersonal(raw: string): ProfileContent {
  const profile = parseProfile(raw)
  return profile
}

export function parseExperience(raw: string): ExperienceEntry[] {
  const blocks = raw.split(/(?=^##\s)/m)

  return blocks
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const lines = block.split(/\n/)
      const role = stripMarkdown(lines[0].replace(/^##\s*/, ''))
      const company = stripMarkdown((block.match(/### Empresa\n\n(.*)/s)?.[1] || '').trim())
      const logo = (block.match(/### Logo\n\n`([^`]+)`/)?.[1] || '/images/experience/mipro-logo.png').replace(/`/g, '')
      const period = stripMarkdown((block.match(/### Periodo\n\n(.*)/s)?.[1] || '').trim())
      const responsibilities = parseList(block.match(/### Responsabilidades\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')

      return {
        role,
        company,
        period,
        logo,
        responsibilities,
      }
    })
    .filter((entry) => entry.role)
}

export function parseEducation(raw: string): EducationEntry[] {
  const list = raw
    .split(/(?=^##\s)/m)
    .map((block) => block.trim())
    .filter(Boolean)

  return list.map((block) => {
    const degree = stripMarkdown((block.match(/^##\s+(.*)$/m)?.[1] || '').trim())
    const institution = stripMarkdown((block.match(/### Institución\n\n(.*)/s)?.[1] || '').trim())
    const period = stripMarkdown((block.match(/### Periodo\n\n(.*)/s)?.[1] || '').trim())
    const area = stripMarkdown((block.match(/### Área\n\n(.*)/s)?.[1] || '').trim())

    return {
      degree,
      institution,
      period,
      area,
    }
  })
}

export function parseCourses(raw: string): CourseEntry[] {
  const blocks = raw.split(/(?=^##\s)/m).map((block) => block.trim()).filter(Boolean)

  return blocks.flatMap((block) => {
    const courseBlocks = block.split(/(?=^###\s)/m).map((piece) => piece.trim()).filter(Boolean)

    return courseBlocks.map((piece) => {
      const title = stripMarkdown((piece.match(/^###\s+(.*)$/m)?.[1] || '').trim())
      const institution = stripMarkdown((piece.match(/\*\*Institución:\*\*\s*(.*)/)?.[1] || '').trim())
      const type = stripMarkdown((piece.match(/\*\*Tipo:\*\*\s*(.*)/)?.[1] || '').trim())
      const credential = (piece.match(/\*\*Credencial:\*\*\s*\n?(https?:\/\/[^\s]+)/)?.[1] || '').trim()
      const badge = (piece.match(/\*\*Insignia:\*\*\s*\n?`?([^`\n]+)`?/)?.[1] || '').trim()

      return {
        title,
        institution,
        type,
        credential: credential || undefined,
        badge,
      }
    })
  })
}

export function parseAchievements(raw: string): AchievementEntry[] {
  const blocks = raw.split(/(?=^##\s)/m).map((block) => block.trim()).filter(Boolean)

  return blocks.map((block) => {
    const title = stripMarkdown((block.match(/^##\s+(.*)$/m)?.[1] || '').trim())
    const detailLabel = stripMarkdown((block.match(/### Resultado\n\n(.*)/s)?.[1] || block.match(/### Participación\n\n(.*)/s)?.[1] || '').trim())
    const detailValue = stripMarkdown((block.match(/### Año\n\n(.*)/s)?.[1] || '').trim())

    return {
      title,
      detailLabel,
      detailValue,
      year: detailValue,
    }
  })
}

export function parseSkills(raw: string): string[] {
  const sections = parseHashSections(raw)
  const skills: string[] = []

  Object.values(sections).forEach((value) => {
    skills.push(...parseList(value))
  })

  return skills
}

export function parseProjects(projectFiles: Record<string, string>): ProjectRecord[] {
  return Object.entries(projectFiles)
    .map(([fileName, raw]) => {
      const name = stripMarkdown((raw.match(/^#\s+(.*)$/m)?.[1] || 'Proyecto').trim())
      const category = (raw.match(/## Categoría\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
        .split('/')
        .map((item) => item.trim())
        .filter(Boolean)
      const shortDescription = stripMarkdown((raw.match(/## Descripción Corta\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '').trim())
      const description = stripMarkdown((raw.match(/## Descripción\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || shortDescription).trim())
      const features = parseList(raw.match(/## Características\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
      const technologies = parseList(raw.match(/## Tecnologías\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
      const repository = (raw.match(/## Repositorio\n\n(https?:\/\/[^\s]+)/)?.[1] || '').trim()
      const images = (raw.match(/## Imágenes\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
        .split(/\n/)
        .map((line) => line.trim())
        .filter((line) => line.startsWith('- '))
        .map((line) => line.replace(/^-\s*`?/, '').replace(/`?$/, '').trim())
        .filter(Boolean)

      const projectNameValue = name.toLowerCase().trim()
      const slug = projectNameValue
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      return {
        slug: slug || fileName.replace(/\.md$/, ''),
        name,
        category: category.length ? category : ['General'],
        shortDescription,
        description,
        features,
        technologyNames: technologies,
        repository: repository || undefined,
        images,
        featured: [
          'Plataforma de Reciclaje Inteligente',
          'HanziPlay&Learn',
          'Backend .NET con Clean Architecture',
          'Sistema de Visualización 3D y Detección de Colisiones',
          'Organizador de Horarios FCC',
          'Sistema de Detección de Intrusos',
        ].includes(name),
      } satisfies ProjectRecord
    })
    .filter((item) => item.name)
}

export function parseSocialLinks(raw: string): SocialLink[] {
  const sections = parseHashSections(raw)

  return [
    { label: 'LinkedIn', href: stripMarkdown(sections['LinkedIn'] || '') },
    { label: 'GitHub', href: stripMarkdown(sections['GitHub'] || '') },
  ].filter((item) => item.href)
}

export function parseTechnologyList(items: string[]): TechnologyRef[] {
  return items.map((name) => ({
    name: name.trim(),
    category: name.includes('.') ? 'framework' : 'language',
  }))
}

export function parseProjectContent(raw: string): ProjectRecord | null {
  const name = stripMarkdown((raw.match(/^#\s+(.*)$/m)?.[1] || '').trim())
  if (!name) return null

  const category = (raw.match(/## Categoría\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)

  const shortDescription = stripMarkdown((raw.match(/## Descripción Corta\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '').trim())
  const description = stripMarkdown((raw.match(/## Descripción\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || shortDescription).trim())
  const features = parseList(raw.match(/## Características\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
  const technologies = parseList(raw.match(/## Tecnologías\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
  const repository = (raw.match(/## Repositorio\n\n(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
  const images = (raw.match(/## Imágenes\n\n([\s\S]*?)(?=\n##\s|$)/)?.[1] || '')
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s*`?/, '').replace(/`?$/, '').trim())
    .filter(Boolean)

  return {
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name,
    category: category.length ? category : ['General'],
    shortDescription,
    description,
    features,
    technologyNames: technologies,
    repository,
    images,
  }
}

export function parseSectionsFromMarkdown(raw: string): Record<string, string[]> {
  const sections: Record<string, string[]> = {}
  const matches = raw.matchAll(/^##\s+(.*)$/gm)

  for (const match of matches) {
    const heading = match[1].trim()
    sections[heading] = []
  }

  return sections
}

export function parseParagraphs(raw: string): string[] {
  return toParagraphs(stripMarkdown(raw))
}
