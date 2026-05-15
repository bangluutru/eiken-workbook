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
  lines: number
}

export function VocabularyBlockPdf({ vocabulary: vocab, settings: s, index, lines }: Props) {
  const fs = s.fontSize
  // PDF uses pt-scale: convert px to approximate pt (0.75 ratio)
  const pdfFs = fs * 0.75
  const traceText = Array(Math.ceil(50 / (vocab.word.length + 3)))
    .fill(vocab.word)
    .join('   ')

  return (
    <View style={[pdfStyles.block, { marginBottom: 12 }]} wrap={false}>
      {/* Header */}
      <View style={pdfStyles.header}>
        <View style={pdfStyles.wordArea}>
          <Text style={[pdfStyles.word, { fontSize: Math.round(pdfFs * 0.8125), ...getBoldFontStyle(s.fontFamily) }]}>
            {index}. {vocab.word}
          </Text>
          {s.showReading && vocab.reading && (
            <Text style={[pdfStyles.reading, { fontSize: Math.round(pdfFs * 0.5625) }]}>
              /{vocab.reading}/
            </Text>
          )}
          {s.showPartOfSpeech && vocab.pos && (
            <Text style={[pdfStyles.pos, { fontSize: Math.round(pdfFs * 0.5625) }]}>
              ({vocab.pos})
            </Text>
          )}
        </View>
        <View style={pdfStyles.meaningArea}>
          {s.showMeaningEn && vocab.meaningEn && (
            <Text style={[pdfStyles.meaningEn, { fontSize: Math.round(pdfFs * 0.5625) }]}>
              {vocab.meaningEn}
            </Text>
          )}
          {s.showJapanese && vocab.japanese && (
            <Text style={[pdfStyles.jaText, { fontSize: Math.round(pdfFs * 0.5625) }]}>
              {vocab.japanese}
            </Text>
          )}
          {s.showVietnamese && vocab.vietnamese && (
            <Text style={[pdfStyles.viText, { fontSize: Math.round(pdfFs * 0.5625) }]}>
              {vocab.vietnamese}
            </Text>
          )}
        </View>
      </View>

      {/* Example */}
      {s.showExample && vocab.example && (
        <View style={[pdfStyles.exampleBlock, { marginBottom: 6 }]}>
          <Text style={[pdfStyles.exampleText, { fontSize: Math.round(pdfFs * 0.5) }]}>
            {vocab.example}
          </Text>
          {s.showExampleJapanese && vocab.exampleJa && (
            <Text style={[pdfStyles.exampleTranslation, { fontSize: Math.round(pdfFs * 0.5) }]}>
              {vocab.exampleJa}
            </Text>
          )}
          {s.showExampleVietnamese && vocab.exampleVi && (
            <Text style={[pdfStyles.exampleTranslation, { fontSize: Math.round(pdfFs * 0.5) }]}>
              {vocab.exampleVi}
            </Text>
          )}
        </View>
      )}

      {/* Writing grid with integrated trace text */}
      <WritingGridPdf
        lines={lines}
        fontSize={fs}
        traceText={traceText}
        traceOpacity={s.traceOpacity}
        fontFamily={s.fontFamily}
      />

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
          <View style={[pdfStyles.recallLine, { height: Math.round(pdfFs * 1.125) }]} />
        </View>
      )}
    </View>
  )
}
