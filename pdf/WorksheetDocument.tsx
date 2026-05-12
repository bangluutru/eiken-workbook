import { Document, Page, View, Text } from '@react-pdf/renderer'
import type { Vocabulary } from '@/types/vocabulary'
import type { WorksheetSettings } from '@/types/worksheet'
import { pdfStyles } from './pdfStyles'
import { VocabularyBlockPdf } from './VocabularyBlockPdf'
import { getBodyFont } from './fontRegistry'
import { computeWritingLines } from '@/lib/worksheet/computeWritingLines'

type Props = {
  vocabulary: Vocabulary[]
  settings: WorksheetSettings
}

function getPageSize(settings: WorksheetSettings): [number, number] | 'A4' | 'LETTER' {
  if (settings.paperSize === 'Letter') {
    return settings.orientation === 'landscape' ? [792, 612] : 'LETTER'
  }
  return 'A4'
}

export function WorksheetDocument({ vocabulary, settings }: Props) {
  const wordsPerPage =
    settings.wordsPerPage === 'auto' ? 3 : settings.wordsPerPage

  const writingLines = computeWritingLines(settings)

  const pages: Vocabulary[][] = []
  for (let i = 0; i < vocabulary.length; i += wordsPerPage) {
    pages.push(vocabulary.slice(i, i + wordsPerPage))
  }

  const size = getPageSize(settings)

  return (
    <Document>
      {pages.map((pageVocab, pageIdx) => (
        <Page
          key={pageIdx}
          size={size}
          orientation={settings.orientation}
          style={[pdfStyles.page, { fontFamily: getBodyFont(settings.fontFamily) }]}
        >
          <View>
            {pageVocab.map((vocab, i) => (
              <VocabularyBlockPdf
                key={vocab.id}
                vocabulary={vocab}
                settings={settings}
                index={pageIdx * wordsPerPage + i + 1}
                lines={writingLines}
              />
            ))}
          </View>
          <Text
            style={pdfStyles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `${pageNumber} / ${totalPages}`
            }
            fixed
          />
        </Page>
      ))}
    </Document>
  )
}
