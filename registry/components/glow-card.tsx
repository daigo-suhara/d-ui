"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: "purple" | "blue" | "green" | "orange" | "pink" | "white";
  intensity?: "low" | "medium" | "high";
}

const glowColors = {
  purple: "hover:shadow-purple-500/30",
  blue: "hover:shadow-blue-500/30",
  green: "hover:shadow-emerald-500/30",
  orange: "hover:shadow-orange-500/30",
  pink: "hover:shadow-pink-500/30",
  white: "hover:shadow-white/20",
};

const intensities = {
  low: "hover:shadow-lg",
  medium: "hover:shadow-xl",
  high: "hover:shadow-2xl",
};

export function GlowCard({
  className,
  glowColor = "purple",
  intensity = "medium",
  children,
  ...props
}: GlowCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border border-border bg-card p-6",
        "transition-all duration-500 shadow-sm",
        glowColors[glowColor],
        intensities[intensity],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function GlowCardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-semibold text-lg leading-none tracking-tight mb-2", className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function GlowCardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
}
