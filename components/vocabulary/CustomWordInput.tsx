'use client'

import { useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { normalizeCustomWords } from '@/lib/vocabulary/normalizeVocabulary'
import { t } from '@/lib/i18n/dictionaries'
import { PlusCircle } from 'lucide-react'

export function CustomWordInput() {
  const { locale, addVocabulary } = useWorkbookStore()
  const [text, setText] = useState('')
  const [added, setAdded] = useState<number | null>(null)

  function handleAdd() {
    const words = normalizeCustomWords(text)
    if (words.length === 0) return
    addVocabulary(words)
    setText('')
    setAdded(words.length)
    setTimeout(() => setAdded(null), 2000)
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
        {t(locale, 'addCustomWords')}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t(locale, 'customWordsPlaceholder')}
        rows={4}
        className="w-full text-sm border border-stone-200 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <PlusCircle className="w-4 h-4" />
          {t(locale, 'addWords')}
        </button>
        {added !== null && (
          <span className="text-xs text-green-600 font-medium">
            +{added} {locale === 'ja' ? '件追加' : locale === 'vi' ? 'từ đã thêm' : 'words added'}
          </span>
        )}
      </div>
    </div>
  )
}
