import { View, Text } from '@react-pdf/renderer'
import { pdfStyles } from './pdfStyles'

type Props = {
  lines: number
  fontSize: number
  traceText?: string
  traceOpacity?: number
  fontFamily?: string
}

/** Detect whether the selected font is a "Playwrite Guides" font. */
function isGuidesFont(fontFamily: string): boolean {
  return fontFamily.includes('Guides')
}

export function WritingGridPdf({ lines, fontSize, traceText, traceOpacity = 0.25, fontFamily = 'Helvetica' }: Props) {
  // PDF points: fontSize is in px, convert to pt-ish scale for PDF (roughly 1:0.75)
  const pdfFontSize = fontSize * 0.75

  // ─── MODE 1: Playwrite Guides font — use font's built-in guide lines ───
  if (isGuidesFont(fontFamily)) {
    const underscoreRow = '_'.repeat(100)

    const baseTextStyle = {
      fontFamily,
      fontSize: pdfFontSize,
    }

    return (
      <View>
        {/* Trace row — font renders guide lines behind the text */}
        {traceText && (
          <Text
            style={{
              ...baseTextStyle,
              color: `rgba(100,100,100,${traceOpacity})`,
              letterSpacing: 3,
            }}
          >
            {traceText}
          </Text>
        )}

        {/* Practice rows — underscores render blank guide lines */}
        {Array.from({ length: lines }).map((_, i) => (
          <Text
            key={i}
            style={{
              ...baseTextStyle,
              color: 'rgba(150,150,150,0.25)',
            }}
          >
            {underscoreRow}
          </Text>
        ))}
      </View>
    )
  }

  // ─── MODE 2: Non-Guides fonts — CSS-drawn guide lines ───
  const rowHeight = pdfFontSize * 3
  const midPoint = Math.round(rowHeight * 0.3)
  const baseLine = Math.round(rowHeight * 0.65)

  return (
    <View>
      {/* Trace row — guide lines + faded text */}
      {traceText && (
        <View style={{ height: rowHeight, position: 'relative' }}>
          <View style={[pdfStyles.topLine, { height: 0 }]} />
          <View style={[pdfStyles.midLine, { height: 0, marginTop: midPoint }]} />
          <View style={[pdfStyles.baseLine, { height: 0, marginTop: baseLine - midPoint }]} />
          <View
            style={[
              pdfStyles.bottomLine,
              { height: 0, marginTop: rowHeight - baseLine - 0.5 },
            ]}
          />
          {/* Overlay trace text */}
          <Text
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              fontSize: pdfFontSize,
              color: `rgba(100,100,100,${traceOpacity})`,
              letterSpacing: 3,
              lineHeight: rowHeight / pdfFontSize,
              fontFamily: fontFamily || 'Helvetica',
            }}
          >
            {traceText}
          </Text>
        </View>
      )}

      {/* Practice rows */}
      {Array.from({ length: lines }).map((_, i) => (
        <View key={i} style={{ height: rowHeight }}>
          <View style={[pdfStyles.topLine, { height: 0 }]} />
          <View style={[pdfStyles.midLine, { height: 0, marginTop: midPoint }]} />
          <View style={[pdfStyles.baseLine, { height: 0, marginTop: baseLine - midPoint }]} />
          <View
            style={[
              pdfStyles.bottomLine,
              { height: 0, marginTop: rowHeight - baseLine - 0.5 },
            ]}
          />
        </View>
      ))}
    </View>
  )
}
