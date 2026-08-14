import profileMd from '../../docs/profile.md?raw'
import { parseProfile } from '../services/contentParser'

export const profile = parseProfile(profileMd)
export const profileSummary = profile.summary
