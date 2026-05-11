import Papa from 'papaparse'
import type { Vocabulary } from '@/types/vocabulary'
import type { EikenLevel } from '@/types/vocabulary'
import { EIKEN_LEVELS } from '@/types/vocabulary'

export type CsvImportResult = {
  valid: Vocabulary[]
  errors: { row: number; message: string }[]
}

export function parseVocabularyCsv(csvText: string): CsvImportResult {
  const { data } = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
  })

  const valid: Vocabulary[] = []
  const errors: { row: number; message: string }[] = []

  data.forEach((row, index) => {
    const rowNum = index + 2
    const word = row['word']?.trim()

    if (!word) {
      errors.push({ row: rowNum, message: 'Missing required field: word' })
      return
    }

    const rawLevel = row['level']?.trim()
    let level: EikenLevel[] = []

    if (rawLevel) {
      if (EIKEN_LEVELS.includes(rawLevel as EikenLevel)) {
        level = [rawLevel as EikenLevel]
      } else {
        errors.push({
          row: rowNum,
          message: `Invalid level: "${rawLevel}". Expected one of: ${EIKEN_LEVELS.join(', ')}`,
        })
      }
    }

    valid.push({
      id: `csv-${word.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}-${index}`,
      word,
      level,
      pos: row['pos']?.trim() || undefined,
      japanese: row['japanese']?.trim() || undefined,
      vietnamese: row['vietnamese']?.trim() || undefined,
      example: row['example']?.trim() || undefined,
      exampleJa: row['exampleJa']?.trim() || undefined,
      exampleVi: row['exampleVi']?.trim() || undefined,
      source: 'csv',
    })
  })

  return { valid, errors }
}
