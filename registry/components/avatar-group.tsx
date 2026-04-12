import * as React from "react";
import { cn } from "@/lib/utils";

interface Avatar {
  src?: string;
  name: string;
  color?: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: { ring: "h-7 w-7 text-xs ring-2", offset: "-ml-2", extra: "h-7 w-7 text-xs" },
  md: { ring: "h-9 w-9 text-sm ring-2", offset: "-ml-2.5", extra: "h-9 w-9 text-sm" },
  lg: { ring: "h-11 w-11 text-base ring-[3px]", offset: "-ml-3", extra: "h-11 w-11 text-base" },
};

const defaultColors = [
  "bg-violet-500",
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
  "bg-cyan-500",
];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = "md",
  className,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const remaining = avatars.length - max;
  const s = sizes[size];

  return (
    <div className={cn("flex items-center", className)}>
      {visible.map((avatar, i) => (
        <div
          key={i}
          title={avatar.name}
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-full ring-background font-semibold text-white",
            s.ring,
            i > 0 && s.offset,
            avatar.color ?? defaultColors[i % defaultColors.length]
          )}
        >
          {avatar.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatar.src}
              alt={avatar.name}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            getInitials(avatar.name)
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            "relative inline-flex shrink-0 items-center justify-center rounded-full",
            "ring-background bg-muted text-muted-foreground font-semibold ring-2",
            s.extra,
            s.offset
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
}
