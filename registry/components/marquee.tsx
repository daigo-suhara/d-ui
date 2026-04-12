import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: number;
  className?: string;
}

const speeds = { slow: "40s", normal: "25s", fast: "12s" };

export function Marquee({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  gap = 16,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]", className)}
    >
      <div
        className={cn(
          "flex w-max",
          direction === "left"
            ? "animate-[marquee_var(--marquee-speed)_linear_infinite]"
            : "animate-[marquee-reverse_var(--marquee-speed)_linear_infinite]",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={
          {
            gap: `${gap}px`,
            "--marquee-speed": speeds[speed],
          } as React.CSSProperties
        }
      >
        {children}
        {children}
      </div>
    </div>
  );
}

export function MarqueeItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex shrink-0 items-center", className)}>{children}</div>
  );
}
