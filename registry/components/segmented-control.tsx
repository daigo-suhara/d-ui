"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SegmentedControlOption<T extends string> {
  value: T;
  label: React.ReactNode;
  disabled?: boolean;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedControlOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  className?: string;
}

const sizes = {
  sm: { wrap: "h-8 p-0.5", item: "px-3 text-xs" },
  md: { wrap: "h-10 p-1",   item: "px-4 text-sm" },
  lg: { wrap: "h-12 p-1",   item: "px-5 text-sm" },
};

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  fullWidth = false,
  className,
}: SegmentedControlProps<T>) {
  const s = sizes[size];
  const activeIndex = options.findIndex((o) => o.value === value);

  return (
    <div
      role="group"
      className={cn(
        "relative inline-flex items-center rounded-xl bg-muted/70 backdrop-blur-sm border border-border/40",
        s.wrap,
        fullWidth && "w-full",
        className
      )}
    >
      {/* sliding indicator */}
      {activeIndex !== -1 && (
        <span
          aria-hidden
          className="absolute top-1 bottom-1 rounded-lg bg-background shadow-sm border border-border/60 transition-all duration-200 ease-out"
          style={{
            width: `calc(${100 / options.length}% - 2px)`,
            left: `calc(${(activeIndex / options.length) * 100}% + 1px)`,
          }}
        />
      )}

      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              "relative z-10 flex flex-1 items-center justify-center gap-1.5 rounded-lg font-medium whitespace-nowrap",
              "transition-colors duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
              "disabled:pointer-events-none disabled:opacity-40",
              s.item,
              isActive
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/80"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
