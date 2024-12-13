import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: 'http://44.222.212.53:8000' 
  }
};

export default nextConfig;
