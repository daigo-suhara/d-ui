import * as React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  color?: "primary" | "success" | "warning" | "danger" | string;
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: "stroke-primary",
  success: "stroke-emerald-500",
  warning: "stroke-amber-500",
  danger: "stroke-red-500",
};

export function ProgressRing({
  value,
  max = 100,
  size = 80,
  strokeWidth = 8,
  color = "primary",
  showLabel = true,
  label,
  className,
}: ProgressRingProps) {
  const pct = Math.min(Math.max(value / max, 0), 1);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - pct);
  const colorClass = colorMap[color] ?? "";
  const inlineColor = colorMap[color] ? undefined : color;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-muted"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className={cn("transition-all duration-700", colorClass)}
          style={inlineColor ? { stroke: inlineColor } : undefined}
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-semibold tabular-nums leading-none">
            {label ?? `${Math.round(pct * 100)}%`}
          </span>
        </div>
      )}
    </div>
  );
}
