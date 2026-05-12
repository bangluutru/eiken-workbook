import type { WorksheetSettings } from '@/types/worksheet'

// Usable page height in PDF points (page height minus top+bottom padding of 30pt each)
const PAGE_USABLE_PT: Record<string, number> = {
  'A4-portrait':      781.89,
  'A4-landscape':     535.28,
  'Letter-portrait':  732,
  'Letter-landscape': 552,
}

// Scalable overhead = the sum of text-line heights that grow with fontScale.
// Calibrated so that 3 words / all sections / fontScale=1 on A4 portrait → ~5 lines.
//   header(20pt) + trace(17pt) = 37pt base
//   + example sentence(12pt) + ja(12pt) + vi(12pt) if visible
//   + recall label+line(30pt) if visible
function scalableOverheadPt(s: WorksheetSettings): number {
  let h = 37
  if (s.showExample) {
    h += 12
    if (s.showExampleJapanese)   h += 12
    if (s.showExampleVietnamese) h += 12
  }
  if (s.showRecall) h += 30
  return h
}

// Fixed overhead per word block: border, padding, margins — unaffected by fontScale
const FIXED_OVERHEAD_PT = 60

/**
 * Returns how many writing-grid rows fit per word given the current settings.
 * Both the preview (WorksheetPreview) and the PDF (WorksheetDocument) use this
 * so the line count stays in sync between the two renderers.
 */
export function computeWritingLines(s: WorksheetSettings): number {
  const n = s.wordsPerPage === 'auto' ? 3 : s.wordsPerPage
  const pageH = PAGE_USABLE_PT[`${s.paperSize}-${s.orientation}`] ?? PAGE_USABLE_PT['A4-portrait']
  const overhead = FIXED_OVERHEAD_PT + scalableOverheadPt(s) * s.fontScale
  const rowPt = 20 * s.fontScale
  const remaining = pageH - n * overhead
  return Math.max(0, Math.round(remaining / (n * rowPt)))
}
