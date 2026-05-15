import type { Vocabulary } from './vocabulary'
import type { PdfFontFamily } from '@/pdf/fontRegistry'

export type TraceStyle = 'solid' | 'dotted' | 'dashed'

export type WorksheetSettings = {
  paperSize: 'A4' | 'Letter'
  orientation: 'portrait' | 'landscape'
  wordsPerPage: 'auto' | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10
  writingLines: number
  traceStyle: TraceStyle
  traceOpacity: number
  showJapanese: boolean
  showVietnamese: boolean
  showPartOfSpeech: boolean
  showExample: boolean
  showExampleJapanese: boolean
  showExampleVietnamese: boolean
  showRecall: boolean
  showReading: boolean
  showMeaningEn: boolean
  fontSize: number
  fontFamily: PdfFontFamily
}

export type WorksheetBlock = {
  vocabulary: Vocabulary
  settings: WorksheetSettings
}

export const DEFAULT_SETTINGS: WorksheetSettings = {
  paperSize: 'A4',
  orientation: 'portrait',
  wordsPerPage: 3,
  writingLines: 1,
  traceStyle: 'dotted',
  traceOpacity: 0.25,
  showJapanese: true,
  showVietnamese: true,
  showPartOfSpeech: true,
  showExample: true,
  showExampleJapanese: true,
  showExampleVietnamese: true,
  showRecall: true,
  showReading: true,
  showMeaningEn: false,
  fontSize: 16,
  fontFamily: 'Helvetica',
}
