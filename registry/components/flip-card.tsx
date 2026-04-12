"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  trigger?: "hover" | "click";
  direction?: "horizontal" | "vertical";
  className?: string;
  height?: string;
}

export function FlipCard({
  front,
  back,
  trigger = "hover",
  direction = "horizontal",
  className,
  height = "200px",
}: FlipCardProps) {
  const [flipped, setFlipped] = React.useState(false);
  const isHover = trigger === "hover";
  const isVertical = direction === "vertical";

  return (
    <div
      className={cn("relative cursor-pointer", className)}
      style={{ height, perspective: "1000px" }}
      onClick={!isHover ? () => setFlipped((f) => !f) : undefined}
      onMouseEnter={isHover ? () => setFlipped(true) : undefined}
      onMouseLeave={isHover ? () => setFlipped(false) : undefined}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped
            ? isVertical
              ? "rotateX(180deg)"
              : "rotateY(180deg)"
            : "rotateX(0deg) rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {front}
        </div>
        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: isVertical ? "rotateX(180deg)" : "rotateY(180deg)",
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
