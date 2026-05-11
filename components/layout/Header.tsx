'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { LOCALES, LOCALE_LABELS } from '@/types/locale'
import type { Locale } from '@/types/locale'
import { BookOpen } from 'lucide-react'

export function Header() {
  const { locale, setLocale } = useWorkbookStore()

  return (
    <header className="bg-white border-b border-gray-200 no-print">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">
              {t(locale, 'appTitle')}
            </h1>
            <p className="text-xs text-gray-500">{t(locale, 'appSubtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 hidden sm:block">
            {t(locale, 'selectLanguage')}:
          </span>
          <div className="flex rounded-md border border-gray-200 overflow-hidden">
            {LOCALES.map((loc: Locale) => (
              <button
                key={loc}
                onClick={() => setLocale(loc)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                  locale === loc
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
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
