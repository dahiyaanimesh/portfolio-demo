import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Optional: Change the base path if you want to host on a subdirectory
  // basePath: '/portfolio-demo',
  // assetPrefix: '/portfolio-demo/',
};

export default nextConfig; 