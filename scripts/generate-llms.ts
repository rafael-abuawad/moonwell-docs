import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const root = join(import.meta.dir, '..')
const contextPath = join(root, 'llms', 'context.md')
const outputPath = join(root, 'public', 'llms-full.txt')

const raw = readFileSync(contextPath, 'utf-8')
const content = raw.replace(/^---[\s\S]*?---\n/, '').trim()

writeFileSync(outputPath, content + '\n')
console.log(`Generated ${outputPath}`)
