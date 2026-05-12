export type EikenLevel =
  | '5級'
  | '4級'
  | '3級'
  | '準2級'
  | '準2級プラス'
  | '2級'
  | '準1級'
  | '1級'

export const EIKEN_LEVELS: EikenLevel[] = [
  '5級',
  '4級',
  '3級',
  '準2級',
  '準2級プラス',
  '2級',
  '準1級',
  '1級',
]

export type VocabularySource = 'built-in' | 'custom' | 'csv'

export type Vocabulary = {
  id: string
  word: string
  level: EikenLevel[]
  pos?: string
  japanese?: string
  vietnamese?: string
  meaningEn?: string
  reading?: string
  example?: string
  exampleJa?: string
  exampleVi?: string
  tags?: string[]
  source?: VocabularySource
}
