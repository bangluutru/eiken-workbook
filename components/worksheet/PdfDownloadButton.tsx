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
      // Dynamic imports: keep @react-pdf/renderer out of the SSR bundle
      const [{ pdf }, { WorksheetDocument }, { registerFonts }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/pdf/WorksheetDocument'),
        import('@/pdf/fontRegistry'),
      ])

      // Absolute URLs so react-pdf can XHR-fetch custom font files
      registerFonts(window.location.origin)

      // React 19 concurrent mode makes updateContainer async.
      // We must wait for the 'change' event (fired after React commits the
      // document tree) before calling toBlob() — otherwise container.document
      // is still null and layoutDocument hangs indefinitely.
      const instance = pdf()

      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(
          () => reject(new Error('PDF render timed out after 30s')),
          30_000
        )
        const handler = () => {
          clearTimeout(timer)
          instance.removeListener('change', handler)
          resolve()
        }
        instance.on('change', handler)
        instance.updateContainer(
          <WorksheetDocument vocabulary={selectedVocabulary} settings={settings} />
        )
      })

      const blob = await instance.toBlob()

      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `eiken-workbook-${Date.now()}.pdf`
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      // Revoke after a delay so the browser has time to start the download
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
