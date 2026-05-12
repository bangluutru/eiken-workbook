'use client'

import dynamic from 'next/dynamic'
import { Loader2 } from 'lucide-react'

const PdfDownloadButtonClient = dynamic(
  () => import('./PdfDownloadButtonClient'),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium opacity-40 cursor-not-allowed"
      >
        <Loader2 className="w-4 h-4" />
      </button>
    ),
  }
)

export function PdfDownloadButton() {
  return <PdfDownloadButtonClient />
}
