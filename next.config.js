/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary", "graohql-request"],
  },
};

module.exports = nextConfig;
