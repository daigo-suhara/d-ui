#!/usr/bin/env node
/**
 * build-registry.ts
 *
 * Generates static JSON files in public/registry/<name>.json at build time.
 * Also generates lib/registry-content.json for runtime access without fs.
 */

import { promises as fs } from "fs";
import path from "path";

const root = process.cwd();
const outDir = path.join(root, "public", "registry");

interface RegistryFile {
  path: string;
  type: string;
  target?: string;
}

interface RegistryItem {
  name: string;
  type: string;
  title: string;
  description: string;
  files: RegistryFile[];
  [key: string]: unknown;
}

interface Registry {
  items: RegistryItem[];
}

async function main() {
  const registryPath = path.join(root, "registry.json");
  const raw = await fs.readFile(registryPath, "utf-8");
  const registry: Registry = JSON.parse(raw);

  await fs.mkdir(outDir, { recursive: true });

  for (const item of registry.items) {
    const filesWithContent = await Promise.all(
      item.files.map(async (file) => {
        const filePath = path.join(root, file.path);
        const content = await fs.readFile(filePath, "utf-8");
        return { ...file, content };
      })
    );

    const output = { ...item, files: filesWithContent };
    const outPath = path.join(outDir, `${item.name}.json`);
    await fs.writeFile(outPath, JSON.stringify(output, null, 2), "utf-8");
    console.log(`✓ public/registry/${item.name}.json`);
  }

  console.log(`\nGenerated ${registry.items.length} registry files.`);

  // Also generate a single JSON file with all content for runtime access
  const allContent: Record<string, string> = {};
  for (const item of registry.items) {
    for (const file of item.files) {
      const filePath = path.join(root, file.path);
      const content = await fs.readFile(filePath, "utf-8");
      allContent[file.path] = content;
    }
  }
  await fs.writeFile(
    path.join(root, "lib", "registry-content.json"),
    JSON.stringify(allContent, null, 2),
    "utf-8"
  );
  console.log(`✓ lib/registry-content.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
