'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { EIKEN_LEVELS } from '@/types/vocabulary'
import type { EikenLevel } from '@/types/vocabulary'
import { t } from '@/lib/i18n/dictionaries'

const LEVEL_COLORS: Record<EikenLevel, string> = {
  '5級': 'bg-green-100 text-green-800 border-green-300',
  '4級': 'bg-teal-100 text-teal-800 border-teal-300',
  '3級': 'bg-blue-100 text-blue-800 border-blue-300',
  '準2級': 'bg-indigo-100 text-indigo-800 border-indigo-300',
  '準2級プラス': 'bg-purple-100 text-purple-800 border-purple-300',
  '2級': 'bg-orange-100 text-orange-800 border-orange-300',
  '準1級': 'bg-red-100 text-red-800 border-red-300',
  '1級': 'bg-rose-100 text-rose-800 border-rose-300',
}

const LEVEL_COLORS_ACTIVE: Record<EikenLevel, string> = {
  '5級': 'bg-green-500 text-white border-green-500',
  '4級': 'bg-teal-500 text-white border-teal-500',
  '3級': 'bg-blue-500 text-white border-blue-500',
  '準2級': 'bg-indigo-500 text-white border-indigo-500',
  '準2級プラス': 'bg-purple-500 text-white border-purple-500',
  '2級': 'bg-orange-500 text-white border-orange-500',
  '準1級': 'bg-red-500 text-white border-red-500',
  '1級': 'bg-rose-500 text-white border-rose-500',
}

export function LevelFilter() {
  const { locale, selectedLevels, toggleLevel, setSelectedLevels } =
    useWorkbookStore()

  const allSelected = selectedLevels.length === 0

  return (
    <div className="space-y-2">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
        {t(locale, 'selectLevel')}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedLevels([])}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            allSelected
              ? 'bg-gray-700 text-white border-gray-700'
              : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-400'
          }`}
        >
          {t(locale, 'allLevels')}
        </button>
        {EIKEN_LEVELS.map((level) => {
          const active = selectedLevels.includes(level)
          return (
            <button
              key={level}
              onClick={() => toggleLevel(level)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                active ? LEVEL_COLORS_ACTIVE[level] : LEVEL_COLORS[level]
              }`}
            >
              {level}
            </button>
          )
        })}
      </div>
    </div>
  )
}
