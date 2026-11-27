import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static portfolio: no dynamic data, so Cache Components / partial prefetching are not needed.
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
