import educationMd from '../../docs/education.md?raw'
import { parseEducation } from '../services/contentParser'

export const education = parseEducation(educationMd)
