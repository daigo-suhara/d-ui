"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ReadingProgressProps {
  color?: "primary" | "blue" | "green" | "purple" | "orange" | "pink";
  height?: number;
  position?: "top" | "bottom";
  className?: string;
}

const colorMap: Record<string, string> = {
  primary: "bg-primary",
  blue: "bg-blue-500",
  green: "bg-emerald-500",
  purple: "bg-violet-500",
  orange: "bg-orange-500",
  pink: "bg-pink-500",
};

export function ReadingProgress({
  color = "primary",
  height = 3,
  position = "top",
  className,
}: ReadingProgressProps) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50",
        position === "top" ? "top-0" : "bottom-0",
        className
      )}
      style={{ height }}
    >
      <div
        className={cn("h-full transition-[width] duration-75", colorMap[color])}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
