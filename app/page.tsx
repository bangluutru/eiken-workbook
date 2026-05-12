'use client'

import { useState } from 'react'
import { LevelFilter } from '@/components/vocabulary/LevelFilter'
import { VocabularyList } from '@/components/vocabulary/VocabularyList'
import { CustomWordInput } from '@/components/vocabulary/CustomWordInput'
import { CsvImport } from '@/components/vocabulary/CsvImport'
import { SelectedWordList } from '@/components/vocabulary/SelectedWordList'
import { SettingsPanel } from '@/components/settings/SettingsPanel'
import { WorksheetPreview } from '@/components/worksheet/WorksheetPreview'
import { PdfDownloadButton } from '@/components/worksheet/PdfDownloadButton'
import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import { LOCALES, LOCALE_LABELS } from '@/types/locale'
import type { Locale } from '@/types/locale'

type SourceTab = 'vocabulary' | 'custom' | 'csv'
type MainView = 'words' | 'preview'

const SOURCE_NAV: { id: SourceTab; icon: string; labelKey: 'vocabulary' | 'addCustomWords' | 'importCsv' }[] = [
  { id: 'vocabulary', icon: 'view_list', labelKey: 'vocabulary' },
  { id: 'custom', icon: 'keyboard', labelKey: 'addCustomWords' },
  { id: 'csv', icon: 'upload_file', labelKey: 'importCsv' },
]

export default function HomePage() {
  const { locale, selectedVocabulary, setLocale } = useWorkbookStore()
  const [sourceTab, setSourceTab] = useState<SourceTab>('vocabulary')
  const [mainView, setMainView] = useState<MainView>('words')
  const [showSettings, setShowSettings] = useState(false)

  return (
    <div className="bg-background text-on-surface h-screen w-full flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex h-screen w-72 bg-surface border-r border-outline-variant flex-col shrink-0 no-print">
        {/* Brand */}
        <div className="px-4 py-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary-container flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-on-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
              >
                book_4
              </span>
            </div>
            <div className="min-w-0">
              <div
                className="text-sm font-semibold text-on-surface leading-tight truncate"
                style={{ fontFamily: "'Noto Serif', Georgia, serif" }}
              >
                {t(locale, 'appTitle')}
              </div>
              <div className="text-[11px] text-on-surface-variant">{t(locale, 'appSubtitle')}</div>
            </div>
          </div>
        </div>

        {/* Level filter */}
        <div className="px-4 pb-3 shrink-0">
          <LevelFilter />
        </div>

        <hr className="border-outline-variant mx-4 mb-3 shrink-0" />

        {/* Source navigation */}
        <div className="px-3 shrink-0 mb-1">
          <p className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider px-2 mb-1.5">
            {locale === 'ja' ? 'ソース' : locale === 'vi' ? 'Nguồn' : 'Source'}
          </p>
          <div className="flex flex-col gap-0.5">
            {SOURCE_NAV.map(({ id, icon, labelKey }) => (
              <button
                key={id}
                onClick={() => setSourceTab(id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left w-full ${
                  sourceTab === id
                    ? 'bg-secondary-container text-on-secondary-container font-medium'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0">{icon}</span>
                <span className="truncate">{t(locale, labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Vocabulary / custom / csv content */}
        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-3 min-h-0">
          {sourceTab === 'vocabulary' && <VocabularyList />}
          {sourceTab === 'custom' && <CustomWordInput />}
          {sourceTab === 'csv' && <CsvImport />}
        </div>

        {/* Footer */}
        <div className="shrink-0 px-3 py-3 border-t border-outline-variant">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors w-full text-left ${
              showSettings
                ? 'bg-primary-fixed text-on-primary-fixed font-medium'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            <span className="material-symbols-outlined text-[20px] shrink-0">settings</span>
            <span>{t(locale, 'settings')}</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-background">
        {/* Top App Bar */}
        <header className="w-full sticky top-0 bg-surface border-b border-outline-variant z-20 no-print">
          <div className="flex justify-between items-center px-6 py-0">
            {/* Underline tabs */}
            <div className="flex gap-0">
              <button
                onClick={() => setMainView('words')}
                className={`relative px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  mainView === 'words'
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant'
                }`}
              >
                {t(locale, 'selectedWords')}
                {selectedVocabulary.length > 0 && (
                  <span
                    className={`ml-2 text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                      mainView === 'words'
                        ? 'bg-error text-on-error'
                        : 'bg-surface-container text-on-surface-variant'
                    }`}
                  >
                    {selectedVocabulary.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMainView('preview')}
                className={`px-4 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  mainView === 'preview'
                    ? 'text-primary border-primary'
                    : 'text-on-surface-variant border-transparent hover:text-on-surface hover:border-outline-variant'
                }`}
              >
                {t(locale, 'preview')}
              </button>
            </div>

            {/* Trailing actions */}
            <div className="flex items-center gap-2">
              {/* Locale switcher */}
              <div className="flex items-center gap-0.5 p-1 rounded-xl bg-surface-container">
                {LOCALES.map((loc: Locale) => (
                  <button
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                      locale === loc
                        ? 'bg-surface text-on-surface shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {LOCALE_LABELS[loc]}
                  </button>
                ))}
              </div>
              <div className="h-5 w-px bg-outline-variant mx-1" />
              <PdfDownloadButton />
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 overflow-hidden flex">
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {mainView === 'preview' ? (
              <WorksheetPreview />
            ) : (
              <SelectedWordList />
            )}
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="w-72 shrink-0 border-l border-outline-variant bg-surface overflow-y-auto p-5 no-print">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-on-surface text-sm">{t(locale, 'settings')}</h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
              <SettingsPanel />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
