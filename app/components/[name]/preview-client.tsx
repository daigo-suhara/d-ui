"use client";

import * as React from "react";
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
        <div className="flex flex-wrap gap-1.5">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => setActiveExample(i)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                i === activeExample
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {ex.label}
            </button>
          ))}
        </div>
      )}

      {/* Preview / Code tabs */}
      <Tabs defaultValue="preview">
        <TabsList className="h-8">
          <TabsTrigger value="preview" className="text-xs h-7">プレビュー</TabsTrigger>
          <TabsTrigger value="code" className="text-xs h-7">コード</TabsTrigger>
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
            <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
              <CopyButton value={examples[activeExample]?.code ?? ""} />
            </div>
            <div
              className="overflow-auto text-sm [&>pre]:overflow-auto [&>pre]:p-4 [&>pre]:leading-relaxed [&>pre]:rounded-lg"
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
