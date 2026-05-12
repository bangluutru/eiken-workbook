'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { EIKEN_LEVELS } from '@/types/vocabulary'
import type { EikenLevel } from '@/types/vocabulary'
import { t } from '@/lib/i18n/dictionaries'

// Inactive tint — L=96% C=0.045, fg L=40% C=0.10
const LEVEL_COLORS: Partial<Record<EikenLevel, string>> = {
  '5級':   'bg-[oklch(96%_0.045_150)] text-[oklch(40%_0.10_150)] border-transparent hover:brightness-95',
  '4級':   'bg-[oklch(96%_0.045_195)] text-[oklch(40%_0.10_195)] border-transparent hover:brightness-95',
  '3級':   'bg-[oklch(96%_0.045_240)] text-[oklch(40%_0.10_240)] border-transparent hover:brightness-95',
  '準2級': 'bg-[oklch(96%_0.045_275)] text-[oklch(40%_0.10_275)] border-transparent hover:brightness-95',
  '2級':   'bg-[oklch(96%_0.045_60)]  text-[oklch(40%_0.10_60)]  border-transparent hover:brightness-95',
  '準1級': 'bg-[oklch(96%_0.045_30)]  text-[oklch(40%_0.10_30)]  border-transparent hover:brightness-95',
  '1級':   'bg-[oklch(96%_0.045_10)]  text-[oklch(40%_0.10_10)]  border-transparent hover:brightness-95',
}

// Active solid — L=58% C=0.14, fg white
const LEVEL_COLORS_ACTIVE: Partial<Record<EikenLevel, string>> = {
  '5級':   'bg-[oklch(58%_0.14_150)] text-white border-transparent',
  '4級':   'bg-[oklch(58%_0.14_195)] text-white border-transparent',
  '3級':   'bg-[oklch(58%_0.14_240)] text-white border-transparent',
  '準2級': 'bg-[oklch(58%_0.14_275)] text-white border-transparent',
  '2級':   'bg-[oklch(58%_0.14_60)]  text-white border-transparent',
  '準1級': 'bg-[oklch(58%_0.14_30)]  text-white border-transparent',
  '1級':   'bg-[oklch(58%_0.14_10)]  text-white border-transparent',
}

export function LevelFilter() {
  const { locale, selectedLevels, toggleLevel, setSelectedLevels } =
    useWorkbookStore()

  const allSelected = selectedLevels.length === 0

  return (
    <div className="space-y-2">
      <div className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
        {t(locale, 'selectLevel')}
      </div>
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setSelectedLevels([])}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
            allSelected
              ? 'bg-primary text-on-primary border-transparent'
              : 'bg-surface-container text-on-surface-variant border-transparent hover:bg-surface-container-high'
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
                active
                  ? (LEVEL_COLORS_ACTIVE[level] ?? 'bg-stone-500 text-white border-gray-500')
                  : (LEVEL_COLORS[level] ?? 'bg-stone-100 text-stone-600 border-stone-200 hover:border-stone-400')
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
