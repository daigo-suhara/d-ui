"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  radius?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 30,
  radius = 150,
  className,
  ...props
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < radius) {
      const factor = (1 - dist / radius) * strength;
      setOffset({ x: (dx / dist) * factor, y: (dy / dist) * factor });
    }
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <button
      ref={ref}
      className={cn(
        "relative inline-flex items-center justify-center rounded-lg border border-border",
        "bg-card px-6 py-2.5 text-sm font-medium text-card-foreground shadow-sm",
        "transition-shadow duration-200 hover:shadow-md focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: offset.x === 0 && offset.y === 0
          ? "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
          : "transform 0.1s linear",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </button>
  );
}
