'use client'

import type { WorksheetSettings } from '@/types/worksheet'

type Props = {
  lines: number
  settings: WorksheetSettings
  traceText?: string
}

/**
 * Detect whether the selected font is a "Playwrite Guides" font.
 * These fonts have 4 guide lines (ascender, x-height, baseline, descender)
 * built into every glyph. The underscore `_` renders blank guide lines.
 */
function isGuidesFont(fontFamily: string): boolean {
  return fontFamily.includes('Guides')
}

/** Resolve settings.fontFamily to a CSS font-family string. */
function resolveFontFamily(fontFamily: string): string {
  if (fontFamily === 'Helvetica') return 'inherit'
  if (fontFamily === 'Times-Roman') return "'Times New Roman', Times, serif"
  return `'${fontFamily}', cursive`
}

/**
 * WritingGrid renders trace text + practice rows for handwriting practice.
 *
 * Two rendering modes:
 * 1. **Guides fonts** (Playwrite MX/GB J Guides): The font itself draws 4 guide lines.
 *    - Trace row: render trace text — font draws guide lines through it.
 *    - Practice rows: render underscore `_` chars — font draws blank guide lines.
 *    - Spacing scales automatically with fontSize since it's part of the font metrics.
 *
 * 2. **Non-Guides fonts** (Helvetica, Times, MonteCarlo): CSS-drawn guide lines.
 *    - 4 CSS border lines positioned at fixed percentages of the row height.
 *    - Row height = fontSize × 3 for generous spacing.
 */
export function WritingGrid({ lines, settings, traceText }: Props) {
  const fontSize = settings.fontSize || 16
  const fontFamily = settings.fontFamily || 'Helvetica'
  const fontFamilyCss = resolveFontFamily(fontFamily)
  const rows = Array.from({ length: lines })

  // ─────────────────────────────────────────────────────
  // MODE 1: Playwrite Guides font — use font's built-in guide lines
  // ─────────────────────────────────────────────────────
  if (isGuidesFont(fontFamily)) {
    // Enough underscores to fill a wide row (overflow hidden will clip excess)
    const underscoreRow = '_'.repeat(100)

    const baseStyle: React.CSSProperties = {
      fontFamily: fontFamilyCss,
      fontSize,
      lineHeight: 'normal',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
    }

    return (
      <div>
        {/* Trace row — font renders guide lines behind the text automatically */}
        {traceText && (
          <div
            style={{
              ...baseStyle,
              color: `rgba(100,100,100,${settings.traceOpacity})`,
              letterSpacing: '0.15em',
            }}
          >
            {traceText}
          </div>
        )}

        {/* Practice rows — underscores render blank guide lines from the font */}
        {rows.map((_, i) => (
          <div
            key={i}
            style={{
              ...baseStyle,
              color: 'rgba(150,150,150,0.25)',
            }}
          >
            {underscoreRow}
          </div>
        ))}
      </div>
    )
  }

  // ─────────────────────────────────────────────────────
  // MODE 2: Non-Guides fonts — CSS-drawn guide lines
  // ─────────────────────────────────────────────────────
  const rowHeight = fontSize * 3

  return (
    <div className="space-y-0">
      {/* Trace row — guide lines + faded text overlay */}
      {traceText && (
        <div
          className="relative w-full"
          style={{ height: rowHeight }}
        >
          {/* Top line — bold solid dark */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{ borderTop: '1.5px solid #78716c' }}
          />
          {/* Upper midline — dashed gray */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '30%', borderTop: '1px dashed #a8a29e' }}
          />
          {/* Baseline — solid orange */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '65%', borderTop: '1px solid #e85d3a' }}
          />
          {/* Bottom line — bold solid dark */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ borderTop: '1.5px solid #78716c' }}
          />
          {/* Trace text overlay — positioned so baseline aligns with the red baseline guide at 65% */}
          <div
            className="absolute left-0 right-0 overflow-hidden whitespace-nowrap"
            style={{
              top: 0,
              height: `65%`,
              display: 'flex',
              alignItems: 'flex-end',
              fontSize,
              color: `rgba(100,100,100,${settings.traceOpacity})`,
              fontFamily: fontFamilyCss,
              letterSpacing: '0.15em',
              lineHeight: 1,
            }}
          >
            {traceText}
          </div>
        </div>
      )}

      {/* Practice rows — empty guide lines for handwriting */}
      {rows.map((_, i) => (
        <div
          key={i}
          className="relative w-full"
          style={{ height: rowHeight }}
        >
          {/* Top line — bold solid dark */}
          <div
            className="absolute top-0 left-0 right-0"
            style={{ borderTop: '1.5px solid #78716c' }}
          />
          {/* Upper midline — dashed gray */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '30%', borderTop: '1px dashed #a8a29e' }}
          />
          {/* Baseline — solid orange */}
          <div
            className="absolute left-0 right-0"
            style={{ top: '65%', borderTop: '1px solid #e85d3a' }}
          />
          {/* Bottom line — bold solid dark */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ borderTop: '1.5px solid #78716c' }}
          />
        </div>
      ))}
    </div>
  )
}
