import type { ProjectRecord } from '../types/project'

import recyclingPlatformMd from '../../docs/projects/recycling-platform.md?raw'
import hanziMd from '../../docs/projects/hanzi-play-learn.md?raw'
import backendDotnetMd from '../../docs/projects/backend-dotnet.md?raw'
import visual3dMd from '../../docs/projects/visual-3d.md?raw'
import scheduleMd from '../../docs/projects/schedule-generator.md?raw'
import intrusionMd from '../../docs/projects/intrusion-system.md?raw'
import reviewMd from '../../docs/projects/review-system.md?raw'
import breakoutMd from '../../docs/projects/breakout-game.md?raw'
import spaceMd from '../../docs/projects/space-game.md?raw'
import libraryMd from '../../docs/projects/library-system.md?raw'

import { parseProjectContent } from '../services/contentParser'

const allProjects: Array<ProjectRecord | null> = [
  parseProjectContent(recyclingPlatformMd, 'recycling-platform'),
  parseProjectContent(hanziMd, 'hanzi-play-learn'),
  parseProjectContent(backendDotnetMd, 'backend-dotnet'),
  parseProjectContent(visual3dMd, 'visual-3d'),
  parseProjectContent(scheduleMd, 'schedule-generator'),
  parseProjectContent(intrusionMd, 'intrusion-system'),
  parseProjectContent(reviewMd, 'review-system'),
  parseProjectContent(breakoutMd, 'breakout-game'),
  parseProjectContent(spaceMd, 'space-game'),
  parseProjectContent(libraryMd, 'library-system'),
]

export const featuredProjects = allProjects.filter(Boolean) as ProjectRecord[]
export const projectBySlug = Object.fromEntries(
  (allProjects.filter(Boolean) as ProjectRecord[]).map((project) => [project.slug, project]),
) as Record<string, ProjectRecord>

export const projects = featuredProjects
