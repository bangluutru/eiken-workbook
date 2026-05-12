// One-time script to convert eiken-guru vocabulary data to eiken-workbook format.
// Run with: node scripts/convert-eiken-guru.js
const fs = require('fs')
const path = require('path')

const GURU_DIR = '/Users/tranhaibang/.gemini/antigravity/scratch/eiken-guru/data/learning/vocab'
const OUT_DIR = path.join(__dirname, '..', 'data', 'eiken')

// Returns false if example_vi appears to contain untranslated English text.
function isCleanViExample(word, exampleVi) {
  if (!exampleVi || !exampleVi.trim()) return false
  // If the English target word appears verbatim
  if (exampleVi.toLowerCase().includes(word.toLowerCase())) return false
  // Vietnamese words of 6+ chars nearly always contain diacritics.
  // A pure-ASCII word of 6+ chars is almost certainly untranslated English.
  const tokens = exampleVi.split(/\s+/)
  for (const tok of tokens) {
    const letters = tok.replace(/[^a-zA-Z]/g, '')
    if (letters.length >= 6 && letters === tok.replace(/[^a-zA-Z\-']/g, '') && /^[a-zA-Z]+$/.test(letters)) {
      return false
    }
  }
  return true
}

const GRADE_FILES = [
  { src: 'grade5.json',     dest: '5kyu.json',    levels: ['5級'],             prefix: 'g5' },
  { src: 'grade4.json',     dest: '4kyu.json',    levels: ['4級'],             prefix: 'g4' },
  { src: 'grade3.json',     dest: '3kyu.json',    levels: ['3級'],             prefix: 'g3' },
  // pre2 data serves both 準2級 and 準2級プラス (merge as requested)
  { src: 'grade_pre2.json', dest: 'pre2kyu.json', levels: ['準2級', '準2級プラス'], prefix: 'gp2' },
  { src: 'grade2.json',     dest: '2kyu.json',    levels: ['2級'],             prefix: 'g2' },
  { src: 'grade_pre1.json', dest: 'pre1kyu.json', levels: ['準1級'],           prefix: 'gp1' },
  { src: 'grade1.json',     dest: '1kyu.json',    levels: ['1級'],             prefix: 'g1' },
]

let totalConverted = 0

for (const mapping of GRADE_FILES) {
  const srcPath = path.join(GURU_DIR, mapping.src)
  const srcData = JSON.parse(fs.readFileSync(srcPath, 'utf8'))

  const converted = srcData.map((item, idx) => {
    const cleanVi = isCleanViExample(item.word, item.example_vi || '') ? (item.example_vi || '') : ''
    return {
      id: `${mapping.prefix}-${String(idx + 1).padStart(4, '0')}`,
      word: item.word || '',
      level: mapping.levels,
      pos: item.part_of_speech || '',
      japanese: item.meaning_ja || '',
      vietnamese: item.meaning_vi || '',
      meaningEn: item.meaning_en || '',
      reading: item.reading || '',
      example: item.example_en || '',
      exampleJa: item.example_ja || '',
      exampleVi: cleanVi,
      source: 'built-in',
    }
  })

  const outPath = path.join(OUT_DIR, mapping.dest)
  fs.writeFileSync(outPath, JSON.stringify(converted, null, 2), 'utf8')
  console.log(`✓  ${mapping.dest}: ${converted.length} words`)
  totalConverted += converted.length
}

// pre2plus.json is now empty — 準2級プラス words live in pre2kyu.json with both level tags
const pre2plusPath = path.join(OUT_DIR, 'pre2plus.json')
fs.writeFileSync(pre2plusPath, JSON.stringify([], null, 2), 'utf8')
console.log(`✓  pre2plus.json: 0 words (merged into pre2kyu.json)`)

console.log(`\nTotal: ${totalConverted} words converted.`)
