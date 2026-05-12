'use client'

import { useEffect, useRef, useState } from 'react'
import { jsPDF } from 'jspdf'
import { toCanvas } from 'html-to-image'
import { VocabularyBlock } from '@/components/worksheet/VocabularyBlock'
import { computeWritingLines } from '@/lib/worksheet/computeWritingLines'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { FileDown, Loader2 } from 'lucide-react'

// Physical page dimensions in mm
const PAGE_DIMS = { A4: { w: 210, h: 297 }, Letter: { w: 216, h: 279 } }
// Padding in mm (matching pdfStyles.page: 42pt ≈ 14.8mm, 30pt ≈ 10.6mm)
const PAD = { x: 14.8, y: 10.6 }
// 1mm = 3.7795 CSS px at 96 dpi
const MM_TO_PX = 3.7795

export default function PdfDownloadButtonClient() {
  const { locale, selectedVocabulary, settings } = useWorkbookStore()
  const [exporting, setExporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const wordsPerPage = settings.wordsPerPage === 'auto' ? 3 : settings.wordsPerPage
  const writingLines = computeWritingLines(settings)

  const pages: typeof selectedVocabulary[] = []
  for (let i = 0; i < selectedVocabulary.length; i += wordsPerPage) {
    pages.push(selectedVocabulary.slice(i, i + wordsPerPage))
  }

  const dims = PAGE_DIMS[settings.paperSize]
  const isLandscape = settings.orientation === 'landscape'
  const pageW = isLandscape ? dims.h : dims.w
  const pageH = isLandscape ? dims.w : dims.h

  useEffect(() => {
    if (!exporting || !containerRef.current) return

    const pageEls = Array.from(
      containerRef.current.querySelectorAll<HTMLDivElement>('[data-pdf-page]')
    )
    if (pageEls.length === 0) {
      setExporting(false)
      return
    }

    const run = async () => {
      try {
        await document.fonts.ready

        const orientation = isLandscape ? 'landscape' : 'portrait'
        const format = settings.paperSize === 'A4' ? 'a4' : 'letter'
        const pdf = new jsPDF({ orientation, unit: 'mm', format })

        for (let i = 0; i < pageEls.length; i++) {
          if (i > 0) pdf.addPage(format, orientation)

          const canvas = await toCanvas(pageEls[i], {
            backgroundColor: 'white',
            pixelRatio: 2,
            width: Math.round(pageW * MM_TO_PX),
            height: Math.round(pageH * MM_TO_PX),
          })

          pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, pageW, pageH)
        }

        pdf.save(`eiken-workbook-${Date.now()}.pdf`)
        setError(null)
      } catch (err) {
        console.error('PDF export error:', err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setExporting(false)
      }
    }

    run()
  }, [exporting]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {/* Off-screen pages rendered for PDF capture only when exporting */}
      {exporting && (
        <div
          ref={containerRef}
          style={{ position: 'fixed', top: 0, left: '-9999px', pointerEvents: 'none', zIndex: -1 }}
        >
          {pages.map((pageVocab, pageIdx) => (
            <div
              key={pageIdx}
              data-pdf-page={pageIdx}
              style={{
                width: `${pageW}mm`,
                height: `${pageH}mm`,
                paddingTop: `${PAD.y}mm`,
                paddingBottom: `${PAD.y}mm`,
                paddingLeft: `${PAD.x}mm`,
                paddingRight: `${PAD.x}mm`,
                background: 'white',
                overflow: 'hidden',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {pageVocab.map((vocab, i) => (
                  <VocabularyBlock
                    key={vocab.id}
                    vocabulary={vocab}
                    settings={settings}
                    index={pageIdx * wordsPerPage + i + 1}
                    lines={writingLines}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex flex-col items-end gap-1">
        <button
          onClick={() => { setError(null); setExporting(true) }}
          disabled={selectedVocabulary.length === 0 || exporting}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {exporting
            ? <Loader2 className="w-4 h-4 animate-spin" />
            : <FileDown className="w-4 h-4" />
          }
          {exporting ? t(locale, 'loading') : t(locale, 'exportPdf')}
        </button>
        {error && (
          <p className="text-xs text-red-500 max-w-xs text-right">{error}</p>
        )}
      </div>
    </>
  )
}
