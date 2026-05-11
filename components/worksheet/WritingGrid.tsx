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
          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 border-t border-gray-400" />
          {/* Upper midline (dashed) */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-gray-300"
            style={{ top: '30%' }}
          />
          {/* Baseline */}
          <div
            className="absolute left-0 right-0 border-t border-gray-400"
            style={{ top: '65%' }}
          />
          {/* Bottom line */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-gray-300" />
        </div>
      ))}
    </div>
  )
}
