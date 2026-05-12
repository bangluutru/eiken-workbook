'use client'

import { useEffect, useRef, useState } from 'react'
import { usePDF } from '@react-pdf/renderer'
import { WorksheetDocument } from '@/pdf/WorksheetDocument'
import { registerFonts } from '@/pdf/fontRegistry'
import { FileDown, Loader2 } from 'lucide-react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'

function triggerDownload(url: string) {
  const a = document.createElement('a')
  a.href = url
  a.download = `eiken-workbook-${Date.now()}.pdf`
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function PdfDownloadButtonClient() {
  const { locale, selectedVocabulary, settings } = useWorkbookStore()
  const [pdfState, updatePdf] = usePDF()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const downloadRequested = useRef(false)
  const fontsReady = useRef(false)
  // Track previous loading to detect the true→false transition reliably
  const prevLoading = useRef(pdfState.loading)

  useEffect(() => {
    const wasLoading = prevLoading.current
    prevLoading.current = pdfState.loading

    if (wasLoading && !pdfState.loading && downloadRequested.current) {
      downloadRequested.current = false
      if (pdfState.error) {
        setErrorMsg(String(pdfState.error))
      } else if (pdfState.url) {
        setErrorMsg(null)
        triggerDownload(pdfState.url)
      }
    }
  }, [pdfState.loading, pdfState.url, pdfState.error])

  function handleClick() {
    if (selectedVocabulary.length === 0 || pdfState.loading) return

    if (!fontsReady.current) {
      registerFonts(window.location.origin)
      fontsReady.current = true
    }

    downloadRequested.current = true
    setErrorMsg(null)
    updatePdf(
      <WorksheetDocument vocabulary={selectedVocabulary} settings={settings} />
    )
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleClick}
        disabled={selectedVocabulary.length === 0 || pdfState.loading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {pdfState.loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileDown className="w-4 h-4" />
        )}
        {pdfState.loading ? t(locale, 'loading') : t(locale, 'exportPdf')}
      </button>
      {errorMsg && (
        <p className="text-xs text-red-500 max-w-xs text-right">{errorMsg}</p>
      )}
    </div>
  )
}
