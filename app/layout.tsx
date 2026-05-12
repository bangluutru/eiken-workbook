import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '英検 ライティングワークブック | EIKEN Writing Workbook',
  description:
    'Generate printable English vocabulary handwriting worksheets for EIKEN levels 5級 to 1級.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-stone-50">{children}</body>
    </html>
  )
}
