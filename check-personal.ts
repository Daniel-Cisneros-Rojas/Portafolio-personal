import raw from './docs/personal.md?raw'
import { parsePersonal } from './src/services/contentParser'

console.log(JSON.stringify(parsePersonal(raw), null, 2))
