'use client'

import { useMemo, useState } from 'react'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { loadAllVocabulary } from '@/lib/vocabulary/loadVocabulary'
import { filterByLevels, searchVocabulary, pickRandom } from '@/lib/vocabulary/searchVocabulary'
import { t } from '@/lib/i18n/dictionaries'
import { Search, Shuffle, CheckSquare, Square, XSquare } from 'lucide-react'

const MAX_VISIBLE = 200

export function VocabularyList() {
  const {
    locale,
    selectedLevels,
    selectedVocabulary,
    addVocabulary,
    removeVocabularyBatch,
    searchQuery,
    setSearchQuery,
  } = useWorkbookStore()

  const [randomN, setRandomN] = useState(10)
  const allVocab = useMemo(() => loadAllVocabulary(), [])

  const filtered = useMemo(() => {
    const byLevel = filterByLevels(allVocab, selectedLevels)
    return searchVocabulary(byLevel, searchQuery)
  }, [allVocab, selectedLevels, searchQuery])

  const selectedIds = useMemo(
    () => new Set(selectedVocabulary.map((v) => v.id)),
    [selectedVocabulary]
  )

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((v) => selectedIds.has(v.id))

  const displayed = filtered.slice(0, MAX_VISIBLE)
  const hiddenCount = filtered.length - displayed.length

  function handleToggleAll() {
    if (allFilteredSelected) {
      removeVocabularyBatch(filtered.map((v) => v.id))
    } else {
      addVocabulary(filtered)
    }
  }

  function handleRandom() {
    const pool = filtered.filter((v) => !selectedIds.has(v.id))
    addVocabulary(pickRandom(pool, randomN))
  }

  function handleToggleWord(wordId: string) {
    const vocab = filtered.find((v) => v.id === wordId)
    if (!vocab) return
    if (selectedIds.has(wordId)) {
      useWorkbookStore.getState().removeVocabulary(wordId)
    } else {
      addVocabulary([vocab])
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="relative mb-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t(locale, 'searchPlaceholder')}
          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={handleToggleAll}
          className={`flex items-center gap-1 px-2 py-1 text-xs border rounded ${
            allFilteredSelected
              ? 'text-red-600 border-red-200 hover:bg-red-50'
              : 'text-blue-600 border-blue-200 hover:bg-blue-50'
          }`}
        >
          {allFilteredSelected ? (
            <>
              <XSquare className="w-3 h-3" />
              {locale === 'ja' ? '全選択解除' : locale === 'vi' ? 'Bỏ chọn tất cả' : 'Deselect all'}
            </>
          ) : (
            <>
              <CheckSquare className="w-3 h-3" />
              {t(locale, 'selectAll')}
            </>
          )}
        </button>
        <div className="flex items-center gap-1 ml-auto">
          <button
            onClick={handleRandom}
            className="flex items-center gap-1 px-2 py-1 text-xs text-purple-600 border border-purple-200 rounded hover:bg-purple-50"
          >
            <Shuffle className="w-3 h-3" />
            {t(locale, 'randomSelect')}
          </button>
          <input
            type="number"
            min={1}
            max={100}
            value={randomN}
            onChange={(e) => setRandomN(Math.max(1, Number(e.target.value)))}
            className="w-12 text-center text-xs border border-gray-200 rounded py-1"
          />
          <span className="text-xs text-gray-500">{t(locale, 'randomCount')}</span>
        </div>
      </div>

      {/* Count */}
      <div className="text-xs text-gray-400 mb-2">
        {filtered.length} {locale === 'ja' ? '件' : locale === 'vi' ? 'từ' : 'words'}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100 rounded border border-gray-100">
        {filtered.length === 0 && (
          <div className="py-8 text-center text-sm text-gray-400">
            {searchQuery
              ? locale === 'ja'
                ? '検索結果がありません'
                : locale === 'vi'
                ? 'Không tìm thấy kết quả'
                : 'No results found'
              : locale === 'ja'
              ? 'レベルを選択してください'
              : locale === 'vi'
              ? 'Vui lòng chọn cấp độ'
              : 'Please select a level'}
          </div>
        )}
        {displayed.map((vocab) => {
          const isSelected = selectedIds.has(vocab.id)
          return (
            <button
              key={vocab.id}
              onClick={() => handleToggleWord(vocab.id)}
              className={`w-full text-left px-3 py-2 flex items-start gap-2 hover:bg-gray-50 transition-colors ${
                isSelected ? 'bg-blue-50' : ''
              }`}
            >
              <span className="mt-0.5 shrink-0">
                {isSelected ? (
                  <CheckSquare className="w-4 h-4 text-blue-500" />
                ) : (
                  <Square className="w-4 h-4 text-gray-300" />
                )}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium text-sm text-gray-900">
                    {vocab.word}
                  </span>
                  {vocab.pos && (
                    <span className="text-xs text-gray-400">{vocab.pos}</span>
                  )}
                  {vocab.level.filter((l) => l !== '準2級プラス').map((l) => (
                    <span
                      key={l}
                      className="text-xs px-1 py-0.5 bg-gray-100 text-gray-500 rounded"
                    >
                      {l}
                    </span>
                  ))}
                </div>
                {vocab.japanese && (
                  <div className="text-xs text-gray-500 mt-0.5 truncate">
                    {vocab.japanese}
                    {vocab.vietnamese && ` / ${vocab.vietnamese}`}
                  </div>
                )}
              </div>
            </button>
          )
        })}
        {hiddenCount > 0 && (
          <div className="py-3 text-center text-xs text-gray-400">
            {locale === 'ja'
              ? `他 ${hiddenCount} 件 — 検索で絞り込んでください`
              : locale === 'vi'
              ? `Còn ${hiddenCount} từ — hãy tìm kiếm để lọc`
              : `${hiddenCount} more — use search to filter`}
          </div>
        )}
      </div>
    </div>
  )
}
