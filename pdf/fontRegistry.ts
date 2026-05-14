import { Font } from '@react-pdf/renderer'

export type PdfFontFamily =
  | 'Helvetica'
  | 'Times-Roman'
  | 'Playwrite MX Guides'
  | 'Playwrite GB J Guides'
  | 'MonteCarlo'

export type FontOption = {
  value: PdfFontFamily
  label: string
}

export const FONT_OPTIONS: FontOption[] = [
  { value: 'Helvetica', label: 'Helvetica' },
  { value: 'Times-Roman', label: 'Times New Roman' },
  { value: 'Playwrite MX Guides', label: 'Playwrite México Guides' },
  { value: 'Playwrite GB J Guides', label: 'Playwrite England Joined Guides' },
  { value: 'MonteCarlo', label: 'MonteCarlo' },
]

export function getBodyFont(font: PdfFontFamily): string {
  return font
}

export function getBoldFontStyle(font: PdfFontFamily): { fontFamily: string; fontWeight?: 'bold' } {
  if (font === 'Helvetica') return { fontFamily: 'Helvetica-Bold' }
  if (font === 'Times-Roman') return { fontFamily: 'Times-Bold' }
  // Google Fonts — single weight, no bold variant
  return { fontFamily: font }
}

let registeredOrigin: string | null = null

export function registerFonts(origin = '') {
  if (registeredOrigin === origin) return
  registeredOrigin = origin

  // Helvetica and Times-Roman are built into @react-pdf/renderer — no registration needed.

  // Helper: register a single-weight Google Font with all style combos
  // to prevent "Could not resolve font" errors from react-pdf.
  const single = (src: string) => [
    { src, fontWeight: 'normal' as const, fontStyle: 'normal' as const },
    { src, fontWeight: 'normal' as const, fontStyle: 'italic' as const },
    { src, fontWeight: 'bold'   as const, fontStyle: 'normal' as const },
    { src, fontWeight: 'bold'   as const, fontStyle: 'italic' as const },
  ]

  Font.register({
    family: 'Playwrite MX Guides',
    fonts: single('https://fonts.gstatic.com/s/playwritemxguides/v1/k3kMo9ESPe9dzQ1UGbvoZhnhbtfklWqN0qw.ttf'),
  })

  Font.register({
    family: 'Playwrite GB J Guides',
    fonts: single('https://fonts.gstatic.com/s/playwritegbjguides/v2/CSRh4yJOn-mMWCgLPl16K6UKAvM5yY1BdhmIKw.ttf'),
  })

  Font.register({
    family: 'MonteCarlo',
    fonts: single('https://fonts.gstatic.com/s/montecarlo/v13/buEzpo6-f9X01GadLA0G0Co.ttf'),
  })
}
