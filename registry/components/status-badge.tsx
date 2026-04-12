import * as React from "react";
import { cn } from "@/lib/utils";

type Status = "online" | "offline" | "away" | "busy" | "error" | "warning";

interface StatusBadgeProps {
  status: Status;
  label?: string;
  pulse?: boolean;
  className?: string;
}

const statusConfig: Record<
  Status,
  { dot: string; bg: string; text: string; label: string }
> = {
  online: {
    dot: "bg-emerald-500",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    text: "text-emerald-600 dark:text-emerald-400",
    label: "Online",
  },
  offline: {
    dot: "bg-slate-400",
    bg: "bg-slate-400/10 border-slate-400/30",
    text: "text-slate-500 dark:text-slate-400",
    label: "Offline",
  },
  away: {
    dot: "bg-amber-500",
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-600 dark:text-amber-400",
    label: "Away",
  },
  busy: {
    dot: "bg-orange-500",
    bg: "bg-orange-500/10 border-orange-500/30",
    text: "text-orange-600 dark:text-orange-400",
    label: "Busy",
  },
  error: {
    dot: "bg-red-500",
    bg: "bg-red-500/10 border-red-500/30",
    text: "text-red-600 dark:text-red-400",
    label: "Error",
  },
  warning: {
    dot: "bg-yellow-500",
    bg: "bg-yellow-500/10 border-yellow-500/30",
    text: "text-yellow-600 dark:text-yellow-400",
    label: "Warning",
  },
};

export function StatusBadge({
  status,
  label,
  pulse = true,
  className,
}: StatusBadgeProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        config.bg,
        config.text,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {pulse && status !== "offline" && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              config.dot
            )}
          />
        )}
        <span
          className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", config.dot)}
        />
      </span>
      {displayLabel}
    </span>
  );
}
