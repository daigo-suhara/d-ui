// Server-only: re-exports data + adds fs-based utilities
export * from "./registry-data";

import { promises as fs } from "fs";
import path from "path";

export async function getComponentSource(filePath: string): Promise<string> {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    return await fs.readFile(fullPath, "utf-8");
  } catch {
    return "";
  }
}
