import * as React from "react";
import { cn } from "@/lib/utils";

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "h-5 min-w-5 px-1 text-[10px]",
  md: "h-6 min-w-6 px-1.5 text-xs",
  lg: "h-8 min-w-8 px-2 text-sm",
};

export function Kbd({ children, className, size = "md", ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center justify-center rounded border font-mono font-medium",
        "border-b-2 bg-muted text-muted-foreground shadow-sm",
        "select-none",
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

interface ShortcutProps {
  keys: string[];
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Shortcut({ keys, size = "md", className }: ShortcutProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          <Kbd size={size}>{key}</Kbd>
          {i < keys.length - 1 && (
            <span className="text-xs text-muted-foreground">+</span>
          )}
        </React.Fragment>
      ))}
    </span>
  );
}
