import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface RegistryJson {
  items: Array<{ name: string; [key: string]: unknown }>;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name: rawName } = await params;
  const name = rawName.replace(/\.json$/, "");

  const registryPath = path.join(process.cwd(), "registry.json");
  const raw = await fs.readFile(registryPath, "utf-8");
  const registry: RegistryJson = JSON.parse(raw);

  const item = registry.items.find((i) => i.name === name);
  if (!item) {
    return NextResponse.json({ error: "Component not found" }, { status: 404 });
  }

  // Read source files and embed them
  const files = item.files as Array<{ path: string; type: string; target?: string }>;
  const filesWithContent = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(process.cwd(), file.path);
      const content = await fs.readFile(filePath, "utf-8");
      return { ...file, content };
    })
  );

  return NextResponse.json({ ...item, files: filesWithContent });
}
