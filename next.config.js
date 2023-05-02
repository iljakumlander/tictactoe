/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

const nextConfig = {
    output: process.env.DEPLOY === 'TRUE' ? 'export' : 'standalone',
    basePath: process.env.DEPLOY === 'TRUE' ? process.env.NEXT_PUBLIC_INSTALL_PATH || '' : '',
    trailingSlash: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}
  
module.exports = nextConfig;
