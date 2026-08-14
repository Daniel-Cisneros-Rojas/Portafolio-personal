const imageModules = import.meta.glob('../../docs/images/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export type AssetDiagnostic = {
  context: string
  originalPath: string
  resolvedPath: string
  status: 'ok' | 'error'
}

const normalizeAssetReference = (value: string): string => {
  const cleaned = value.trim().replace(/^['"`]+|['"`]+$/g, '').replace(/^[<>]+|[<>]+$/g, '')

  if (!cleaned) {
    return ''
  }

  if (/^https?:\/\//i.test(cleaned) || cleaned.startsWith('data:')) {
    return cleaned
  }

  const withoutMarkdownLink = cleaned.replace(/^!\[[^\]]*\]\((.*)\)$/, '$1')
  const normalized = withoutMarkdownLink
    .replace(/^\/+/, '')
    .replace(/^docs\//, '')
    .replace(/^images\//, '')
    .replace(/^\.?\.\//, '')
    .replace(/^\.?\.\/\//, '')

  return normalized
}

export function resolveAssetPath(value?: string): string {
  if (!value) {
    return ''
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return ''
  }

  if (/^https?:\/\//i.test(trimmed) || trimmed.startsWith('data:')) {
    return trimmed
  }

  const normalized = normalizeAssetReference(trimmed)
  const candidates = [
    normalized,
    `images/${normalized}`,
    `docs/images/${normalized}`,
    `/${normalized}`,
    `/${normalized.replace(/^images\//, '')}`,
  ]

  const match = Object.entries(imageModules).find(([modulePath]) =>
    candidates.some((candidate) => modulePath.endsWith(`/${candidate}`) || modulePath.endsWith(candidate)),
  )

  if (match) {
    return match[1]
  }

  return trimmed
}

export function diagnoseAssetPath(value: string | undefined, context: string): AssetDiagnostic {
  const originalPath = value?.trim() ?? ''

  if (!originalPath) {
    return {
      context,
      originalPath: '',
      resolvedPath: '',
      status: 'error',
    }
  }

  if (/^https?:\/\//i.test(originalPath) || originalPath.startsWith('data:')) {
    return {
      context,
      originalPath,
      resolvedPath: originalPath,
      status: 'ok',
    }
  }

  const resolvedPath = resolveAssetPath(originalPath)
  const isMissing = originalPath.startsWith('/') && resolvedPath === originalPath

  return {
    context,
    originalPath,
    resolvedPath,
    status: isMissing ? 'error' : 'ok',
  }
}

export function isExternalUrl(value?: string): boolean {
  return typeof value === 'string' && /^https?:\/\//i.test(value.trim())
}
