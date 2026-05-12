'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { LOCALES, LOCALE_LABELS } from '@/types/locale'
import type { Locale } from '@/types/locale'
import { BookOpen } from 'lucide-react'

export function Header() {
  const { locale, setLocale } = useWorkbookStore()

  return (
    <header className="bg-white border-b border-stone-200 no-print">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-indigo-600" />
          <div>
            <h1 className="text-lg font-bold text-stone-900 leading-tight">
              {t(locale, 'appTitle')}
            </h1>
            <p className="text-xs text-stone-500">{t(locale, 'appSubtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-stone-500 hidden sm:block">
            {t(locale, 'selectLanguage')}:
          </span>
          <div className="inline-flex gap-0.5 p-1 rounded-xl bg-stone-100">
            {LOCALES.map((loc: Locale) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  locale === loc
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'bg-transparent text-stone-500 hover:text-stone-700'
                }`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
