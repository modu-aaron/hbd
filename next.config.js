/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    swcMinify: true,
    compiler: {
      removeConsole: true,
    },
  },
};

module.exports = nextConfig;
