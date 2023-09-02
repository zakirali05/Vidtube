/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ["uploadthing.com", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
