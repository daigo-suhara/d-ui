#!/usr/bin/env node
/**
 * add-component.ts
 *
 * Usage: npx tsx scripts/add-component.ts <name> <title> <category> <description>
 *
 * Categories: buttons | cards | data | feedback | typography
 *
 * Example:
 *   npx tsx scripts/add-component.ts my-button "My Button" buttons "A custom button component."
 *
 * This script:
 *   1. Creates a stub component file at registry/components/<name>.tsx
 *   2. Adds the component to registry.json
 *   3. Prints a reminder to add it to lib/registry-data.ts and the renderer
 */

import { promises as fs } from "fs";
import path from "path";

const [, , name, title, category, description] = process.argv;

if (!name || !title || !category || !description) {
  console.error(
    "Usage: npx tsx scripts/add-component.ts <name> <title> <category> <description>"
  );
  process.exit(1);
}

const validCategories = ["buttons", "cards", "data", "feedback", "typography"];
if (!validCategories.includes(category)) {
  console.error(`Category must be one of: ${validCategories.join(", ")}`);
  process.exit(1);
}

const root = path.join(process.cwd());

async function main() {
  // 1. Create component stub
  const componentPath = path.join(root, "registry", "components", `${name}.tsx`);
  const componentExists = await fs.access(componentPath).then(() => true).catch(() => false);

  if (!componentExists) {
    const stub = `import * as React from "react";
import { cn } from "@/lib/utils";

interface ${toPascalCase(name)}Props extends React.HTMLAttributes<HTMLDivElement> {
  // Add your props here
}

export function ${toPascalCase(name)}({ className, children, ...props }: ${toPascalCase(name)}Props) {
  return (
    <div className={cn("", className)} {...props}>
      {children}
    </div>
  );
}
`;
    await fs.writeFile(componentPath, stub, "utf-8");
    console.log(`✓ Created registry/components/${name}.tsx`);
  } else {
    console.log(`  Skipped registry/components/${name}.tsx (already exists)`);
  }

  // 2. Update registry.json
  const registryPath = path.join(root, "registry.json");
  const raw = await fs.readFile(registryPath, "utf-8");
  const registry = JSON.parse(raw);

  const alreadyInRegistry = registry.items.some((i: { name: string }) => i.name === name);
  if (!alreadyInRegistry) {
    registry.items.push({
      name,
      type: "registry:component",
      title,
      description,
      dependencies: [],
      files: [
        {
          path: `registry/components/${name}.tsx`,
          type: "registry:component",
          target: `components/ui/${name}.tsx`,
        },
      ],
    });
    await fs.writeFile(registryPath, JSON.stringify(registry, null, 2) + "\n", "utf-8");
    console.log(`✓ Added "${name}" to registry.json`);
  } else {
    console.log(`  Skipped registry.json (already contains "${name}")`);
  }

  // 3. Reminder
  console.log(`
Next steps:
  1. Edit registry/components/${name}.tsx — implement your component
  2. Add an entry to lib/registry-data.ts components array with:
       name, title, description, category, filePath, props, usage, examples
  3. Add a preview entry in app/components/[name]/component-renderer.tsx
       under the previews object
  4. Restart the dev server
`);
}

function toPascalCase(str: string): string {
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
}

main().catch(console.error);
