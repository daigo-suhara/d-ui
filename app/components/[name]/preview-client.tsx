"use client";

import * as React from "react";
import { Eye, Code2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";
import { ComponentRenderer } from "./component-renderer";

interface Example {
  label: string;
  code: string;
  codeHtml: string;
}

interface ComponentPreviewClientProps {
  componentName: string;
  examples: Example[];
}

export function ComponentPreviewClient({
  componentName,
  examples,
}: ComponentPreviewClientProps) {
  const [activeExample, setActiveExample] = React.useState(0);

  return (
    <div className="space-y-3">
      {/* Example selector */}
      {examples.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-muted/40 p-1">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveExample(i)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                i === activeExample
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span
                className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-none transition-colors ${
                  i === activeExample
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground"
                }`}
              >
                {i + 1}
              </span>
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Preview / Code tabs */}
      <Tabs defaultValue="preview">
        <TabsList className="h-8">
          <TabsTrigger value="preview" className="text-xs h-7 gap-1.5">
            <Eye className="h-3.5 w-3.5" />プレビュー
          </TabsTrigger>
          <TabsTrigger value="code" className="text-xs h-7 gap-1.5">
            <Code2 className="h-3.5 w-3.5" />コード
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="mt-2">
          <div className="flex min-h-[140px] items-center justify-center rounded-lg border bg-background/50 p-6">
            <ComponentRenderer
              componentName={componentName}
              exampleIndex={activeExample}
            />
          </div>
        </TabsContent>

        <TabsContent value="code" className="mt-2">
          <div className="group relative overflow-hidden rounded-lg border border-border/50">
            <div className="absolute right-2 top-2 z-10 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
              <CopyButton value={examples[activeExample]?.code ?? ""} />
            </div>
            <div
              className="[&>pre]:overflow-auto [&>pre]:p-3 [&>pre]:text-xs [&>pre]:leading-relaxed [&>pre]:rounded-lg md:[&>pre]:p-4 md:[&>pre]:text-sm"
              dangerouslySetInnerHTML={{
                __html: examples[activeExample]?.codeHtml ?? "",
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
