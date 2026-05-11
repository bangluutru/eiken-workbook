import type { Vocabulary } from '@/types/vocabulary'

export function normalizeCustomWords(text: string): Vocabulary[] {
  const lines = text.split('\n')
  const result: Vocabulary[] = []
  const seen = new Set<string>()

  for (const line of lines) {
    const word = line.trim()
    if (!word || seen.has(word.toLowerCase())) continue
    seen.add(word.toLowerCase())
    result.push({
      id: `custom-${word.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      word,
      level: [],
      source: 'custom',
    })
  }

  return result
}
