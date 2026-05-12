'use client'

import { useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { Trash2, Pencil, X, Check } from 'lucide-react'
import type { Vocabulary } from '@/types/vocabulary'

function EditableWord({ vocab }: { vocab: Vocabulary }) {
  const { locale, removeVocabulary, updateVocabulary } = useWorkbookStore()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    japanese: vocab.japanese ?? '',
    vietnamese: vocab.vietnamese ?? '',
    example: vocab.example ?? '',
    exampleJa: vocab.exampleJa ?? '',
    exampleVi: vocab.exampleVi ?? '',
    pos: vocab.pos ?? '',
  })

  function handleSave() {
    updateVocabulary(vocab.id, {
      japanese: form.japanese || undefined,
      vietnamese: form.vietnamese || undefined,
      example: form.example || undefined,
      exampleJa: form.exampleJa || undefined,
      exampleVi: form.exampleVi || undefined,
      pos: form.pos || undefined,
    })
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="flex items-start justify-between gap-2 py-2 px-3 group">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-semibold text-sm text-stone-900">{vocab.word}</span>
            {vocab.pos && <span className="text-xs text-stone-400">{vocab.pos}</span>}
            {vocab.level.map((l) => (
              <span key={l} className="text-xs px-1 py-0.5 bg-stone-100 text-stone-500 rounded">
                {l}
              </span>
            ))}
            {vocab.source === 'custom' && (
              <span className="text-xs px-1 py-0.5 bg-purple-100 text-purple-600 rounded">
                {t(locale, 'customSource')}
              </span>
            )}
            {vocab.source === 'csv' && (
              <span className="text-xs px-1 py-0.5 bg-yellow-100 text-yellow-600 rounded">
                {t(locale, 'csvSource')}
              </span>
            )}
          </div>
          {vocab.japanese && (
            <div className="text-xs text-stone-500 mt-0.5 truncate">
              {vocab.japanese}
              {vocab.vietnamese && ` / ${vocab.vietnamese}`}
            </div>
          )}
          {!vocab.japanese && !vocab.vietnamese && (
            <div className="text-xs text-amber-500 italic mt-0.5">
              {locale === 'ja' ? '翻訳なし' : locale === 'vi' ? 'Chưa có dịch nghĩa' : 'No translation'}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => setEditing(true)}
            className="p-1 text-stone-400 hover:text-indigo-600 rounded"
            title={t(locale, 'edit')}
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => removeVocabulary(vocab.id)}
            className="p-1 text-stone-400 hover:text-red-600 rounded"
            title={t(locale, 'remove')}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="py-2 px-3 bg-indigo-50 space-y-2">
      <div className="font-semibold text-sm text-stone-900 mb-1">{vocab.word}</div>
      {(
        [
          ['pos', t(locale, 'partOfSpeech')],
          ['japanese', t(locale, 'japanese')],
          ['vietnamese', t(locale, 'vietnamese')],
          ['example', t(locale, 'example')],
          ['exampleJa', t(locale, 'exampleJa')],
          ['exampleVi', t(locale, 'exampleVi')],
        ] as [keyof typeof form, string][]
      ).map(([key, label]) => (
        <div key={key}>
          <label className="text-xs text-stone-500 block mb-0.5">{label}</label>
          <input
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="w-full text-sm border border-stone-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-2 py-1 bg-indigo-600 text-white text-xs rounded hover:bg-indigo-700"
        >
          <Check className="w-3 h-3" />
          {t(locale, 'save')}
        </button>
        <button
          onClick={() => setEditing(false)}
          className="flex items-center gap-1 px-2 py-1 bg-white text-stone-600 text-xs rounded border border-stone-200 hover:bg-stone-50"
        >
          <X className="w-3 h-3" />
          {t(locale, 'cancel')}
        </button>
      </div>
    </div>
  )
}

export function SelectedWordList() {
  const { locale, selectedVocabulary, clearVocabulary } = useWorkbookStore()

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
          {t(locale, 'selectedWords')} ({selectedVocabulary.length})
        </div>
        {selectedVocabulary.length > 0 && (
          <button
            onClick={clearVocabulary}
            className="text-xs text-red-500 hover:text-red-700"
          >
            {t(locale, 'clearAll')}
          </button>
        )}
      </div>

      {selectedVocabulary.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-stone-400">
          {t(locale, 'noWordsSelected')}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto divide-y divide-stone-100 rounded-xl border border-stone-200">
          {selectedVocabulary.map((vocab) => (
            <EditableWord key={vocab.id} vocab={vocab} />
          ))}
        </div>
      )}
    </div>
  )
}
