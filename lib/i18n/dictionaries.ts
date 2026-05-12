import type { Locale } from '@/types/locale'

type Dictionary = {
  appTitle: string
  appSubtitle: string
  selectLanguage: string
  selectLevel: string
  allLevels: string
  vocabulary: string
  searchPlaceholder: string
  selectedWords: string
  noWordsSelected: string
  addCustomWords: string
  customWordsPlaceholder: string
  addWords: string
  importCsv: string
  randomSelect: string
  randomCount: string
  selectAll: string
  clearAll: string
  preview: string
  exportPdf: string
  settings: string
  wordsPerPage: string
  writingLines: string
  traceStyle: string
  traceOpacity: string
  showJapanese: string
  showVietnamese: string
  showPartOfSpeech: string
  showExample: string
  showExampleJapanese: string
  showExampleVietnamese: string
  showRecall: string
  paperSize: string
  orientation: string
  portrait: string
  landscape: string
  auto: string
  solid: string
  dotted: string
  dashed: string
  recallLabel: string
  traceLine: string
  remove: string
  edit: string
  save: string
  cancel: string
  word: string
  japanese: string
  vietnamese: string
  example: string
  exampleJa: string
  exampleVi: string
  partOfSpeech: string
  level: string
  source: string
  customSource: string
  csvSource: string
  builtinSource: string
  importSuccess: string
  importErrors: string
  dropCsvHere: string
  csvFormatHint: string
  fontScale: string
  fontFamily: string
  showReading: string
  showMeaningEn: string
  noPreview: string
  loading: string
  writingLinesAutoHint: string
}

const ja: Dictionary = {
  appTitle: '英検 ライティングワークブック',
  appSubtitle: '英語の手書き練習プリントを作成',
  selectLanguage: '言語を選択',
  selectLevel: '英検レベルを選択',
  allLevels: '全レベル',
  vocabulary: '単語リスト',
  searchPlaceholder: '単語を検索...',
  selectedWords: '選択した単語',
  noWordsSelected: '単語が選択されていません',
  addCustomWords: '単語を手入力',
  customWordsPlaceholder: '1行に1単語を入力\n（例）environment\nnecessary\nimprove',
  addWords: '追加',
  importCsv: 'CSVインポート',
  randomSelect: 'ランダム選択',
  randomCount: '件',
  selectAll: '全て選択',
  clearAll: '全てクリア',
  preview: 'プレビュー',
  exportPdf: 'PDFをダウンロード',
  settings: '設定',
  wordsPerPage: '1ページあたりの単語数',
  writingLines: '書き取り行数',
  traceStyle: 'なぞり書きスタイル',
  traceOpacity: 'なぞり書きの濃さ',
  showJapanese: '日本語訳を表示',
  showVietnamese: 'ベトナム語訳を表示',
  showPartOfSpeech: '品詞を表示',
  showExample: '例文を表示',
  showExampleJapanese: '例文の日本語訳を表示',
  showExampleVietnamese: '例文のベトナム語訳を表示',
  showRecall: '思い出しテストを表示',
  paperSize: '用紙サイズ',
  orientation: '向き',
  portrait: '縦',
  landscape: '横',
  auto: '自動',
  solid: '実線',
  dotted: '点線',
  dashed: '破線',
  recallLabel: '日本語を見て英語を書こう：',
  traceLine: 'なぞり書き',
  remove: '削除',
  edit: '編集',
  save: '保存',
  cancel: 'キャンセル',
  word: '英単語',
  japanese: '日本語',
  vietnamese: 'ベトナム語',
  example: '例文',
  exampleJa: '例文（日本語）',
  exampleVi: '例文（ベトナム語）',
  partOfSpeech: '品詞',
  level: 'レベル',
  source: 'ソース',
  customSource: '手入力',
  csvSource: 'CSV',
  builtinSource: '内蔵',
  importSuccess: '件のデータをインポートしました',
  importErrors: '件のエラーがありました',
  dropCsvHere: 'CSVファイルをドロップするか、クリックして選択',
  csvFormatHint: '形式: word,japanese,vietnamese,level,pos,example,exampleJa,exampleVi',
  fontScale: '文字サイズ',
  fontFamily: 'フォント',
  showReading: '発音記号（IPA）を表示',
  showMeaningEn: '英語の意味を表示',
  noPreview: 'プレビューする単語を選択してください',
  loading: '読み込み中...',
  writingLinesAutoHint: '1ページの単語数と表示設定に応じて自動調整',
}

const vi: Dictionary = {
  appTitle: 'Vở Bài Tập Viết Anh Văn EIKEN',
  appSubtitle: 'Tạo phiếu luyện viết tay tiếng Anh để in',
  selectLanguage: 'Chọn ngôn ngữ',
  selectLevel: 'Chọn cấp độ EIKEN',
  allLevels: 'Tất cả cấp độ',
  vocabulary: 'Danh sách từ vựng',
  searchPlaceholder: 'Tìm kiếm từ...',
  selectedWords: 'Từ đã chọn',
  noWordsSelected: 'Chưa chọn từ nào',
  addCustomWords: 'Nhập từ thủ công',
  customWordsPlaceholder: 'Nhập mỗi từ một dòng\n(Ví dụ) environment\nnecessary\nimprove',
  addWords: 'Thêm',
  importCsv: 'Nhập CSV',
  randomSelect: 'Chọn ngẫu nhiên',
  randomCount: 'từ',
  selectAll: 'Chọn tất cả',
  clearAll: 'Xóa tất cả',
  preview: 'Xem trước',
  exportPdf: 'Tải PDF',
  settings: 'Cài đặt',
  wordsPerPage: 'Số từ mỗi trang',
  writingLines: 'Số dòng luyện viết',
  traceStyle: 'Kiểu chữ mờ',
  traceOpacity: 'Độ mờ của chữ',
  showJapanese: 'Hiển thị nghĩa tiếng Nhật',
  showVietnamese: 'Hiển thị nghĩa tiếng Việt',
  showPartOfSpeech: 'Hiển thị từ loại',
  showExample: 'Hiển thị câu ví dụ',
  showExampleJapanese: 'Hiển thị câu ví dụ tiếng Nhật',
  showExampleVietnamese: 'Hiển thị câu ví dụ tiếng Việt',
  showRecall: 'Hiển thị bài kiểm tra nhớ lại',
  paperSize: 'Khổ giấy',
  orientation: 'Chiều',
  portrait: 'Dọc',
  landscape: 'Ngang',
  auto: 'Tự động',
  solid: 'Liền',
  dotted: 'Chấm',
  dashed: 'Nét đứt',
  recallLabel: 'Nhìn nghĩa tiếng Nhật, viết tiếng Anh:',
  traceLine: 'Chữ mờ để tô',
  remove: 'Xóa',
  edit: 'Chỉnh sửa',
  save: 'Lưu',
  cancel: 'Hủy',
  word: 'Từ tiếng Anh',
  japanese: 'Tiếng Nhật',
  vietnamese: 'Tiếng Việt',
  example: 'Câu ví dụ',
  exampleJa: 'Câu ví dụ (Nhật)',
  exampleVi: 'Câu ví dụ (Việt)',
  partOfSpeech: 'Từ loại',
  level: 'Cấp độ',
  source: 'Nguồn',
  customSource: 'Thủ công',
  csvSource: 'CSV',
  builtinSource: 'Tích hợp sẵn',
  importSuccess: 'từ đã được nhập thành công',
  importErrors: 'lỗi',
  dropCsvHere: 'Kéo thả file CSV vào đây hoặc nhấp để chọn',
  csvFormatHint: 'Định dạng: word,japanese,vietnamese,level,pos,example,exampleJa,exampleVi',
  fontScale: 'Cỡ chữ',
  fontFamily: 'Phông chữ',
  showReading: 'Hiển thị phiên âm IPA',
  showMeaningEn: 'Hiển thị nghĩa tiếng Anh',
  noPreview: 'Vui lòng chọn từ để xem trước',
  loading: 'Đang tải...',
  writingLinesAutoHint: 'Tự động điều chỉnh theo số từ trên trang và cài đặt hiển thị',
}

const en: Dictionary = {
  appTitle: 'EIKEN Writing Workbook',
  appSubtitle: 'Generate printable English handwriting practice sheets',
  selectLanguage: 'Select language',
  selectLevel: 'Select EIKEN level',
  allLevels: 'All levels',
  vocabulary: 'Vocabulary list',
  searchPlaceholder: 'Search words...',
  selectedWords: 'Selected words',
  noWordsSelected: 'No words selected',
  addCustomWords: 'Add custom words',
  customWordsPlaceholder: 'Enter one word per line\n(e.g.) environment\nnecessary\nimprove',
  addWords: 'Add',
  importCsv: 'Import CSV',
  randomSelect: 'Random select',
  randomCount: 'words',
  selectAll: 'Select all',
  clearAll: 'Clear all',
  preview: 'Preview',
  exportPdf: 'Download PDF',
  settings: 'Settings',
  wordsPerPage: 'Words per page',
  writingLines: 'Writing lines',
  traceStyle: 'Trace style',
  traceOpacity: 'Trace opacity',
  showJapanese: 'Show Japanese',
  showVietnamese: 'Show Vietnamese',
  showPartOfSpeech: 'Show part of speech',
  showExample: 'Show example sentence',
  showExampleJapanese: 'Show Japanese example',
  showExampleVietnamese: 'Show Vietnamese example',
  showRecall: 'Show recall test',
  paperSize: 'Paper size',
  orientation: 'Orientation',
  portrait: 'Portrait',
  landscape: 'Landscape',
  auto: 'Auto',
  solid: 'Solid',
  dotted: 'Dotted',
  dashed: 'Dashed',
  recallLabel: 'Write the English word from the Japanese meaning:',
  traceLine: 'Trace',
  remove: 'Remove',
  edit: 'Edit',
  save: 'Save',
  cancel: 'Cancel',
  word: 'English word',
  japanese: 'Japanese',
  vietnamese: 'Vietnamese',
  example: 'Example sentence',
  exampleJa: 'Example (Japanese)',
  exampleVi: 'Example (Vietnamese)',
  partOfSpeech: 'Part of speech',
  level: 'Level',
  source: 'Source',
  customSource: 'Custom',
  csvSource: 'CSV',
  builtinSource: 'Built-in',
  importSuccess: 'words imported successfully',
  importErrors: 'errors',
  dropCsvHere: 'Drop CSV file here or click to select',
  csvFormatHint: 'Format: word,japanese,vietnamese,level,pos,example,exampleJa,exampleVi',
  fontScale: 'Font size',
  fontFamily: 'Font',
  showReading: 'Show IPA pronunciation',
  showMeaningEn: 'Show English meaning',
  noPreview: 'Please select words to preview',
  loading: 'Loading...',
  writingLinesAutoHint: 'Automatically adjusted based on words per page and display settings',
}

export const dictionaries: Record<Locale, Dictionary> = { ja, vi, en }

export function t(locale: Locale, key: keyof Dictionary): string {
  return dictionaries[locale][key]
}
