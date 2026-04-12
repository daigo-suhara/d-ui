"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, MousePointerClick, LayoutGrid, BarChart3, Bell, Type, PanelTop } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ComponentConfig,
  ComponentCategory,
  categoryLabels,
  components as allComponents,
} from "@/lib/registry-data";

const categoryIcons: Record<ComponentCategory, React.ReactNode> = {
  buttons: <MousePointerClick className="h-3.5 w-3.5" />,
  cards: <LayoutGrid className="h-3.5 w-3.5" />,
  data: <BarChart3 className="h-3.5 w-3.5" />,
  feedback: <Bell className="h-3.5 w-3.5" />,
  typography: <Type className="h-3.5 w-3.5" />,
  navigation: <PanelTop className="h-3.5 w-3.5" />,
};

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

interface SearchDialogProps {
  open: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  onClose: () => void;
}

export function SearchDialog({ open, query, onQueryChange, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => { setMounted(true); }, []);

  const filtered = query.trim()
    ? allComponents.filter(
        (c) =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : allComponents;

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [query]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  // Scroll selected item into view
  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        router.push(`/components/${filtered[selectedIndex].name}`);
        onClose();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, onClose, router]);

  if (!open || !mounted) return null;

  // Group results by category for display
  const grouped = filtered.reduce<Record<string, ComponentConfig[]>>((acc, c) => {
    acc[c.category] = [...(acc[c.category] ?? []), c];
    return acc;
  }, {});

  let globalIndex = 0;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 px-4">
        <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl">
          {/* Search input */}
          <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="コンポーネントを検索…"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <button
              onClick={onClose}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Results */}
          <div ref={scrollRef} className="max-h-80 overflow-y-auto py-2">
            {filtered.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">見つかりません</p>
                <p className="mt-1 text-xs text-muted-foreground/50">&ldquo;{query}&rdquo; に一致するコンポーネントがありません</p>
              </div>
            ) : (
              Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-1">
                  <div className="flex items-center gap-1.5 px-3 py-1">
                    <span className="text-muted-foreground/50">
                      {categoryIcons[category as ComponentCategory]}
                    </span>
                    <span className="text-[10px] font-semibold tracking-wide text-muted-foreground/50 uppercase">
                      {categoryLabels[category as ComponentCategory]}
                    </span>
                  </div>
                  {items.map((comp) => {
                    const idx = globalIndex++;
                    const isSelected = idx === selectedIndex;
                    return (
                      <Link
                        key={comp.name}
                        ref={isSelected ? selectedRef : null}
                        href={`/components/${comp.name}`}
                        onClick={onClose}
                        className={cn(
                          "flex flex-col gap-0.5 px-3 py-2 transition-colors",
                          isSelected
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        <span className="text-sm font-medium leading-none">
                          {highlight(comp.title, query)}
                        </span>
                        <span className="text-xs text-muted-foreground line-clamp-1">
                          {highlight(comp.description, query)}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-border/60 px-3 py-2 flex items-center gap-3">
            <span className="text-[10px] text-muted-foreground/50 tabular-nums">
              {filtered.length} 件
            </span>
            <span className="ml-auto flex items-center gap-2 text-[10px] text-muted-foreground/40">
              <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">↑↓</kbd>
              選択
              <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">↵</kbd>
              移動
              <kbd className="rounded border border-border px-1 py-0.5 font-mono text-[9px]">Esc</kbd>
              閉じる
            </span>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
