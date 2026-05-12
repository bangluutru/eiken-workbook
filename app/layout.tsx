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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Serif:ital,wght@0,400;0,600;0,700;1,400&family=Public+Sans:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full">{children}</body>
    </html>
  )
}
