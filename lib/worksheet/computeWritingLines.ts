import type { WorksheetSettings } from '@/types/worksheet'

/**
 * Returns how many writing-grid rows to render per word.
 * Fixed to 1 row: one trace line (faded text) + one practice row.
 * Both the preview (WorksheetPreview) and the PDF (WorksheetDocument) use this
 * so the line count stays in sync between the two renderers.
 */
export function computeWritingLines(_s: WorksheetSettings): number {
  return 1
}
