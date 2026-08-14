import achievementsMd from '../../docs/achievements.md?raw'
import { parseAchievements } from '../services/contentParser'

export const achievements = parseAchievements(achievementsMd)
