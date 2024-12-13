import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://127.0.0.1:8000' 
  }
};

export default nextConfig;
