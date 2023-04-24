/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    output: process.env.DEPLOY === 'TRUE' ? 'export' : 'standalone',
    basePath: process.env.DEPLOY === 'TRUE' ? process.env.INSTALL_PATH || '' : '',
    trailingSlash: true,
}
  
module.exports = nextConfig;
