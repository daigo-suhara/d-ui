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
  sm: { wrap: "h-8 p-0.5 gap-0.5", item: "px-3 text-xs whitespace-nowrap" },
  md: { wrap: "h-10 p-0.5 gap-0.5", item: "px-4 text-sm whitespace-nowrap" },
  lg: { wrap: "h-12 p-1 gap-1", item: "px-5 text-sm whitespace-nowrap" },
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
  return (
    <div
      role="group"
      className={cn(
        "inline-flex items-center rounded-lg bg-muted flex-nowrap overflow-hidden",
        s.wrap,
        fullWidth && "w-full",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              "flex flex-1 items-center justify-center rounded-md font-medium transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              "disabled:pointer-events-none disabled:opacity-40",
              s.item,
              isActive
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
