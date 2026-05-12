'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { VocabularyBlock } from './VocabularyBlock'

// Physical paper dimensions in mm
const PAGE_DIMS = {
  A4: { w: 210, h: 297 },
  Letter: { w: 216, h: 279 },
}

// Padding matching @react-pdf/renderer pdfStyles.page (42pt ≈ 14.8mm, 30pt ≈ 10.6mm)
const PAGE_PADDING = { x: '14.8mm', y: '10.6mm' }

export function WorksheetPreview() {
  const { locale, selectedVocabulary, settings } = useWorkbookStore()

  if (selectedVocabulary.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-sm">
        {t(locale, 'noPreview')}
      </div>
    )
  }

  const wordsPerPage =
    settings.wordsPerPage === 'auto' ? 3 : settings.wordsPerPage

  const pages: typeof selectedVocabulary[] = []
  for (let i = 0; i < selectedVocabulary.length; i += wordsPerPage) {
    pages.push(selectedVocabulary.slice(i, i + wordsPerPage))
  }

  const dims = PAGE_DIMS[settings.paperSize]
  const isLandscape = settings.orientation === 'landscape'
  const pageW = isLandscape ? dims.h : dims.w
  const pageH = isLandscape ? dims.w : dims.h

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      {pages.map((pageVocab, pageIdx) => (
        <div
          key={pageIdx}
          className="bg-white shadow-md border border-gray-200 flex-shrink-0 relative"
          style={{
            width: `${pageW}mm`,
            height: `${pageH}mm`,
            overflow: 'hidden',
            paddingTop: PAGE_PADDING.y,
            paddingBottom: PAGE_PADDING.y,
            paddingLeft: PAGE_PADDING.x,
            paddingRight: PAGE_PADDING.x,
            boxSizing: 'border-box',
          }}
        >
          <div
            className="absolute top-2 right-3 font-mono text-gray-300"
            style={{ fontSize: '8pt' }}
          >
            {pageIdx + 1} / {pages.length}
          </div>
          <div className="space-y-4 mt-4">
            {pageVocab.map((vocab, i) => (
              <VocabularyBlock
                key={vocab.id}
                vocabulary={vocab}
                settings={settings}
                index={pageIdx * wordsPerPage + i + 1}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
