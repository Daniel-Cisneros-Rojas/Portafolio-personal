const technologyIcons: Record<string, { label: string; icon: string; color?: string }> = {
  react: { label: 'React', icon: '⚛', color: '#61dafb' },
  'react.js': { label: 'React', icon: '⚛', color: '#61dafb' },
  javascript: { label: 'JavaScript', icon: 'JS', color: '#f7df1e' },
  typescript: { label: 'TypeScript', icon: 'TS', color: '#3178c6' },
  php: { label: 'PHP', icon: 'PHP', color: '#777bb4' },
  python: { label: 'Python', icon: 'PY', color: '#3776ab' },
  'c#': { label: 'C#', icon: 'C#', color: '#178600' },
  csharp: { label: 'C#', icon: 'C#', color: '#178600' },
  'c++': { label: 'C++', icon: 'C++', color: '#00599c' },
  java: { label: 'Java', icon: 'Java', color: '#ed8b00' },
  laravel: { label: 'Laravel', icon: 'L', color: '#ff2d20' },
  '.net': { label: '.NET', icon: '.NET', color: '#512bd4' },
  'entity framework': { label: 'Entity Framework', icon: 'EF', color: '#512bd4' },
  mysql: { label: 'MySQL', icon: 'MySQL', color: '#4479a1' },
  postgresql: { label: 'PostgreSQL', icon: 'PG', color: '#336791' },
  tensorflow: { label: 'TensorFlow', icon: 'TF', color: '#ff6f00' },
  mongo: { label: 'MongoDB', icon: 'MDB', color: '#47a248' },
  firebase: { label: 'Firebase', icon: 'Firebase', color: '#ffca28' },
  html: { label: 'HTML', icon: 'HTML', color: '#e34f26' },
  css: { label: 'CSS', icon: 'CSS', color: '#1572b6' },
  git: { label: 'Git', icon: 'Git', color: '#f05032' },
  github: { label: 'GitHub', icon: 'GitHub', color: '#181717' },
  sql: { label: 'SQL', icon: 'SQL', color: '#336791' },
  android: { label: 'Android', icon: 'A', color: '#3ddc84' },
  kotlin: { label: 'Kotlin', icon: 'K', color: '#7f52ff' },
  'open tk': { label: 'OpenTK', icon: 'OTK', color: '#3e8e41' },
  opengl: { label: 'OpenGL', icon: 'GL', color: '#5586a4' },
  'esp32': { label: 'ESP32', icon: 'ESP32', color: '#1e90ff' },
  'tailwind css': { label: 'Tailwind CSS', icon: 'TW', color: '#06b6d4' },
  blade: { label: 'Blade', icon: 'B', color: '#f55353' },
  'hanziwriter api': { label: 'HanziWriter API', icon: 'HW', color: '#0ea5e9' },
  'rest api': { label: 'REST API', icon: 'API', color: '#3b82f6' },
  'apache': { label: 'Apache', icon: 'A', color: '#d22128' },
  'xampp': { label: 'XAMPP', icon: 'X', color: '#f15a24' },
  'word press': { label: 'WordPress', icon: 'WP', color: '#21759b' },
  'linux': { label: 'Linux', icon: 'LIN', color: '#fcc624' },
  aws: { label: 'AWS', icon: 'AWS', color: '#ff9900' },
  'node.js': { label: 'Node.js', icon: 'NODE', color: '#339933' },
  'fastapi': { label: 'FastAPI', icon: 'FA', color: '#009688' },
  'prisma': { label: 'Prisma', icon: 'P', color: '#2d3748' },
  'postman': { label: 'Postman', icon: 'P', color: '#ff6c37' },
  'phpmailer': { label: 'PHPMailer', icon: 'PM', color: '#7f88ff' },
  'html5': { label: 'HTML5', icon: 'HTML', color: '#e34f26' },
  'css3': { label: 'CSS3', icon: 'CSS', color: '#1572b6' },
  'ruby': { label: 'Ruby', icon: 'RB', color: '#cc342d' },
}

export function resolveTechnologyIcon(name: string) {
  const normalized = name.trim().toLowerCase()
  const directMatch = technologyIcons[normalized]

  if (directMatch) {
    return directMatch
  }

  const fallback = Object.entries(technologyIcons).find(([key]) => normalized.includes(key))

  return fallback ? fallback[1] : { label: name, icon: name.slice(0, 2).toUpperCase() || 'TECH', color: '#939599' }
}
