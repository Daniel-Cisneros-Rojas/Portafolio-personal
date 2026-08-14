import coursesMd from '../../docs/courses.md?raw'
import { parseCourses } from '../services/contentParser'

export const courses = parseCourses(coursesMd)
