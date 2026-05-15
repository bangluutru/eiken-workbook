'use client'

import type { WorksheetSettings } from '@/types/worksheet'

type Props = {
  lines: number
  settings: WorksheetSettings
  traceText?: string
}

/**
 * Writing grid with 4-line guide system per row.
 * Lines: top (solid dark), upper-mid (dashed gray), baseline (solid red), bottom (solid dark).
 * If traceText is provided, the first row will overlay the faded trace text on top of the guide lines.
 * All rows share the same height so the trace row and practice rows are visually consistent.
 */
export function WritingGrid({ lines, settings, traceText }: Props) {
  const fontSize = settings.fontSize || 16
  const rowHeight = fontSize * 3
  const rows = Array.from({ length: lines })

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
              fontSize: fontSize,
              color: `rgba(100,100,100,${settings.traceOpacity})`,
              fontFamily: settings.fontFamily === 'Helvetica' ? 'inherit' : settings.fontFamily === 'Times-Roman' ? "'Times New Roman', Times, serif" : `'${settings.fontFamily}', cursive`,
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
