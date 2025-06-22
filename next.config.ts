import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hajiriresource.blob.core.windows.net',

      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',

      },
    ],
  },
  /* config options here */
};

export default nextConfig;
