"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GradientButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  gradient?: "purple" | "blue" | "green" | "orange" | "pink";
  size?: "sm" | "md" | "lg";
}

const gradients: Record<string, { from: string; to: string }> = {
  purple: { from: "#8b5cf6", to: "#6366f1" },
  blue:   { from: "#06b6d4", to: "#6366f1" },
  green:  { from: "#10b981", to: "#06b6d4" },
  orange: { from: "#f97316", to: "#eab308" },
  pink:   { from: "#ec4899", to: "#ef4444" },
};

const sizes = {
  sm: "h-8 px-4 text-sm",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

export function GradientButton({
  className,
  gradient = "purple",
  size = "md",
  style,
  children,
  ...props
}: GradientButtonProps) {
  const g = gradients[gradient];

  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg font-medium text-white",
        "transition-all duration-300 hover:opacity-90 hover:shadow-lg active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        "shadow-md",
        sizes[size],
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
