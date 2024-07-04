/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "wealthexpo.la",
        // pathname: "/uploads/**",
      },
      {
        protocol: "http",
        port: "3000",
        hostname: "localhost",
      },
    ],
    // path: '/_next/image',
    loader: "default",
  },
};

module.exports = nextConfig;
