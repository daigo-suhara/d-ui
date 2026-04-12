"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyButton } from "@/components/copy-button";

interface ComponentPreviewProps {
  preview: React.ReactNode;
  code: string;
  codeHtml: string;
}

export function ComponentPreview({ preview, code, codeHtml }: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview">
      <TabsList className="h-9">
        <TabsTrigger value="preview" className="text-xs">Preview</TabsTrigger>
        <TabsTrigger value="code" className="text-xs">Code</TabsTrigger>
      </TabsList>

      <TabsContent value="preview" className="mt-3">
        <div className="flex min-h-[160px] items-center justify-center rounded-lg border bg-background p-6">
          {preview}
        </div>
      </TabsContent>

      <TabsContent value="code" className="mt-3">
        <div className="group relative overflow-hidden rounded-lg border bg-[var(--shiki-dark-bg,#1e1e2e)] dark:bg-[var(--shiki-dark-bg,#1e1e2e)]">
          <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <CopyButton value={code} className="bg-background/20 backdrop-blur-sm hover:bg-background/40" />
          </div>
          <div
            className="overflow-auto text-sm [&>pre]:overflow-auto [&>pre]:p-4 [&>pre]:leading-relaxed"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}
