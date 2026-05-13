import { Font } from '@react-pdf/renderer'

export type PdfFontFamily =
  | 'Helvetica'
  | 'HocTro'
  | 'HP001-4hang'
  | 'HP001-4hang-1oly'
  | 'HP001-4hang-2oly'
  | 'HP001-5hang'
  | 'HP001-5hang-1oly'
  | 'HP001-4H'
  | 'HP001-5H'
  | 'HP001-TD-4H'
  | 'HP001-b4h'
  | 'HP001-b5h'
  | 'HP001-n4h'
  | 'HP001-n5h'

export type FontOption = {
  value: PdfFontFamily
  label: string
  group?: string
}

export const FONT_OPTIONS: FontOption[] = [
  // Default
  { value: 'Helvetica', label: 'Helvetica (Mặc định)', group: 'Mặc định' },
  { value: 'HocTro', label: 'Học Trò', group: 'Mặc định' },
  // Ô ly (có đường kẻ)
  { value: 'HP001-4hang', label: 'HP001 4 hàng (ô ly)', group: 'Ô ly' },
  { value: 'HP001-4hang-1oly', label: 'HP001 4 hàng (1 ô ly)', group: 'Ô ly' },
  { value: 'HP001-4hang-2oly', label: 'HP001 4 hàng (2 ô ly)', group: 'Ô ly' },
  { value: 'HP001-5hang', label: 'HP001 5 hàng (ô ly)', group: 'Ô ly' },
  { value: 'HP001-5hang-1oly', label: 'HP001 5 hàng (1 ô ly)', group: 'Ô ly' },
  // Tiểu học (không đường kẻ)
  { value: 'HP001-4H', label: 'HP001 4 hàng', group: 'Tiểu học' },
  { value: 'HP001-5H', label: 'HP001 5 hàng', group: 'Tiểu học' },
  { value: 'HP001-TD-4H', label: 'HP001 Tập Đọc 4 hàng', group: 'Tiểu học' },
  { value: 'HP001-b4h', label: 'HP001 B 4 hàng', group: 'Tiểu học' },
  { value: 'HP001-b5h', label: 'HP001 B 5 hàng', group: 'Tiểu học' },
  { value: 'HP001-n4h', label: 'HP001 N 4 hàng', group: 'Tiểu học' },
  { value: 'HP001-n5h', label: 'HP001 N 5 hàng', group: 'Tiểu học' },
]

export function getBodyFont(font: PdfFontFamily): string {
  return font === 'Helvetica' ? 'Helvetica' : font
}

export function getBoldFontStyle(font: PdfFontFamily): { fontFamily: string; fontWeight?: 'bold' } {
  if (font === 'Helvetica') return { fontFamily: 'Helvetica-Bold' }
  // Fonts that have dedicated bold variants
  if (font === 'HP001-4hang' || font === 'HP001-5hang' || font === 'HP001-4H' || font === 'HP001-5H') {
    return { fontFamily: font, fontWeight: 'bold' }
  }
  return { fontFamily: getBodyFont(font) }
}

let registeredOrigin: string | null = null

export function registerFonts(origin = '') {
  // Re-register if the origin changed (e.g. dev vs prod)
  if (registeredOrigin === origin) return
  registeredOrigin = origin

  const base = origin.replace(/\/$/, '')
  const url = (path: string) => `${base}${path}`

  // Each font must declare every weight+style combo it will be used with.
  // Custom fonts have no real italic/bold-italic files, so we map those
  // variants to the closest real file — preventing @react-pdf/renderer from
  // throwing "Could not resolve font" when it encounters fontStyle:'italic'.
  const single = (src: string) => [
    { src, fontWeight: 'normal' as const, fontStyle: 'normal' as const },
    { src, fontWeight: 'normal' as const, fontStyle: 'italic' as const },
    { src, fontWeight: 'bold'   as const, fontStyle: 'normal' as const },
    { src, fontWeight: 'bold'   as const, fontStyle: 'italic' as const },
  ]

  const withBold = (normalSrc: string, boldSrc: string) => [
    { src: normalSrc, fontWeight: 'normal' as const, fontStyle: 'normal' as const },
    { src: normalSrc, fontWeight: 'normal' as const, fontStyle: 'italic' as const },
    { src: boldSrc,   fontWeight: 'bold'   as const, fontStyle: 'normal' as const },
    { src: boldSrc,   fontWeight: 'bold'   as const, fontStyle: 'italic' as const },
  ]

  // ---- Existing fonts ----
  Font.register({ family: 'HocTro', fonts: single(url('/fonts/HLHOCTRO.TTF')) })
  Font.register({
    family: 'HP001-4hang',
    fonts: withBold(url('/fonts/HP001_4_hang_normal.ttf'), url('/fonts/HP001_4_hang_bold.ttf')),
  })
  Font.register({ family: 'HP001-4hang-1oly', fonts: single(url('/fonts/HP001_4_hang_1_o_ly.ttf')) })
  Font.register({ family: 'HP001-4hang-2oly', fonts: single(url('/fonts/HP001_4_hang_2_o_ly.ttf')) })
  Font.register({
    family: 'HP001-5hang',
    fonts: withBold(url('/fonts/HP001_5_hang_normal.ttf'), url('/fonts/HP001_5_hang_bold.ttf')),
  })
  Font.register({ family: 'HP001-5hang-1oly', fonts: single(url('/fonts/HP001_5_hang_1_o_ly.ttf')) })

  // ---- New tiểu học fonts ----
  Font.register({
    family: 'HP001-4H',
    fonts: withBold(url('/fonts/HP001_4H_normal.ttf'), url('/fonts/HP001_4H_bold.ttf')),
  })
  Font.register({
    family: 'HP001-5H',
    fonts: withBold(url('/fonts/HP001_5H_normal.ttf'), url('/fonts/HP001_5H_bold.ttf')),
  })
  Font.register({ family: 'HP001-TD-4H', fonts: single(url('/fonts/HP001_TD_4H.ttf')) })
  Font.register({ family: 'HP001-b4h', fonts: single(url('/fonts/HP001_b4h.ttf')) })
  Font.register({ family: 'HP001-b5h', fonts: single(url('/fonts/HP001_b5h.ttf')) })
  Font.register({ family: 'HP001-n4h', fonts: single(url('/fonts/HP001_n4h.ttf')) })
  Font.register({ family: 'HP001-n5h', fonts: single(url('/fonts/HP001_n5h.ttf')) })
}
