'use client'

import { useRef, useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { parseVocabularyCsv } from '@/lib/csv/parseVocabularyCsv'
import { t } from '@/lib/i18n/dictionaries'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'

export function CsvImport() {
  const { locale, addVocabulary } = useWorkbookStore()
  const fileRef = useRef<HTMLInputElement>(null)
  const [result, setResult] = useState<{
    count: number
    errors: { row: number; message: string }[]
  } | null>(null)
  const [dragging, setDragging] = useState(false)

  function processFile(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const { valid, errors } = parseVocabularyCsv(text)
      addVocabulary(valid)
      setResult({ count: valid.length, errors })
    }
    reader.readAsText(file)
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) processFile(file)
    e.target.value = ''
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.name.endsWith('.csv')) processFile(file)
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {t(locale, 'importCsv')}
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          dragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
        }`}
      >
        <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
        <p className="text-xs text-gray-500">{t(locale, 'dropCsvHere')}</p>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-gray-400">{t(locale, 'csvFormatHint')}</p>

      {result && (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-green-700">
            <CheckCircle className="w-3.5 h-3.5" />
            {result.count} {t(locale, 'importSuccess')}
          </div>
          {result.errors.length > 0 && (
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-xs text-amber-600">
                <AlertCircle className="w-3.5 h-3.5" />
                {result.errors.length} {t(locale, 'importErrors')}
              </div>
              {result.errors.map((err, i) => (
                <div key={i} className="text-xs text-gray-500 pl-5">
                  Row {err.row}: {err.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
