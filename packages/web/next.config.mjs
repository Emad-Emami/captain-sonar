import bundleAnalyzer from "@next/bundle-analyzer";
import dotenv from "dotenv";

const { parsed: env } = dotenv.config({ path: "../../.env" });

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

export default withBundleAnalyzer({
  env,
  reactStrictMode: false,
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"]
  },
  devIndicators: {
    buildActivityPosition: "bottom-right"
  }
});
