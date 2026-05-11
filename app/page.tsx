'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
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
import { Settings, Eye, BookOpen, List, FileText } from 'lucide-react'

type SideTab = 'vocabulary' | 'custom' | 'csv'

export default function HomePage() {
  const { locale, selectedVocabulary } = useWorkbookStore()
  const [sideTab, setSideTab] = useState<SideTab>('vocabulary')
  const [showSettings, setShowSettings] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel: vocabulary selection */}
        <div className="w-80 flex-shrink-0 flex flex-col border-r border-gray-200 bg-white overflow-hidden no-print">
          <div className="p-4 border-b border-gray-100 space-y-3">
            <LevelFilter />
          </div>

          {/* Tab bar */}
          <div className="flex border-b border-gray-100">
            {(
              [
                ['vocabulary', BookOpen, t(locale, 'vocabulary')],
                ['custom', List, t(locale, 'addCustomWords')],
                ['csv', FileText, t(locale, 'importCsv')],
              ] as [SideTab, typeof BookOpen, string][]
            ).map(([tab, Icon, label]) => (
              <button
                key={tab}
                onClick={() => setSideTab(tab)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-xs transition-colors ${
                  sideTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate px-1">{label}</span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {sideTab === 'vocabulary' && <VocabularyList />}
            {sideTab === 'custom' && (
              <div className="space-y-6">
                <CustomWordInput />
              </div>
            )}
            {sideTab === 'csv' && <CsvImport />}
          </div>
        </div>

        {/* Center: selected words or preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-200 no-print">
            <div className="flex rounded-md border border-gray-200 overflow-hidden">
              <button
                onClick={() => setShowPreview(false)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  !showPreview
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <List className="w-4 h-4" />
                {t(locale, 'selectedWords')}
                {selectedVocabulary.length > 0 && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                      !showPreview ? 'bg-white/20' : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {selectedVocabulary.length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className={`px-3 py-1.5 text-sm font-medium transition-colors flex items-center gap-1.5 ${
                  showPreview
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Eye className="w-4 h-4" />
                {t(locale, 'preview')}
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  showSettings
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">{t(locale, 'settings')}</span>
              </button>
              <PdfDownloadButton />
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex">
            {/* Main content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {showPreview ? (
                <WorksheetPreview />
              ) : (
                <SelectedWordList />
              )}
            </div>

            {/* Settings panel */}
            {showSettings && (
              <div className="w-72 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto p-4 no-print">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900 text-sm">
                    {t(locale, 'settings')}
                  </h2>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="text-gray-400 hover:text-gray-600 text-sm"
                  >
                    ✕
                  </button>
                </div>
                <SettingsPanel />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
