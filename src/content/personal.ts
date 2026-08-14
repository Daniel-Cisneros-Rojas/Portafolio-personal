import personalMd from '../../docs/personal.md?raw'
import { parsePersonal } from '../services/contentParser'

export const personal = parsePersonal(personalMd)
