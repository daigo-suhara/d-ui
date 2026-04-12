import * as React from "react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  logo?: React.ReactNode;
  title?: string;
  nav?: NavItem[];
  actions?: React.ReactNode;
  sticky?: boolean;
  bordered?: boolean;
  blurred?: boolean;
  className?: string;
}

export function SiteHeader({
  logo,
  title = "My App",
  nav = [],
  actions,
  sticky = false,
  bordered = true,
  blurred = true,
  className,
}: SiteHeaderProps) {
  return (
    <header
      className={cn(
        "w-full z-40 bg-background/80",
        sticky && "sticky top-0",
        blurred && "backdrop-blur-md",
        bordered && "border-b border-border/60",
        className,
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 md:px-6">
        {/* Logo / Title */}
        <div className="flex items-center gap-2 font-semibold text-sm shrink-0">
          {logo}
          {title}
        </div>

        {/* Nav links */}
        {nav.length > 0 && (
          <nav className="hidden md:flex items-center gap-1 flex-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
