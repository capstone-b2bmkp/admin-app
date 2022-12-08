/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    domains: ['cdn.shopify.com',
              'media.istockphoto.com',
              'images.pexels.com',
              'cdn.pixabay.com'],
  },
}
