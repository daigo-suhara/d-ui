import * as React from "react";
import { cn } from "@/lib/utils";

interface ShimmerTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  speed?: "slow" | "normal" | "fast";
  colors?: string;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}

const speeds = {
  slow: "3s",
  normal: "2s",
  fast: "1s",
};

export function ShimmerText({
  className,
  speed = "normal",
  colors = "from-foreground via-foreground/40 to-foreground",
  as: Tag = "span",
  style,
  children,
  ...props
}: ShimmerTextProps) {
  return (
    <Tag
      className={cn(
        "inline-block bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto]",
        "animate-[shimmer_var(--shimmer-speed)_linear_infinite]",
        colors,
        className
      )}
      style={{
        "--shimmer-speed": speeds[speed],
        ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </Tag>
  );
}
