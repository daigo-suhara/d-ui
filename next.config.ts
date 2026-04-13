import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

if (process.env.NODE_ENV === "development" && process.env.NEXT_RUNTIME !== "edge") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
