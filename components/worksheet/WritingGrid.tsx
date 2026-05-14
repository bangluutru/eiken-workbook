'use client'

import type { WorksheetSettings } from '@/types/worksheet'

type Props = {
  lines: number
  settings: WorksheetSettings
}

export function WritingGrid({ lines, settings }: Props) {
  const rowHeight = 48 * settings.fontScale
  const rows = Array.from({ length: lines })

  return (
    <div className="my-2 space-y-0">
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
