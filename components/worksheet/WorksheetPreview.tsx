'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { VocabularyBlock } from './VocabularyBlock'

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

  const pageWidth = settings.orientation === 'landscape' ? 'max-w-4xl' : 'max-w-2xl'

  return (
    <div className="space-y-8">
      {pages.map((pageVocab, pageIdx) => (
        <div
          key={pageIdx}
          className={`${pageWidth} mx-auto bg-white shadow-sm border border-gray-200 p-8`}
        >
          <div className="text-xs text-gray-300 text-right mb-4 font-mono">
            {pageIdx + 1} / {pages.length}
          </div>
          <div className="space-y-6">
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
