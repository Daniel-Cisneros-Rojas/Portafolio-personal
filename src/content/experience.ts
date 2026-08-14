import experienceMd from '../../docs/experience.md?raw'
import { parseExperience } from '../services/contentParser'

export const experience = parseExperience(experienceMd)
