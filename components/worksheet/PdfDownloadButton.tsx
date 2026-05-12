'use client'

import { useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { FileDown, Loader2 } from 'lucide-react'

export function PdfDownloadButton() {
  const { locale, selectedVocabulary, settings } = useWorkbookStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDownload() {
    if (selectedVocabulary.length === 0) return
    setLoading(true)
    setError(null)
    try {
      // Dynamic imports to ensure browser-only execution and avoid SSR bundle issues
      const [{ pdf }, { WorksheetDocument }, { registerFonts }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/pdf/WorksheetDocument'),
        import('@/pdf/fontRegistry'),
      ])

      // Use absolute URLs so @react-pdf/renderer can fetch custom fonts via XHR
      registerFonts(window.location.origin)

      const blob = await pdf(
        <WorksheetDocument vocabulary={selectedVocabulary} settings={settings} />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `eiken-workbook-${Date.now()}.pdf`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      // Revoke after a delay so the browser can start the download
      setTimeout(() => URL.revokeObjectURL(url), 10_000)
    } catch (err) {
      console.error('PDF generation failed:', err)
      const msg = err instanceof Error ? err.message : String(err)
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDownload}
        disabled={selectedVocabulary.length === 0 || loading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileDown className="w-4 h-4" />
        )}
        {loading ? t(locale, 'loading') : t(locale, 'exportPdf')}
      </button>
      {error && (
        <p className="text-xs text-red-500 max-w-xs text-right">{error}</p>
      )}
    </div>
  )
}
