import type { Vocabulary } from '@/types/vocabulary'
import { VocabularyArraySchema } from '@/lib/validation/schemas'

import data5kyu from '@/data/eiken/5kyu.json'
import data4kyu from '@/data/eiken/4kyu.json'
import data3kyu from '@/data/eiken/3kyu.json'
import dataPre2kyu from '@/data/eiken/pre2kyu.json'
import dataPre2plus from '@/data/eiken/pre2plus.json'
import data2kyu from '@/data/eiken/2kyu.json'
import dataPre1kyu from '@/data/eiken/pre1kyu.json'
import data1kyu from '@/data/eiken/1kyu.json'

function parseLevel(raw: unknown[]): Vocabulary[] {
  const result = VocabularyArraySchema.safeParse(raw)
  if (!result.success) {
    console.warn('Vocabulary validation errors:', result.error.issues)
    return []
  }
  return result.data as Vocabulary[]
}

let _cached: Vocabulary[] | null = null

export function loadAllVocabulary(): Vocabulary[] {
  if (_cached) return _cached

  const all = [
    ...parseLevel(data5kyu),
    ...parseLevel(data4kyu),
    ...parseLevel(data3kyu),
    ...parseLevel(dataPre2kyu),
    ...parseLevel(dataPre2plus),
    ...parseLevel(data2kyu),
    ...parseLevel(dataPre1kyu),
    ...parseLevel(data1kyu),
  ]

  _cached = all
  return all
}
