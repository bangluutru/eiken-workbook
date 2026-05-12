'use client'

import { useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import type { Vocabulary } from '@/types/vocabulary'

function EditableCard({ vocab, index }: { vocab: Vocabulary; index: number }) {
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

  if (editing) {
    return (
      <div className="bg-primary-fixed border border-primary-fixed-dim rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-lg font-bold text-on-surface"
            style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
          >
            {vocab.word}
          </span>
          <span className="text-xs text-on-surface-variant">— {t(locale, 'edit')}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
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
            <div
              key={key}
              className={key === 'example' || key === 'exampleJa' || key === 'exampleVi' ? 'col-span-2' : ''}
            >
              <label className="text-xs text-on-surface-variant block mb-0.5">{label}</label>
              <input
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full text-sm border border-outline-variant rounded-lg px-3 py-1.5 bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-on-primary text-xs font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">check</span>
            {t(locale, 'save')}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container text-on-surface-variant text-xs font-medium rounded-lg border border-outline-variant hover:bg-surface-container-high transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
            {t(locale, 'cancel')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl px-4 py-3 group hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:border-primary-fixed-dim transition-all">
      <div className="grid grid-cols-12 gap-3 items-center w-full">
        {/* Index */}
        <div className="col-span-1 flex justify-center">
          <span className="text-sm font-semibold text-on-surface-variant">{index}</span>
        </div>

        {/* Word + level chips */}
        <div className="col-span-3 min-w-0">
          <div
            className="text-lg font-bold text-on-surface leading-tight truncate"
            style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
          >
            {vocab.word}
          </div>
          <div className="flex flex-wrap gap-1 mt-0.5">
            {vocab.level.filter((l) => l !== '準2級プラス').map((l) => (
              <span key={l} className="text-[10px] text-on-surface-variant/70">
                {l}
              </span>
            ))}
            {vocab.source === 'custom' && (
              <span className="text-[10px] px-1.5 py-0 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/40">
                {t(locale, 'customSource')}
              </span>
            )}
            {vocab.source === 'csv' && (
              <span className="text-[10px] px-1.5 py-0 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/40">
                {t(locale, 'csvSource')}
              </span>
            )}
          </div>
        </div>

        {/* POS */}
        <div className="col-span-2">
          {vocab.pos ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-surface-container text-on-surface-variant border border-outline-variant/50">
              {vocab.pos}
            </span>
          ) : (
            <span className="text-xs text-outline">—</span>
          )}
        </div>

        {/* Japanese */}
        <div className="col-span-3 text-sm text-on-surface min-w-0">
          {vocab.japanese ? (
            <span className="block truncate">{vocab.japanese}</span>
          ) : (
            <span className="text-xs text-outline italic">—</span>
          )}
        </div>

        {/* Vietnamese + actions */}
        <div className="col-span-3 flex items-center justify-between gap-2 min-w-0">
          <span className="text-sm text-on-surface-variant truncate flex-1 min-w-0">
            {vocab.vietnamese ? vocab.vietnamese : <span className="text-xs text-outline italic">—</span>}
          </span>
          <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="p-1 rounded text-outline hover:text-primary transition-colors"
              title={t(locale, 'edit')}
            >
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
            <button
              onClick={() => removeVocabulary(vocab.id)}
              className="p-1 rounded text-outline hover:text-error transition-colors"
              title={t(locale, 'remove')}
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SelectedWordList() {
  const { locale, selectedVocabulary, clearVocabulary } = useWorkbookStore()

  if (selectedVocabulary.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-on-surface-variant">
        <span className="material-symbols-outlined text-[48px] text-outline-variant">library_books</span>
        <p className="text-sm">{t(locale, 'noWordsSelected')}</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 max-w-5xl mx-auto">
      {/* Column headers */}
      <div className="grid grid-cols-12 gap-3 px-4 pb-1 text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
        <div className="col-span-1 flex justify-center">#</div>
        <div className="col-span-3">{t(locale, 'word')}</div>
        <div className="col-span-2">{t(locale, 'partOfSpeech')}</div>
        <div className="col-span-3">
          {locale === 'ja' ? '日本語' : locale === 'vi' ? 'Tiếng Nhật' : 'Japanese'}
        </div>
        <div className="col-span-3 flex items-center justify-between">
          <span>{locale === 'ja' ? 'ベトナム語' : locale === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</span>
          <button
            onClick={clearVocabulary}
            className="text-[10px] font-medium normal-case tracking-normal text-error/70 hover:text-error transition-colors"
          >
            {t(locale, 'clearAll')}
          </button>
        </div>
      </div>

      {/* Word cards */}
      {selectedVocabulary.map((vocab, i) => (
        <EditableCard key={vocab.id} vocab={vocab} index={i + 1} />
      ))}
    </div>
  )
}
