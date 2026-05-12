import { Font } from '@react-pdf/renderer'

export type PdfFontFamily =
  | 'Helvetica'
  | 'HocTro'
  | 'HP001-4hang'
  | 'HP001-4hang-1oly'
  | 'HP001-4hang-2oly'
  | 'HP001-5hang'
  | 'HP001-5hang-1oly'

export type FontOption = {
  value: PdfFontFamily
  label: string
}

export const FONT_OPTIONS: FontOption[] = [
  { value: 'Helvetica', label: 'Helvetica (Mặc định)' },
  { value: 'HocTro', label: 'Học Trò' },
  { value: 'HP001-4hang', label: 'HP001 4 hàng' },
  { value: 'HP001-4hang-1oly', label: 'HP001 4 hàng (1 ô ly)' },
  { value: 'HP001-4hang-2oly', label: 'HP001 4 hàng (2 ô ly)' },
  { value: 'HP001-5hang', label: 'HP001 5 hàng' },
  { value: 'HP001-5hang-1oly', label: 'HP001 5 hàng (1 ô ly)' },
]

export function getBodyFont(font: PdfFontFamily): string {
  return font === 'Helvetica' ? 'Helvetica' : font
}

export function getBoldFontStyle(font: PdfFontFamily): { fontFamily: string; fontWeight?: 'bold' } {
  if (font === 'Helvetica') return { fontFamily: 'Helvetica-Bold' }
  if (font === 'HP001-4hang' || font === 'HP001-5hang') {
    return { fontFamily: font, fontWeight: 'bold' }
  }
  return { fontFamily: getBodyFont(font) }
}

let fontsRegistered = false

export function registerFonts() {
  if (fontsRegistered) return
  fontsRegistered = true

  Font.register({ family: 'HocTro', src: '/fonts/HLHOCTRO.TTF' })
  Font.register({
    family: 'HP001-4hang',
    fonts: [
      { src: '/fonts/HP001_4_hang_normal.ttf', fontWeight: 'normal' },
      { src: '/fonts/HP001_4_hang_bold.ttf', fontWeight: 'bold' },
    ],
  })
  Font.register({ family: 'HP001-4hang-1oly', src: '/fonts/HP001_4_hang_1_o_ly.ttf' })
  Font.register({ family: 'HP001-4hang-2oly', src: '/fonts/HP001_4_hang_2_o_ly.ttf' })
  Font.register({
    family: 'HP001-5hang',
    fonts: [
      { src: '/fonts/HP001_5_hang_normal.ttf', fontWeight: 'normal' },
      { src: '/fonts/HP001_5_hang_bold.ttf', fontWeight: 'bold' },
    ],
  })
  Font.register({ family: 'HP001-5hang-1oly', src: '/fonts/HP001_5_hang_1_o_ly.ttf' })
}
