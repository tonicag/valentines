import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "*",
      },
      {
        hostname: "media0.giphy.com",
      },
    ],
  },
};

export default nextConfig;
