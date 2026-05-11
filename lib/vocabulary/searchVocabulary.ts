import type { Vocabulary } from '@/types/vocabulary'
import type { EikenLevel } from '@/types/vocabulary'

export function filterByLevels(
  vocab: Vocabulary[],
  levels: EikenLevel[]
): Vocabulary[] {
  if (levels.length === 0) return vocab
  return vocab.filter((v) => v.level.some((l) => levels.includes(l)))
}

export function searchVocabulary(
  vocab: Vocabulary[],
  query: string
): Vocabulary[] {
  const q = query.trim().toLowerCase()
  if (!q) return vocab
  return vocab.filter(
    (v) =>
      v.word.toLowerCase().includes(q) ||
      (v.japanese ?? '').includes(q) ||
      (v.vietnamese ?? '').toLowerCase().includes(q)
  )
}

export function pickRandom(vocab: Vocabulary[], n: number): Vocabulary[] {
  const shuffled = [...vocab].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}
