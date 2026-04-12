"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  variant?: "icon" | "text";
}

export function CopyButton({ value, className, variant = "icon" }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (variant === "text") {
    return (
      <button
        onClick={copy}
        className={cn(
          "inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors",
          className
        )}
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-500" />
            コピー済み
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" />
            コピー
          </>
        )}
      </button>
    );
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className={cn("h-7 w-7", className)}
      onClick={copy}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </Button>
  );
}
