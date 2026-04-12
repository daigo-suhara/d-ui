"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ComponentCategory,
  categoryLabels,
  ComponentConfig,
} from "@/lib/registry-data";
import { Search, MousePointerClick, LayoutGrid, BarChart3, Bell, Type, Home, PanelTop } from "lucide-react";
import { SearchDialog } from "@/components/search-dialog";

interface SiteNavProps {
  grouped: Record<ComponentCategory, ComponentConfig[]>;
}

const categoryOrder: ComponentCategory[] = [
  "buttons",
  "cards",
  "data",
  "feedback",
  "typography",
  "navigation",
];

const categoryIcons: Record<ComponentCategory, React.ReactNode> = {
  buttons: <MousePointerClick className="h-3.5 w-3.5" />,
  cards: <LayoutGrid className="h-3.5 w-3.5" />,
  data: <BarChart3 className="h-3.5 w-3.5" />,
  feedback: <Bell className="h-3.5 w-3.5" />,
  typography: <Type className="h-3.5 w-3.5" />,
  navigation: <PanelTop className="h-3.5 w-3.5" />,
};

export function SiteNav({ grouped }: SiteNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  // ⌘K でダイアログを開く
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setQuery("");
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Search bar — クリックでダイアログを開く */}
      <div className="px-3 pb-3">
        <button
          onClick={() => setOpen(true)}
          className={cn(
            "w-full flex items-center gap-2 rounded-md border bg-background/60 py-1.5 pl-2.5 pr-3 text-xs",
            "text-muted-foreground/50 hover:text-muted-foreground hover:bg-background/80 transition-colors text-left"
          )}
        >
          <Search className="h-3.5 w-3.5 shrink-0" />
          <span className="flex-1">検索…</span>
          <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px] text-muted-foreground/40">⌘K</kbd>
        </button>
      </div>

      {/* Search dialog */}
      <SearchDialog
        open={open}
        query={query}
        onQueryChange={setQuery}
        onClose={closeDialog}
      />

      {/* Home link */}
      <div className="px-2 mb-3">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-all",
            pathname === "/"
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )}
        >
          <Home className={cn("h-3.5 w-3.5", pathname === "/" ? "text-primary" : "text-muted-foreground/50")} />
          <span className={cn("text-sm", pathname === "/" && "font-medium")}>ホーム</span>
        </Link>
      </div>

      {/* Nav — カテゴリ別 */}
      <nav className="flex-1 overflow-y-auto px-2 space-y-5">
        {categoryOrder.map((category) => {
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
        })}
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
