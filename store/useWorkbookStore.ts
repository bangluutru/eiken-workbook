'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale } from '@/types/locale'
import type { EikenLevel, Vocabulary } from '@/types/vocabulary'
import type { WorksheetSettings } from '@/types/worksheet'
import { DEFAULT_SETTINGS } from '@/types/worksheet'

type WorkbookState = {
  locale: Locale
  selectedLevels: EikenLevel[]
  selectedVocabulary: Vocabulary[]
  settings: WorksheetSettings
  searchQuery: string
  activeTab: 'vocabulary' | 'preview'

  setLocale: (locale: Locale) => void
  setSelectedLevels: (levels: EikenLevel[]) => void
  toggleLevel: (level: EikenLevel) => void
  addVocabulary: (items: Vocabulary[]) => void
  removeVocabulary: (id: string) => void
  removeVocabularyBatch: (ids: string[]) => void
  updateVocabulary: (id: string, updates: Partial<Vocabulary>) => void
  clearVocabulary: () => void
  updateSettings: (updates: Partial<WorksheetSettings>) => void
  setSearchQuery: (q: string) => void
  setActiveTab: (tab: 'vocabulary' | 'preview') => void
}

export const useWorkbookStore = create<WorkbookState>()(
  persist(
    (set, get) => ({
      locale: 'ja',
      selectedLevels: ['準2級'],
      selectedVocabulary: [],
      settings: DEFAULT_SETTINGS,
      searchQuery: '',
      activeTab: 'vocabulary',

      setLocale: (locale) => set({ locale }),

      setSelectedLevels: (levels) => set({ selectedLevels: levels }),

      toggleLevel: (level) => {
        const { selectedLevels } = get()
        if (selectedLevels.includes(level)) {
          set({ selectedLevels: selectedLevels.filter((l) => l !== level) })
        } else {
          set({ selectedLevels: [...selectedLevels, level] })
        }
      },

      addVocabulary: (items) => {
        const { selectedVocabulary } = get()
        const existingIds = new Set(selectedVocabulary.map((v) => v.id))
        const existingWords = new Set(
          selectedVocabulary.map((v) => v.word.toLowerCase())
        )
        const newItems = items.filter(
          (item) =>
            !existingIds.has(item.id) &&
            !existingWords.has(item.word.toLowerCase())
        )
        set({ selectedVocabulary: [...selectedVocabulary, ...newItems] })
      },

      removeVocabulary: (id) => {
        set((state) => ({
          selectedVocabulary: state.selectedVocabulary.filter((v) => v.id !== id),
        }))
      },

      removeVocabularyBatch: (ids) => {
        const idSet = new Set(ids)
        set((state) => ({
          selectedVocabulary: state.selectedVocabulary.filter((v) => !idSet.has(v.id)),
        }))
      },

      updateVocabulary: (id, updates) => {
        set((state) => ({
          selectedVocabulary: state.selectedVocabulary.map((v) =>
            v.id === id ? { ...v, ...updates } : v
          ),
        }))
      },

      clearVocabulary: () => set({ selectedVocabulary: [] }),

      updateSettings: (updates) => {
        set((state) => ({ settings: { ...state.settings, ...updates } }))
      },

      setSearchQuery: (q) => set({ searchQuery: q }),

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: 'eiken-workbook-store',
      version: 1,
      partialize: (state) => ({
        locale: state.locale,
        settings: state.settings,
        selectedLevels: state.selectedLevels,
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      migrate: (persisted: any, version: number) => {
        if (version === 0 && persisted?.settings) {
          // Migrate fontScale (multiplier 0.5-1.5) → fontSize (px 8-24)
          if ('fontScale' in persisted.settings && !('fontSize' in persisted.settings)) {
            const scale = persisted.settings.fontScale as number
            persisted.settings.fontSize = Math.round(Math.max(8, Math.min(24, 16 * scale)))
            delete persisted.settings.fontScale
          }
        }
        return persisted as WorkbookState
      },
    }
  )
)
