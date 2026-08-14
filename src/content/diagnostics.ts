import { projects } from './projects'
import { diagnoseAssetPath } from '../services/assetResolver'

export type ContentDiagnostic = {
  project: string
  originalPath: string
  resolvedPath: string
  status: 'ok' | 'error'
}

export const contentDiagnostics: ContentDiagnostic[] = projects.flatMap((project) =>
  project.images.map((image) => {
    const diagnostic = diagnoseAssetPath(image.src, project.slug)

    return {
      project: project.slug,
      originalPath: diagnostic.originalPath,
      resolvedPath: diagnostic.resolvedPath,
      status: diagnostic.status,
    }
  }),
)

if (import.meta.env.DEV) {
  console.table(contentDiagnostics)
}
