import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
  },
  // Explicit root to avoid workspace detection issues (e.g. stray package-lock.json upstream)
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        source: "/certificacion",
        destination: "/invima",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
