import { View } from '@react-pdf/renderer'
import { pdfStyles } from './pdfStyles'

type Props = {
  lines: number
  fontScale: number
}

export function WritingGridPdf({ lines, fontScale }: Props) {
  const rowHeight = 20 * fontScale
  const midPoint = Math.round(rowHeight * 0.3)
  const baseLine = Math.round(rowHeight * 0.65)

  return (
    <View>
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
