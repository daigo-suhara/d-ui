import * as React from "react";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function StatsCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  prefix,
  suffix,
  className,
}: StatsCardProps) {
  const trendDirection =
    trend == null ? null : trend > 0 ? "up" : trend < 0 ? "down" : "flat";

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-5 shadow-sm",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        {icon && (
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>

      <p className="text-3xl font-bold tracking-tight tabular-nums">
        {prefix}
        {value}
        {suffix}
      </p>

      {trend != null && (
        <div className="mt-2 flex items-center gap-1">
          {trendDirection === "up" && (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          )}
          {trendDirection === "down" && (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          {trendDirection === "flat" && (
            <Minus className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span
            className={cn(
              "text-xs font-medium",
              trendDirection === "up" && "text-emerald-500",
              trendDirection === "down" && "text-red-500",
              trendDirection === "flat" && "text-muted-foreground"
            )}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
          {trendLabel && (
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
