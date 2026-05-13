'use client'

import { useWorkbookStore } from '@/store/useWorkbookStore'
import { t } from '@/lib/i18n/dictionaries'
import type { WorksheetSettings, TraceStyle } from '@/types/worksheet'
import { FONT_OPTIONS } from '@/pdf/fontRegistry'
import { computeWritingLines } from '@/lib/worksheet/computeWritingLines'

const WORDS_PER_PAGE_OPTIONS = ['auto', 1, 2, 3, 4, 5, 6, 8, 10] as const
const TRACE_STYLES: TraceStyle[] = ['solid', 'dotted', 'dashed']

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        onClick={() => onChange(!checked)}
        className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer ${
          checked ? 'bg-primary' : 'bg-outline-variant'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
            checked ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </div>
      <span className="text-sm text-on-surface">{label}</span>
    </label>
  )
}

export function SettingsPanel() {
  const { locale, settings, updateSettings } = useWorkbookStore()
  const s = settings

  function update<K extends keyof WorksheetSettings>(
    key: K,
    value: WorksheetSettings[K]
  ) {
    updateSettings({ [key]: value })
  }

  return (
    <div className="space-y-5">
      {/* Paper */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'paperSize')}
        </h3>
        <div className="flex gap-2">
          {(['A4', 'Letter'] as const).map((size) => (
            <button
              key={size}
              onClick={() => update('paperSize', size)}
              className={`flex-1 py-1.5 rounded text-sm font-medium border transition-colors ${
                s.paperSize === size
                  ? 'bg-primary text-on-primary border-transparent'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Orientation */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'orientation')}
        </h3>
        <div className="flex gap-2">
          {(['portrait', 'landscape'] as const).map((o) => (
            <button
              key={o}
              onClick={() => update('orientation', o)}
              className={`flex-1 py-1.5 rounded text-sm font-medium border transition-colors ${
                s.orientation === o
                  ? 'bg-primary text-on-primary border-transparent'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim'
              }`}
            >
              {o === 'portrait' ? t(locale, 'portrait') : t(locale, 'landscape')}
            </button>
          ))}
        </div>
      </section>

      {/* Words per page */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'wordsPerPage')}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {WORDS_PER_PAGE_OPTIONS.map((opt) => (
            <button
              key={String(opt)}
              onClick={() => update('wordsPerPage', opt)}
              className={`px-2.5 py-1 rounded text-sm font-medium border transition-colors ${
                s.wordsPerPage === opt
                  ? 'bg-primary text-on-primary border-transparent'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim'
              }`}
            >
              {opt === 'auto' ? t(locale, 'auto') : opt}
            </button>
          ))}
        </div>
      </section>

      {/* Writing lines — auto-computed from wordsPerPage */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-1">
          {t(locale, 'writingLines')}
        </h3>
        <p className="text-sm text-on-surface-variant">
          {t(locale, 'auto')}{' '}
          <span className="font-medium text-primary">
            {computeWritingLines(s)} {t(locale, 'writingLines').toLowerCase()}
          </span>
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          {t(locale, 'writingLinesAutoHint')}
        </p>
      </section>

      {/* Trace style */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'traceStyle')}
        </h3>
        <div className="flex gap-2">
          {TRACE_STYLES.map((style) => (
            <button
              key={style}
              onClick={() => update('traceStyle', style)}
              className={`flex-1 py-1.5 rounded text-sm font-medium border transition-colors ${
                s.traceStyle === style
                  ? 'bg-primary text-on-primary border-transparent'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary-fixed-dim'
              }`}
            >
              {t(locale, style as 'solid' | 'dotted' | 'dashed')}
            </button>
          ))}
        </div>
      </section>

      {/* Trace opacity */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'traceOpacity')}: {Math.round(s.traceOpacity * 100)}%
        </h3>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(s.traceOpacity * 100)}
          onChange={(e) => update('traceOpacity', Number(e.target.value) / 100)}
          className="w-full accent-primary"
        />
      </section>

      {/* Font scale */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'fontScale')}: {s.fontScale.toFixed(1)}x
        </h3>
        <input
          type="range"
          min={50}
          max={150}
          value={Math.round(s.fontScale * 100)}
          onChange={(e) => update('fontScale', Number(e.target.value) / 100)}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-stone-400 mt-1">
          <span>0.5x</span>
          <span>1.5x</span>
        </div>
      </section>

      {/* Font family */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-2">
          {t(locale, 'fontFamily')}
        </h3>
        <select
          value={s.fontFamily}
          onChange={(e) => update('fontFamily', e.target.value as WorksheetSettings['fontFamily'])}
          className="w-full px-2.5 py-1.5 rounded border border-outline-variant text-sm text-on-surface bg-surface-container-lowest focus:outline-none focus:border-primary"
        >
          {(() => {
            const groups = new Map<string, typeof FONT_OPTIONS>()
            FONT_OPTIONS.forEach((opt) => {
              const g = opt.group || 'Khác'
              if (!groups.has(g)) groups.set(g, [])
              groups.get(g)!.push(opt)
            })
            return Array.from(groups.entries()).map(([group, opts]) => (
              <optgroup key={group} label={group}>
                {opts.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </optgroup>
            ))
          })()}
        </select>
        {/* Font preview */}
        {s.fontFamily !== 'Helvetica' && (
          <div
            className="mt-2 px-3 py-2 rounded bg-surface-container-lowest border border-outline-variant/50 text-on-surface"
            style={{
              fontFamily: `'${s.fontFamily}', sans-serif`,
              fontSize: '16px',
              lineHeight: '1.6',
            }}
          >
            A B C D E a b c d e
          </div>
        )}
      </section>

      {/* Display toggles */}
      <section>
        <h3 className="text-xs font-semibold text-on-surface-variant/70 uppercase tracking-wider mb-3">
          表示設定
        </h3>
        <div className="space-y-2.5">
          <Toggle
            checked={s.showJapanese}
            onChange={(v) => update('showJapanese', v)}
            label={t(locale, 'showJapanese')}
          />
          <Toggle
            checked={s.showVietnamese}
            onChange={(v) => update('showVietnamese', v)}
            label={t(locale, 'showVietnamese')}
          />
          <Toggle
            checked={s.showPartOfSpeech}
            onChange={(v) => update('showPartOfSpeech', v)}
            label={t(locale, 'showPartOfSpeech')}
          />
          <Toggle
            checked={s.showExample}
            onChange={(v) => update('showExample', v)}
            label={t(locale, 'showExample')}
          />
          {s.showExample && (
            <>
              <div className="ml-4 space-y-2">
                <Toggle
                  checked={s.showExampleJapanese}
                  onChange={(v) => update('showExampleJapanese', v)}
                  label={t(locale, 'showExampleJapanese')}
                />
                <Toggle
                  checked={s.showExampleVietnamese}
                  onChange={(v) => update('showExampleVietnamese', v)}
                  label={t(locale, 'showExampleVietnamese')}
                />
              </div>
            </>
          )}
          <Toggle
            checked={s.showRecall}
            onChange={(v) => update('showRecall', v)}
            label={t(locale, 'showRecall')}
          />
          <Toggle
            checked={s.showReading}
            onChange={(v) => update('showReading', v)}
            label={t(locale, 'showReading')}
          />
          <Toggle
            checked={s.showMeaningEn}
            onChange={(v) => update('showMeaningEn', v)}
            label={t(locale, 'showMeaningEn')}
          />
        </div>
      </section>
    </div>
  )
}
