import { View, Text } from '@react-pdf/renderer'
import type { Vocabulary } from '@/types/vocabulary'
import type { WorksheetSettings } from '@/types/worksheet'
import { pdfStyles } from './pdfStyles'
import { WritingGridPdf } from './WritingGridPdf'
import { getBoldFontStyle } from './fontRegistry'

type Props = {
  vocabulary: Vocabulary
  settings: WorksheetSettings
  index: number
}

export function VocabularyBlockPdf({ vocabulary: vocab, settings: s, index }: Props) {
  const fs = s.fontScale
  const traceText = Array(Math.ceil(50 / (vocab.word.length + 3)))
    .fill(vocab.word)
    .join('   ')

  return (
    <View style={[pdfStyles.block, { marginBottom: 12 }]} wrap={false}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <View style={pdfStyles.wordArea}>
          <Text style={[pdfStyles.word, { fontSize: Math.round(13 * fs), ...getBoldFontStyle(s.fontFamily) }]}>
            {index}. {vocab.word}
          </Text>
          {s.showReading && vocab.reading && (
            <Text style={[pdfStyles.reading, { fontSize: Math.round(9 * fs) }]}>
              /{vocab.reading}/
            </Text>
          )}
          {s.showPartOfSpeech && vocab.pos && (
            <Text style={[pdfStyles.pos, { fontSize: Math.round(9 * fs) }]}>
              ({vocab.pos})
            </Text>
          )}
        </View>
        <View style={pdfStyles.meaningArea}>
          {s.showMeaningEn && vocab.meaningEn && (
            <Text style={[pdfStyles.meaningEn, { fontSize: Math.round(9 * fs) }]}>
              {vocab.meaningEn}
            </Text>
          )}
          {s.showJapanese && vocab.japanese && (
            <Text style={[pdfStyles.jaText, { fontSize: Math.round(9 * fs) }]}>
              {vocab.japanese}
            </Text>
          )}
          {s.showVietnamese && vocab.vietnamese && (
            <Text style={[pdfStyles.viText, { fontSize: Math.round(9 * fs) }]}>
              {vocab.vietnamese}
            </Text>
          )}
        </View>
      </View>

      {/* Example */}
      {s.showExample && vocab.example && (
        <View style={[pdfStyles.exampleBlock, { marginBottom: 6 }]}>
          <Text style={[pdfStyles.exampleText, { fontSize: Math.round(8 * fs) }]}>
            {vocab.example}
          </Text>
          {s.showExampleJapanese && vocab.exampleJa && (
            <Text style={[pdfStyles.exampleTranslation, { fontSize: Math.round(8 * fs) }]}>
              {vocab.exampleJa}
            </Text>
          )}
          {s.showExampleVietnamese && vocab.exampleVi && (
            <Text style={[pdfStyles.exampleTranslation, { fontSize: Math.round(8 * fs) }]}>
              {vocab.exampleVi}
            </Text>
          )}
        </View>
      )}

      {/* Trace */}
      <Text
        style={[
          pdfStyles.traceText,
          {
            fontSize: Math.round(11 * fs),
            color: `rgba(100,100,100,${s.traceOpacity})`,
            marginBottom: 4,
          },
        ]}
  >
        {traceText}
      </Text>

      {/* Writing grid */}
      <WritingGridPdf lines={s.writingLines} fontScale={fs} />

      {/* Recall */}
      {s.showRecall && (vocab.japanese || vocab.vietnamese) && (
        <View style={pdfStyles.recallSection}>
          <Text style={pdfStyles.recallLabel}>
            {vocab.japanese && s.showJapanese
              ? `${vocab.japanese} →`
              : vocab.vietnamese && s.showVietnamese
              ? `${vocab.vietnamese} →`
              : '→'}
          </Text>
          <View style={[pdfStyles.recallLine, { height: Math.round(18 * fs) }]} />
        </View>
      )}
    </View>
  )
}
