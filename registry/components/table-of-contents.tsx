"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  label: string;
  level?: 1 | 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
  title?: string;
  activeId?: string;
  className?: string;
}

export function TableOfContents({
  items,
  title = "目次",
  activeId: externalActiveId,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>(
    externalActiveId ?? items[0]?.id ?? ""
  );

  React.useEffect(() => {
    if (externalActiveId !== undefined) {
      setActiveId(externalActiveId);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "0px 0px -70% 0px", threshold: 0 }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, externalActiveId]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveId(id);
  };

  return (
    <nav className={cn("", className)}>
      {title && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      )}
      <div className="relative border-l border-border">
        {items.map((item) => {
          const level = item.level ?? 1;
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "group relative flex items-start gap-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-150",
                level === 2 && "pl-7",
                level === 3 && "pl-10 text-xs",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* left track indicator */}
              <span
                className={cn(
                  "absolute -left-px top-0 h-full w-0.5 rounded-full transition-colors duration-150",
                  isActive ? "bg-primary" : "bg-transparent group-hover:bg-border"
                )}
              />
              <span className={cn(isActive && "font-medium")}>{item.label}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
