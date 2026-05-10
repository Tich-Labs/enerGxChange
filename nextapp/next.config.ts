import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages - disabled during development
  // output: 'export',
  
  // Comment out for local dev (root at localhost:3000/)
  // Uncomment for production build (GitHub Pages at /enerGXchange/)
  // basePath: '/enerGXchange',
  // assetPrefix: '/enerGXchange/',
  
  // Disable image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
