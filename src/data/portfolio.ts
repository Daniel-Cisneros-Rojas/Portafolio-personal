import type { AchievementEntry, CourseEntry, EducationEntry, ExperienceEntry, ProfileContent } from '../types/content'
import { parseAchievements, parseCourses, parseEducation, parseExperience, parseProfile } from '../services/contentParser'

import personalMd from '../../docs/personal.md?raw'
import profileMd from '../../docs/profile.md?raw'
import experienceMd from '../../docs/experience.md?raw'
import educationMd from '../../docs/education.md?raw'
import coursesMd from '../../docs/courses.md?raw'
import achievementsMd from '../../docs/achievements.md?raw'

export const personalProfile: ProfileContent = parseProfile(personalMd)
export const profileSummary: string = parseProfile(profileMd).summary

export const experiences: ExperienceEntry[] = parseExperience(experienceMd)
export const education: EducationEntry[] = parseEducation(educationMd)
export const courses: CourseEntry[] = parseCourses(coursesMd)
export const achievements: AchievementEntry[] = parseAchievements(achievementsMd)

export const cvLinks = {
  spanish: '/cv/Daniel_Cisneros_Rojas_CV_Resume_ESP.pdf',
  english: '/cv/Daniel_Cisneros_Rojas_CV_Resume_ENG.pdf',
}
