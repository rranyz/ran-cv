/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/ran-cv' : '',
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true
  },
  env: {
    PUBLIC_URL: '/ran-cv'
  }
}

module.exports = nextConfig
