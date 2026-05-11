'use client'

import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { WorksheetDocument } from '@/pdf/WorksheetDocument'
import { t } from '@/lib/i18n/dictionaries'
import { FileDown, Loader2 } from 'lucide-react'

export function PdfDownloadButton() {
  const { locale, selectedVocabulary, settings } = useWorkbookStore()
  const [loading, setLoading] = useState(false)

  async function handleDownload() {
    if (selectedVocabulary.length === 0) return
    setLoading(true)
    try {
      const blob = await pdf(
        <WorksheetDocument vocabulary={selectedVocabulary} settings={settings} />
      ).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `eiken-workbook-${Date.now()}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
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
  )
}
