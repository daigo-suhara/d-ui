import * as React from "react";
import { cn } from "@/lib/utils";

export interface TimelineItem {
  id?: string;
  title: string;
  description?: string;
  date?: string;
  icon?: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
}

interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

const variantDot: Record<string, string> = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
};

const variantRing: Record<string, string> = {
  default: "ring-primary/20",
  success: "ring-emerald-500/20",
  warning: "ring-amber-500/20",
  danger: "ring-red-500/20",
};

export function Timeline({ items, className }: TimelineProps) {
  return (
    <ol className={cn("relative space-y-0", className)}>
      {items.map((item, i) => {
        const variant = item.variant ?? "default";
        const isLast = i === items.length - 1;
        return (
          <li key={item.id ?? i} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Line */}
            {!isLast && (
              <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
            )}
            {/* Dot */}
            <div className="relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full ring-4",
                  variantRing[variant]
                )}
              >
                {item.icon ? (
                  <div className={cn("h-4 w-4", `text-${variantDot[variant].replace("bg-", "")}`)}>
                    {item.icon}
                  </div>
                ) : (
                  <div className={cn("h-2.5 w-2.5 rounded-full", variantDot[variant])} />
                )}
              </div>
            </div>
            {/* Content */}
            <div className="flex-1 min-w-0 pt-1">
              <div className="flex items-baseline justify-between gap-2 mb-0.5">
                <p className="text-sm font-medium leading-none">{item.title}</p>
                {item.date && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.date}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
