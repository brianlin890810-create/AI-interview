import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 允許用區網 IP（例如手機）開啟開發伺服器
  allowedDevOrigins: ["192.168.0.10"],
  cacheComponents: true,
  partialPrefetching: true,
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
