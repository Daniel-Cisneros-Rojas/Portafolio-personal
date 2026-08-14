import skillsMd from '../../docs/skills.md?raw'
import { parseSkills } from '../services/contentParser'

export const skills = parseSkills(skillsMd)
export const skillNames = skills.flatMap((group) => group.items.map((skill) => skill.name))
