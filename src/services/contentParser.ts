import type {
  AchievementEntry,
  CourseEntry,
  EducationEntry,
  ExperienceEntry,
  ProfileContent,
  ProjectImage,
  ProjectSection,
  SkillGroup,
  SocialLink,
  Technology,
} from '../types/content'
import type { ProjectRecord } from '../types/project'
import { resolveAssetPath } from './assetResolver'

const stripMarkdown = (text: string): string =>
  text
    .replace(/^#+\s*/gm, '')
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/`/g, '')
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
    .replace(/\s+\n/g, '\n')
    .trim()

const parseList = (content: string): string[] =>
  content
    .split(/\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.replace(/^-\s*/, '').trim())
    .filter(Boolean)

const normalizeHeadingValue = (value?: string): string => stripMarkdown((value ?? '').trim())

const normalizeSectionKey = (value: string): string => value
  .replace(/^\uFEFF/, '')
  .replace(/\u00A0/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()

const parseHashSections = (content: string): Record<string, string> => {
  const sections: Record<string, string> = {}
  const lines = normalizeLineEndings(content).split(/\n/)
  let currentHeading = ''
  const currentValue: string[] = []

  for (const line of lines) {
    const headingMatch = line.match(/^##\s*(.+?)\s*$/)
    if (headingMatch) {
      if (currentHeading) {
        sections[normalizeSectionKey(currentHeading)] = currentValue.join('\n').trim()
      }
      currentHeading = headingMatch[1].trim()
      currentValue.length = 0
      continue
    }

    if (currentHeading) {
      currentValue.push(line)
    }
  }

  if (currentHeading) {
    sections[normalizeSectionKey(currentHeading)] = currentValue.join('\n').trim()
  }

  return sections
}

const findSectionValue = (sections: Record<string, string>, candidates: string[]): string => {
  for (const candidate of candidates) {
    const normalizedCandidate = normalizeSectionKey(candidate)
    const directValue = sections[normalizedCandidate]
    if (directValue) {
      return directValue
    }

    const normalizedKey = Object.keys(sections).find((key) => normalizeSectionKey(key) === normalizedCandidate)
    if (normalizedKey && sections[normalizedKey]) {
      return sections[normalizedKey]
    }
  }

  return ''
}

const inferTechnologyCategory = (name: string): string | undefined => {
  const normalized = name.trim().toLowerCase()

  if (['react', 'laravel', 'node.js', 'fastapi', 'prisma', 'tailwind css', 'blade', 'tensorflow', 'word press', 'entity framework'].some((term) => normalized.includes(term))) {
    return 'framework'
  }

  if (['sql', 'mysql', 'postgresql', 'oracle', 'database'].some((term) => normalized.includes(term))) {
    return 'database'
  }

  if (['html', 'css', 'javascript', 'typescript', 'php', 'python', 'java', 'c#', 'c++', 'kotlin', 'ruby', 'shell', 'sql'].some((term) => normalized.includes(term))) {
    return 'language'
  }

  return undefined
}

const toTechnologyObject = (name: string): Technology => ({
  name: name.trim(),
  category: inferTechnologyCategory(name),
})

const normalizeLineEndings = (text: string): string => text.replace(/\r\n/g, '\n').replace(/\r/g, '\n')

const getSectionBlock = (raw: string, heading: string): string => {
  const normalized = normalizeLineEndings(raw)
  const target = heading.trim().toLowerCase()
  const lines = normalized.split('\n')
  const sectionLines: string[] = []
  let insideSection = false

  for (const line of lines) {
    const headingMatch = line.match(/^##\s*(.+?)\s*$/)

    if (headingMatch) {
      const currentHeading = headingMatch[1].trim().toLowerCase()

      if (insideSection && currentHeading !== target) {
        break
      }

      if (currentHeading === target) {
        insideSection = true
        continue
      }
    }

    if (insideSection) {
      sectionLines.push(line)
    }
  }

  return sectionLines.join('\n').trim()
}

const normalizeImageReference = (value: string): string => {
  const withoutQuotes = value.trim().replace(/^['"`]+|['"`]+$/g, '')

  if (!withoutQuotes) {
    return ''
  }

  const markdownTarget = withoutQuotes.replace(/^!\[[^\]]*\]\((.*)\)$/, '$1')
  const cleaned = markdownTarget.trim().replace(/^<|>$/g, '')

  if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith('data:')) {
    return cleaned
  }

  if (cleaned.startsWith('/')) {
    return cleaned
  }

  if (cleaned.startsWith('./') || cleaned.startsWith('../')) {
    return `/${cleaned.replace(/^\.\//, '').replace(/^\/+/, '')}`
  }

  if (cleaned.startsWith('images/')) {
    return `/${cleaned}`
  }

  if (cleaned.startsWith('docs/images/')) {
    return `/${cleaned.replace(/^docs\//, '')}`
  }

  return `/${cleaned.replace(/^\/+/, '')}`
}

const parseProjectImagePaths = (section: string): string[] => {
  const normalizedSection = normalizeLineEndings(section)
  const candidates = parseList(normalizedSection)
    .map((item) => normalizeImageReference(item))
    .filter(Boolean)

  if (candidates.length > 0) {
    return candidates
  }

  const fallbackMatches = [...normalizedSection.matchAll(/(?:!\[[^\]]*\]\()?(?:`)?((?:https?:\/\/|\/|\.\.?\/)?(?:images\/|docs\/images\/)?[A-Za-z0-9._\-/]+\.(?:png|jpe?g|webp|svg))(?:`)?(?:\))?/gi)]
  const fallbackPaths = fallbackMatches
    .map((match) => normalizeImageReference(match[1] || ''))
    .filter(Boolean)

  return fallbackPaths
}

const toProjectImage = (imagePath: string, fallbackName?: string): ProjectImage => ({
  src: resolveAssetPath(imagePath),
  alt: fallbackName ? `${fallbackName} visual` : 'Proyecto',
})

const EXCLUDED_PROJECT_SECTIONS = [
  'Categoría',
  'Tecnologías',
  'Descripción Corta',
  'Descripción',
  'Características',
  'Repositorio',
  'Demo',
  'Video',
  'Arquitectura',
  'Imágenes',
]

const normalizeMatchKey = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const IMAGE_SECTION_SYNONYMS: Record<string, string> = {
  architecture: 'arquitectura',
  api: 'arquitectura',
  classification: 'machine learning',
  rewards: 'gamificacion',
}

type SectionAnchor = {
  key: string
  names: string[]
}

const matchImageToSection = (keyword: string, anchors: SectionAnchor[]): string | null => {
  for (const anchor of anchors) {
    if (
      anchor.names.some(
        (name) => name === keyword || (keyword.length > 3 && (name.includes(keyword) || keyword.includes(name))),
      )
    ) {
      return anchor.key
    }
  }

  const synonymTarget = IMAGE_SECTION_SYNONYMS[keyword]
  if (synonymTarget) {
    const anchor = anchors.find((candidate) => candidate.names.some((name) => name === synonymTarget))
    if (anchor) {
      return anchor.key
    }
  }

  return null
}

const ARCHITECTURE_ANCHOR_KEY = '__architecture'

export function parseProfile(raw: string): ProfileContent {
  const source = normalizeLineEndings(raw)
  const sections = parseHashSections(source)

  const name = normalizeHeadingValue(findSectionValue(sections, ['Nombre']) || 'Daniel Cisneros Rojas')
  const title = normalizeHeadingValue(findSectionValue(sections, ['Título Profesional', 'Titulo Profesional', 'Título profesional', 'Titulo profesional']) || 'Ingeniero en Ciencias de la Computación')
  const role = normalizeHeadingValue(findSectionValue(sections, ['Rol Profesional', 'Rol profesional']) || 'Desarrollador de Software')
  const email = normalizeHeadingValue(findSectionValue(sections, ['Correo Electrónico', 'Correo electronico', 'Correo electrónico', 'Email', 'Correo']))
  const phone = normalizeHeadingValue(findSectionValue(sections, ['Teléfono', 'Telefono', 'Phone', 'Teléfono Profesional', 'Telefono Profesional']))
  const linkedin = normalizeHeadingValue(findSectionValue(sections, ['LinkedIn', 'Linkedin', 'Linked In']))
  const github = normalizeHeadingValue(findSectionValue(sections, ['GitHub', 'Github']))

  const summary = stripMarkdown(
    source
      .replace(/^#.*$/gm, '')
      .replace(/##\s*Fotografía[\s\S]*$/gi, '')
      .replace(/^\s*`?\/images\/[A-Za-z0-9._\-/]+`?\s*$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .replace(/\s{2,}/g, ' ')
      .trim(),
  )
  const photoMatch = source.match(/##\s+Fotografía\s*\n\n`?([^`\n]+)`?/) ?? source.match(/##\s+Fotografía\s*\n\n([^\n]+)/)
  const photo = resolveAssetPath(photoMatch?.[1] || '/images/profile/foto-personal.png')

  return {
    name,
    title,
    role,
    email,
    phone,
    linkedin,
    github,
    summary,
    photo,
  }
}

export function parsePersonal(raw: string): ProfileContent {
  return parseProfile(raw)
}

export function parseExperience(raw: string): ExperienceEntry[] {
  const blocks = normalizeLineEndings(raw).split(/(?=^##\s)/m).map((block) => block.trim()).filter(Boolean)

  return blocks
    .map((block) => {
      const role = normalizeHeadingValue(block.match(/^##\s+(.*)$/m)?.[1])
      const company = normalizeHeadingValue(block.match(/###\s*(?:Empresa|Institución)\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])
      const logoRaw = (block.match(/###\s*Logo\s*\n\n`?([^`\n]+)`?/) ?? block.match(/###\s*Logo\s*\n\n([^\n]+)/))?.[1]?.trim()
      const period = normalizeHeadingValue(block.match(/###\s*Periodo\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])
      const responsibilities = parseList(block.match(/###\s*Responsabilidades\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1] || '')

      return {
        role,
        company,
        period,
        logo: logoRaw ? resolveAssetPath(logoRaw) : undefined,
        responsibilities,
      }
    })
    .filter((entry) => Boolean(entry.role))
}

export function parseEducation(raw: string): EducationEntry[] {
  const blocks = normalizeLineEndings(raw).split(/(?=^##\s)/m).map((block) => block.trim()).filter(Boolean)

  return blocks
    .map((block) => {
      const degree = normalizeHeadingValue(block.match(/^##\s+(.*)$/m)?.[1])
      const institution = normalizeHeadingValue(block.match(/###\s*Institución\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])
      const period = normalizeHeadingValue(block.match(/###\s*Periodo\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])
      const area = normalizeHeadingValue(block.match(/###\s*Área\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])
      const logoRaw = (block.match(/###\s*Logo\s*\n\n`?([^`\n]+)`?/) ?? block.match(/###\s*Logo\s*\n\n([^\n]+)/))?.[1]?.trim()

      return { degree, institution, period, area: area || undefined, logo: logoRaw ? resolveAssetPath(logoRaw) : undefined }
    })
    .filter((entry) => Boolean(entry.degree))
}

export function parseCourses(raw: string): CourseEntry[] {
  const blocks = normalizeLineEndings(raw).split(/(?=^##\s)/m).map((block) => block.trim()).filter(Boolean)

  return blocks.flatMap((block) => {
    const courseBlocks = block.split(/(?=^###\s)/m).map((piece) => piece.trim()).filter(Boolean)

    return courseBlocks
      .map((piece) => {
        const title = normalizeHeadingValue(piece.match(/^###\s+(.*)$/m)?.[1])
        const institution = normalizeHeadingValue(piece.match(/\*\*Institución:\*\*\s*(.*)/)?.[1])
        const type = normalizeHeadingValue(piece.match(/\*\*Tipo:\*\*\s*(.*)/)?.[1])
        const credential = (piece.match(/\*\*Credencial:\*\*\s*\n?(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
        const verification = (piece.match(/\*\*Verificación:\*\*\s*\n?(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
        const badgeRaw = (piece.match(/\*\*Insignia:\*\*\s*\n?`?([^`\n]+)`?/)?.[1] || '').trim()
        const badge = badgeRaw ? resolveAssetPath(badgeRaw) : undefined

        return {
          title,
          institution,
          type: type || undefined,
          credential,
          verification: verification || credential,
          badge,
        }
      })
      .filter((entry) => Boolean(entry.title || entry.institution || entry.type || entry.credential || entry.verification || entry.badge))
  })
}

export function parseAchievements(raw: string): AchievementEntry[] {
  const blocks = normalizeLineEndings(raw).split(/(?=^##\s|^---\s*$)/m).map((block) => block.trim()).filter(Boolean)

  return blocks
    .map((block) => {
      const title = normalizeHeadingValue(block.match(/^##\s+(.*)$/m)?.[1])
      const detailLabel = normalizeHeadingValue(block.match(/###\s*(Resultado|Participación)\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[2])
      const year = normalizeHeadingValue(block.match(/###\s*Año\s*\n\n([\s\S]*?)(?=\n###\s|\n##\s|$)/)?.[1])

      return {
        title,
        detailLabel: detailLabel || undefined,
        detailValue: detailLabel || undefined,
        year: year || undefined,
      }
    })
    .filter((entry) => Boolean(entry.title || entry.detailLabel || entry.detailValue || entry.year))
}

export function parseSkills(raw: string): SkillGroup[] {
  const blocks = normalizeLineEndings(raw)
    .split(/(?=^##\s)/m)
    .map((block) => block.trim())
    .filter(Boolean)

  return blocks
    .map((block) => {
      const title = normalizeHeadingValue(block.match(/^##\s+(.*)$/m)?.[1])
      const items = parseList(block)
      return {
        title,
        items: items.map((item) => toTechnologyObject(item)),
      }
    })
    .filter((group) => Boolean(group.title) && group.items.length > 0)
}

export function parseProjects(projectFiles: Record<string, string>): ProjectRecord[] {
  return Object.values(projectFiles)
    .map((raw) => parseProjectContent(raw))
    .filter((project): project is ProjectRecord => Boolean(project))
}

export function parseSocialLinks(raw: string): SocialLink[] {
  const sections = parseHashSections(raw)

  return [
    { label: 'LinkedIn', href: stripMarkdown(sections['LinkedIn'] || '') },
    { label: 'GitHub', href: stripMarkdown(sections['GitHub'] || '') },
  ].filter((item) => item.href)
}

export function parseProjectContent(raw: string, slugOverride?: string): ProjectRecord | null {
  const source = normalizeLineEndings(raw)
  const name = normalizeHeadingValue(source.match(/^#\s+(.*)$/m)?.[1])
  if (!name) return null

  const category = getSectionBlock(source, 'Categoría')
    .split('/')
    .map((item) => item.trim())
    .filter(Boolean)

  const shortDescription = normalizeHeadingValue(getSectionBlock(source, 'Descripción Corta'))
  const description = normalizeHeadingValue(getSectionBlock(source, 'Descripción')) || shortDescription
  const features = parseList(getSectionBlock(source, 'Características'))
  const technologies = parseList(getSectionBlock(source, 'Tecnologías')).map(toTechnologyObject)
  const repository = (source.match(/##\s*Repositorio\s*\n\s*(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
  const demo = (source.match(/##\s*Demo\s*\n\s*(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
  const video = (source.match(/##\s*Video\s*\n\s*(https?:\/\/[^\s]+)/)?.[1] || '').trim() || undefined
  const architecture = normalizeHeadingValue(getSectionBlock(source, 'Arquitectura'))
  const credentials = [...source.matchAll(/##\s+Credenciales\s*\n\s*([\s\S]*?)(?=\n##\s|$)/g)]
    .flatMap((match) => [...(match[1] || '').matchAll(/https?:\/\/[^\s]+/g)].map((urlMatch) => urlMatch[0]))
    .filter(Boolean)

  const rawImagePaths = parseProjectImagePaths(getSectionBlock(source, 'Imágenes'))
  const images = rawImagePaths.map((imagePath) => toProjectImage(imagePath, name))

  const sectionCandidates = [...source.matchAll(/\n##\s+([^\n]+)\n([\s\S]*?)(?=\n##\s|$)/g)]
    .map((match) => ({ heading: match[1].trim(), rawContent: match[2].trim() }))
    .filter(({ heading, rawContent }) => heading && rawContent)
    .filter(({ heading }) => !EXCLUDED_PROJECT_SECTIONS.includes(heading))

  const sections: ProjectSection[] = sectionCandidates.map(({ heading, rawContent }) => ({
    heading,
    content: stripMarkdown(rawContent),
    images: [],
  }))

  const anchors: SectionAnchor[] = []
  if (architecture) {
    anchors.push({ key: ARCHITECTURE_ANCHOR_KEY, names: ['arquitectura'] })
  }
  for (const candidate of sectionCandidates) {
    const subHeadings = [...candidate.rawContent.matchAll(/^###\s+(.+?)\s*$/gm)].map((match) => match[1].trim())
    anchors.push({ key: candidate.heading, names: [candidate.heading, ...subHeadings].map(normalizeMatchKey) })
  }

  const architectureImages: ProjectImage[] = []
  for (let index = 1; index < images.length; index++) {
    const rawPath = rawImagePaths[index]
    const fileName = (rawPath.split('/').pop() || '').replace(/\.(png|jpe?g|webp|svg)$/i, '')
    const keyword = normalizeMatchKey(fileName)
    const targetKey = matchImageToSection(keyword, anchors)

    if (targetKey === ARCHITECTURE_ANCHOR_KEY) {
      architectureImages.push(images[index])
    } else if (targetKey) {
      sections.find((section) => section.heading === targetKey)?.images?.push(images[index])
    }
  }

  const slug = (slugOverride || name)
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .replace(/-+/g, '-')

  return {
    id: slug,
    slug,
    title: name,
    name,
    category: category.length ? category : ['General'],
    shortDescription: shortDescription || undefined,
    description: description || undefined,
    features,
    technologies,
    repository,
    demo,
    video,
    architecture: architecture || undefined,
    images,
    architectureImages: architectureImages.length ? architectureImages : undefined,
    credentials: credentials.length ? credentials : undefined,
    sections: sections.length ? sections : undefined,
    featured: [
      'Plataforma de Reciclaje Inteligente',
      'HanziPlay&Learn',
      'Sistema de Detección de Intrusos',
    ].includes(name),
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
  return stripMarkdown(raw)
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
}

