import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  serverExternalPackages: ['@react-pdf/renderer'],
}

export default nextConfig
