// Server-only: re-exports data + adds fs-based utilities
export * from "./registry-data";

import registryContent from "./registry-content.json";

export async function getComponentSource(filePath: string): Promise<string> {
  // Use pre-bundled content if available (for Edge/Cloudflare/Vercel)
  const content = (registryContent as Record<string, string>)[filePath];
  if (content) return content;

  // Fallback to fs only if not in bundle (e.g. local dev if script not run)
  try {
    const { promises: fs } = await import("fs");
    const path = await import("path");
    const fullPath = path.join(process.cwd(), filePath);
    return await fs.readFile(fullPath, "utf-8");
  } catch {
    return "";
  }
}
