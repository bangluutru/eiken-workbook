import { StyleSheet } from '@react-pdf/renderer'

export const pdfStyles = StyleSheet.create({
  page: {
    paddingTop: 30,
    paddingBottom: 30,
    paddingLeft: 42,
    paddingRight: 42,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 15,
    right: 42,
    fontSize: 8,
    color: '#cccccc',
  },
  block: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
    borderRadius: 4,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  wordArea: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    flex: 1,
  },
  word: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#111827',
    marginRight: 4,
  },
  pos: {
    fontSize: 9,
    color: '#9ca3af',
    fontStyle: 'italic',
  },
  meaningArea: {
    alignItems: 'flex-end',
    flexShrink: 0,
    maxWidth: '40%',
  },
  jaText: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'right',
  },
  viText: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'right',
  },
  exampleBlock: {
    marginBottom: 8,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#bfdbfe',
    borderLeftStyle: 'solid',
  },
  exampleText: {
    fontSize: 9,
    color: '#374151',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  exampleTranslation: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 1,
  },
  traceText: {
    fontSize: 11,
    letterSpacing: 3,
    marginBottom: 4,
    color: '#aaaaaa',
  },
  writingRow: {
    position: 'relative',
    marginBottom: 0,
  },
  topLine: {
    borderTopWidth: 0.75,
    borderTopColor: '#9ca3af',
    borderTopStyle: 'solid',
  },
  midLine: {
    borderTopWidth: 0.5,
    borderTopColor: '#d1d5db',
    borderTopStyle: 'dashed',
  },
  baseLine: {
    borderTopWidth: 0.75,
    borderTopColor: '#9ca3af',
    borderTopStyle: 'solid',
  },
  bottomLine: {
    borderTopWidth: 0.5,
    borderTopColor: '#d1d5db',
    borderTopStyle: 'solid',
  },
  recallSection: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#f3f4f6',
    borderTopStyle: 'solid',
  },
  recallLabel: {
    fontSize: 8,
    color: '#9ca3af',
    marginBottom: 4,
  },
  recallLine: {
    borderBottomWidth: 0.75,
    borderBottomColor: '#6b7280',
    borderBottomStyle: 'solid',
    width: '100%',
    marginBottom: 4,
  },
})
