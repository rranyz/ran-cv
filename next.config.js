/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: process.env.NODE_ENV === 'production' ? '/ran-cv' : '',
  output: 'export',
  distDir: 'dist'
}

module.exports = nextConfig
