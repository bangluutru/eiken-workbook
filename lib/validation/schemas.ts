import { z } from 'zod'

export const EikenLevelSchema = z.enum([
  '5級',
  '4級',
  '3級',
  '準2級',
  '準2級プラス',
  '2級',
  '準1級',
  '1級',
])

export const VocabularySchema = z.object({
  id: z.string().min(1),
  word: z.string().min(1),
  level: z.array(EikenLevelSchema).min(1),
  pos: z.string().optional(),
  japanese: z.string().optional(),
  vietnamese: z.string().optional(),
  meaningEn: z.string().optional(),
  reading: z.string().optional(),
  example: z.string().optional(),
  exampleJa: z.string().optional(),
  exampleVi: z.string().optional(),
  tags: z.array(z.string()).optional(),
  source: z.enum(['built-in', 'custom', 'csv']).optional(),
})

export const VocabularyArraySchema = z.array(VocabularySchema)

export const WorksheetSettingsSchema = z.object({
  paperSize: z.enum(['A4', 'Letter']),
  orientation: z.enum(['portrait', 'landscape']),
  wordsPerPage: z.union([
    z.literal('auto'),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(8),
    z.literal(10),
  ]),
  writingLines: z.number().int().min(1).max(20),
  traceStyle: z.enum(['solid', 'dotted', 'dashed']),
  traceOpacity: z.number().min(0).max(1),
  showJapanese: z.boolean(),
  showVietnamese: z.boolean(),
  showPartOfSpeech: z.boolean(),
  showExample: z.boolean(),
  showExampleJapanese: z.boolean(),
  showExampleVietnamese: z.boolean(),
  showRecall: z.boolean(),
  showReading: z.boolean().optional(),
  showMeaningEn: z.boolean().optional(),
  fontScale: z.number().min(0.5).max(2),
  fontFamily: z.string().optional(),
})
