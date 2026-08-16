export type TechnologyIcon = {
  label: string
  abbr: string
  fallbackColor: string
  iconify?: string
  tint?: string
}

const ICONIFY_API = 'https://api.iconify.design'

const registry: Record<string, TechnologyIcon> = {
  react: { label: 'React', abbr: 'RE', fallbackColor: '#61dafb', iconify: 'devicon:react' },
  javascript: { label: 'JavaScript', abbr: 'JS', fallbackColor: '#f7df1e', iconify: 'devicon:javascript' },
  typescript: { label: 'TypeScript', abbr: 'TS', fallbackColor: '#3178c6', iconify: 'devicon:typescript' },
  php: { label: 'PHP', abbr: 'PHP', fallbackColor: '#777bb4', iconify: 'devicon:php' },
  python: { label: 'Python', abbr: 'PY', fallbackColor: '#3776ab', iconify: 'devicon:python' },
  'c#': { label: 'C#', abbr: 'C#', fallbackColor: '#178600', iconify: 'devicon:csharp' },
  'c++': { label: 'C++', abbr: 'C++', fallbackColor: '#00599c', iconify: 'devicon:cplusplus' },
  java: { label: 'Java', abbr: 'JV', fallbackColor: '#ed8b00', iconify: 'devicon:java' },
  sql: { label: 'SQL', abbr: 'SQL', fallbackColor: '#336791' },
  shell: { label: 'Shell', abbr: 'SH', fallbackColor: '#4eaa25' },
  laravel: { label: 'Laravel', abbr: 'LV', fallbackColor: '#ff2d20', iconify: 'devicon:laravel' },
  '.net': { label: '.NET', abbr: '.NET', fallbackColor: '#512bd4', iconify: 'devicon:dotnetcore' },
  'entity framework': { label: 'Entity Framework', abbr: 'EF', fallbackColor: '#512bd4', iconify: 'devicon:dotnetcore' },
  'node.js': { label: 'Node.js', abbr: 'NODE', fallbackColor: '#339933', iconify: 'devicon:nodejs' },
  fastapi: { label: 'FastAPI', abbr: 'FA', fallbackColor: '#009688', iconify: 'devicon:fastapi' },
  tensorflow: { label: 'TensorFlow', abbr: 'TF', fallbackColor: '#ff6f00', iconify: 'devicon:tensorflow' },
  opentk: { label: 'OpenTK', abbr: 'OTK', fallbackColor: '#3e8e41' },
  prisma: { label: 'Prisma', abbr: 'PR', fallbackColor: '#2d3748', iconify: 'devicon:prisma' },
  postgresql: { label: 'PostgreSQL', abbr: 'PG', fallbackColor: '#336791', iconify: 'devicon:postgresql' },
  mysql: { label: 'MySQL', abbr: 'MY', fallbackColor: '#4479a1', iconify: 'devicon:mysql' },
  'oracle database': { label: 'Oracle Database', abbr: 'OR', fallbackColor: '#f80000', iconify: 'devicon:oracle' },
  html: { label: 'HTML', abbr: 'HTML', fallbackColor: '#e34f26', iconify: 'devicon:html5' },
  html5: { label: 'HTML5', abbr: 'HTML', fallbackColor: '#e34f26', iconify: 'devicon:html5' },
  css: { label: 'CSS', abbr: 'CSS', fallbackColor: '#1572b6', iconify: 'devicon:css3' },
  css3: { label: 'CSS3', abbr: 'CSS', fallbackColor: '#1572b6', iconify: 'devicon:css3' },
  wordpress: { label: 'WordPress', abbr: 'WP', fallbackColor: '#21759b', iconify: 'devicon:wordpress' },
  'rest api': { label: 'REST API', abbr: 'API', fallbackColor: '#3b82f6' },
  'rest apis': { label: 'REST APIs', abbr: 'API', fallbackColor: '#3b82f6' },
  'hanziwriter api': { label: 'HanziWriter API', abbr: 'HW', fallbackColor: '#0ea5e9' },
  git: { label: 'Git', abbr: 'GT', fallbackColor: '#f05032', iconify: 'devicon:git' },
  github: { label: 'GitHub', abbr: 'GH', fallbackColor: '#181717', iconify: 'devicon:github' },
  firebase: { label: 'Firebase', abbr: 'FB', fallbackColor: '#ffca28', iconify: 'devicon:firebase' },
  postman: { label: 'Postman', abbr: 'PM', fallbackColor: '#ff6c37', iconify: 'devicon:postman' },
  linux: { label: 'Linux', abbr: 'LNX', fallbackColor: '#fcc624', iconify: 'devicon:linux' },
  aws: { label: 'AWS', abbr: 'AWS', fallbackColor: '#ff9900', iconify: 'simple-icons:amazonaws', tint: '#ff9900' },
  esp32: { label: 'ESP32', abbr: 'ESP', fallbackColor: '#e7352c', iconify: 'simple-icons:espressif', tint: '#e7352c' },
  arduino: { label: 'Arduino', abbr: 'AR', fallbackColor: '#00979d', iconify: 'devicon:arduino' },
  kotlin: { label: 'Kotlin', abbr: 'KT', fallbackColor: '#7f52ff', iconify: 'devicon:kotlin' },
  opengl: { label: 'OpenGL', abbr: 'GL', fallbackColor: '#5586a4', iconify: 'devicon:opengl' },
  'tailwind css': { label: 'Tailwind CSS', abbr: 'TW', fallbackColor: '#06b6d4', iconify: 'devicon:tailwindcss' },
  blade: { label: 'Blade', abbr: 'BD', fallbackColor: '#f55353', iconify: 'devicon:laravel' },
  apache: { label: 'Apache', abbr: 'AP', fallbackColor: '#d22128', iconify: 'devicon:apache' },
  xampp: { label: 'XAMPP', abbr: 'XMP', fallbackColor: '#f15a24', iconify: 'logos:xampp' },
  phpmailer: { label: 'PHPMailer', abbr: 'PM', fallbackColor: '#939599' },
}

const normalizeTechName = (name: string): string =>
  name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\s+\d+(?:\.\d+)*$/, '')

export function resolveTechnologyIcon(name: string): TechnologyIcon {
  const normalized = normalizeTechName(name)
  const directMatch = registry[normalized]

  if (directMatch) {
    return directMatch
  }

  const fuzzyMatch = Object.entries(registry).find(([key]) => {
    if (normalized.includes(key)) {
      return true
    }
    return normalized.length >= 4 && key.includes(normalized)
  })

  if (fuzzyMatch) {
    return fuzzyMatch[1]
  }

  const trimmed = name.trim()
  return { label: trimmed, abbr: trimmed.slice(0, 2).toUpperCase() || 'TECH', fallbackColor: '#939599' }
}

export function buildIconifyUrl(icon: TechnologyIcon): string | undefined {
  if (!icon.iconify) {
    return undefined
  }

  const baseUrl = `${ICONIFY_API}/${icon.iconify}.svg`
  return icon.tint ? `${baseUrl}?color=${encodeURIComponent(icon.tint)}` : baseUrl
}
