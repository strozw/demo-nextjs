import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/data-refetch",
        destination: "/context-demo",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
