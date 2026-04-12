"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ComponentCategory,
  categoryLabels,
  ComponentConfig,
  components as allComponents,
} from "@/lib/registry-data";
import { Search, X, MousePointerClick, LayoutGrid, BarChart3, Bell, Type } from "lucide-react";

interface SiteNavProps {
  grouped: Record<ComponentCategory, ComponentConfig[]>;
}

const categoryOrder: ComponentCategory[] = [
  "buttons",
  "cards",
  "data",
  "feedback",
  "typography",
];

const categoryIcons: Record<ComponentCategory, React.ReactNode> = {
  buttons: <MousePointerClick className="h-3.5 w-3.5" />,
  cards: <LayoutGrid className="h-3.5 w-3.5" />,
  data: <BarChart3 className="h-3.5 w-3.5" />,
  feedback: <Bell className="h-3.5 w-3.5" />,
  typography: <Type className="h-3.5 w-3.5" />,
};

export function SiteNav({ grouped }: SiteNavProps) {
  const pathname = usePathname();
  const [query, setQuery] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  // ⌘K でフォーカス
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const filtered = query.trim()
    ? allComponents.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : null; // null = show all grouped

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      <div className="px-3 pb-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="検索… ⌘K"
            className={cn(
              "w-full rounded-md border bg-background/60 py-1.5 pl-8 pr-7 text-xs",
              "placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-ring",
              "transition-colors"
            )}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-5">
        {filtered ? (
          // 検索結果
          filtered.length === 0 ? (
            <div className="px-2 py-6 text-center">
              <p className="text-xs text-muted-foreground">見つかりません</p>
            </div>
          ) : (
            <div className="space-y-0.5">
              <p className="mb-2 px-2 text-[10px] font-semibold tracking-wide text-muted-foreground/50">
                {filtered.length} 件の結果
              </p>
              {filtered.map((comp) => (
                <NavItem key={comp.name} comp={comp} pathname={pathname} query={query} />
              ))}
            </div>
          )
        ) : (
          // カテゴリ別
          categoryOrder.map((category) => {
            const items = grouped[category];
            if (!items?.length) return null;
            return (
              <div key={category}>
                <div className="mb-1.5 flex items-center gap-1.5 px-2">
                  <span className="text-muted-foreground/50">
                    {categoryIcons[category]}
                  </span>
                  <span className="text-[10px] font-semibold tracking-wide text-muted-foreground/60 uppercase">
                    {categoryLabels[category]}
                  </span>
                  <span className="ml-auto text-[9px] text-muted-foreground/40 tabular-nums">
                    {items.length}
                  </span>
                </div>
                <ul className="space-y-0.5">
                  {items.map((comp) => (
                    <li key={comp.name}>
                      <NavItem comp={comp} pathname={pathname} query="" />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </nav>
    </div>
  );
}

function highlight(text: string, query: string) {
  if (!query) return text;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-primary/20 text-primary rounded-sm px-0.5 not-italic">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

function NavItem({
  comp,
  pathname,
  query,
}: {
  comp: ComponentConfig;
  pathname: string;
  query: string;
}) {
  const href = `/components/${comp.name}`;
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-all",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 shrink-0 rounded-full transition-colors",
          isActive ? "bg-primary" : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
        )}
      />
      <span className={cn("text-sm", isActive && "font-medium")}>
        {highlight(comp.title, query)}
      </span>
    </Link>
  );
}
