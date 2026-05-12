'use client'

import type { Vocabulary } from '@/types/vocabulary'
import type { WorksheetSettings } from '@/types/worksheet'
import { WritingGrid } from './WritingGrid'

type Props = {
  vocabulary: Vocabulary
  settings: WorksheetSettings
  index: number
}

function getTraceBorderStyle(style: string): string {
  switch (style) {
    case 'dotted':
      return 'dotted'
    case 'dashed':
      return 'dashed'
    default:
      return 'solid'
  }
}

export function VocabularyBlock({ vocabulary: vocab, settings: s, index }: Props) {
  const fontSize = Math.round(16 * s.fontScale)
  const smallFontSize = Math.round(12 * s.fontScale)

  const traceText = Array(Math.ceil(40 / (vocab.word.length + 2)))
    .fill(vocab.word)
    .join('   ')

  return (
    <div
      className="border border-gray-200 rounded-lg p-4 bg-white break-inside-avoid"
      style={{
        pageBreakInside: 'avoid',
        fontFamily: s.fontFamily !== 'Helvetica' ? `'${s.fontFamily}', sans-serif` : undefined,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="font-bold text-gray-900"
            style={{ fontSize }}
          >
            {index}. {vocab.word}
          </span>
          {s.showReading && vocab.reading && (
            <span
              className="text-blue-500 font-normal"
              style={{ fontSize: smallFontSize }}
            >
              /{vocab.reading}/
            </span>
          )}
          {s.showPartOfSpeech && vocab.pos && (
            <span
              className="text-gray-500 italic"
              style={{ fontSize: smallFontSize }}
            >
              ({vocab.pos})
            </span>
          )}
        </div>
        <div className="text-right shrink-0">
          {s.showMeaningEn && vocab.meaningEn && (
            <div className="text-gray-500 font-medium" style={{ fontSize: smallFontSize }}>
              {vocab.meaningEn}
            </div>
          )}
          {s.showJapanese && vocab.japanese && (
            <div className="text-gray-700 font-medium" style={{ fontSize: smallFontSize }}>
              {vocab.japanese}
            </div>
          )}
          {s.showVietnamese && vocab.vietnamese && (
            <div className="text-gray-600" style={{ fontSize: smallFontSize }}>
              {vocab.vietnamese}
            </div>
          )}
        </div>
      </div>

      {/* Example sentence */}
      {s.showExample && vocab.example && (
        <div
          className="mb-3 pl-3 border-l-2 border-blue-200 space-y-0.5"
          style={{ fontSize: smallFontSize }}
        >
          <div className="text-gray-700 italic">{vocab.example}</div>
          {s.showExampleJapanese && vocab.exampleJa && (
            <div className="text-gray-500">{vocab.exampleJa}</div>
          )}
          {s.showExampleVietnamese && vocab.exampleVi && (
            <div className="text-gray-500">{vocab.exampleVi}</div>
          )}
        </div>
      )}

      {/* Trace line */}
      <div
        className="mb-2 font-mono tracking-widest overflow-hidden whitespace-nowrap"
        style={{
          fontSize: Math.round(14 * s.fontScale),
          color: `rgba(100,100,100,${s.traceOpacity})`,
          textDecoration:
            s.traceStyle !== 'solid'
              ? `underline ${getTraceBorderStyle(s.traceStyle)}`
              : 'none',
          letterSpacing: '0.15em',
        }}
      >
        {traceText}
      </div>

      {/* Writing grid */}
      <WritingGrid lines={s.writingLines} settings={s} />

      {/* Recall test */}
      {s.showRecall && (vocab.japanese || vocab.vietnamese) && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-400 mb-1">
            {vocab.japanese && s.showJapanese
              ? `${vocab.japanese} →`
              : vocab.vietnamese && s.showVietnamese
              ? `${vocab.vietnamese} →`
              : '→'}
          </div>
          <div className="border-b border-gray-400 w-full" style={{ height: Math.round(32 * s.fontScale) }} />
        </div>
      )}
    </div>
  )
}
