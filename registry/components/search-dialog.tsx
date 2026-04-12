"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchItem {
  id: string;
  title: string;
  description?: string;
  group?: string;
  href?: string;
  onSelect?: () => void;
}

interface SearchDialogProps {
  items: SearchItem[];
  placeholder?: string;
  trigger?: React.ReactNode;
  /** ⌘/Ctrl と組み合わせるキー（例: "k", "/", "p"）。false で無効化。デフォルト: "k" */
  shortcut?: string | false;
  emptyMessage?: string;
  className?: string;
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

export function SearchDialog({
  items,
  placeholder = "検索…",
  trigger,
  shortcut = "k",
  emptyMessage = "見つかりません",
  className,
}: SearchDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mounted, setMounted] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const selectedRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => { setMounted(true); }, []);

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q) ||
        item.group?.toLowerCase().includes(q)
    );
  }, [items, query]);

  const grouped = React.useMemo(() => {
    return filtered.reduce<Record<string, SearchItem[]>>((acc, item) => {
      const key = item.group ?? "";
      acc[key] = [...(acc[key] ?? []), item];
      return acc;
    }, {});
  }, [filtered]);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  // ⌘+shortcut キー
  React.useEffect(() => {
    if (!shortcut) return;
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === shortcut) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [shortcut]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Reset selection when query changes
  React.useEffect(() => {
    setSelectedIndex(0);
    scrollRef.current?.scrollTo({ top: 0 });
  }, [query]);

  // Scroll selected item into view
  React.useEffect(() => {
    selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [selectedIndex]);

  // Keyboard navigation
  React.useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeDialog();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        const item = filtered[selectedIndex];
        if (!item) return;
        item.onSelect?.();
        if (item.href) window.location.href = item.href;
        closeDialog();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, filtered, selectedIndex, closeDialog]);

  // Lock body scroll when open on mobile
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const defaultTrigger = (
    <button
      onClick={() => setOpen(true)}
      className={cn(
        "flex items-center gap-2 rounded-md border bg-background px-3 py-2 text-sm",
        "text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0" />
      <span className="flex-1 text-left">{placeholder}</span>
      {shortcut && (
        <kbd className="hidden sm:inline-flex rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60">
          ⌘{shortcut.toUpperCase()}
        </kbd>
      )}
    </button>
  );

  let globalIndex = 0;

  return (
    <>
      <div onClick={() => setOpen(true)} className="contents">
        {trigger ?? defaultTrigger}
      </div>

      {mounted && open && createPortal(
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={closeDialog}
          />

          {/* Dialog — bottom sheet on mobile, centered modal on sm+ */}
          <div className={cn(
            "fixed z-50 w-full",
            // Mobile: bottom sheet
            "bottom-0 left-0 right-0",
            // Desktop: centered
            "sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:max-w-lg sm:-translate-x-1/2 sm:-translate-y-1/2 sm:px-4",
          )}>
            <div className={cn(
              "overflow-hidden border-border/60 bg-card shadow-2xl",
              // Mobile: rounded top corners only, no side padding
              "rounded-t-2xl border-t border-x",
              // Desktop: fully rounded
              "sm:rounded-xl sm:border",
            )}>
              {/* Drag handle (mobile only) */}
              <div className="flex justify-center pt-3 pb-1 sm:hidden">
                <div className="h-1 w-10 rounded-full bg-muted-foreground/20" />
              </div>

              {/* Search input */}
              <div className="flex items-center gap-2 border-b border-border/60 px-3 py-2.5">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                />
                <button
                  onClick={closeDialog}
                  className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Results */}
              <div ref={scrollRef} className="max-h-[50vh] sm:max-h-80 overflow-y-auto py-2">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center">
                    <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                    {query && (
                      <p className="mt-1 text-xs text-muted-foreground/50">
                        &ldquo;{query}&rdquo; に一致する項目がありません
                      </p>
                    )}
                  </div>
                ) : (
                  Object.entries(grouped).map(([group, groupItems]) => (
                    <div key={group} className="mb-1">
                      {group && (
                        <div className="px-3 py-1">
                          <span className="text-[10px] font-semibold tracking-wide text-muted-foreground/50 uppercase">
                            {group}
                          </span>
                        </div>
                      )}
                      <ul>
                        {groupItems.map((item) => {
                          const idx = globalIndex++;
                          const isSelected = idx === selectedIndex;
                          return (
                            <li key={item.id} ref={isSelected ? selectedRef : null}>
                              <button
                                className={cn(
                                  "w-full flex flex-col gap-0.5 px-3 py-2.5 sm:py-2 text-left transition-colors",
                                  isSelected
                                    ? "bg-primary/10 text-primary"
                                    : "text-foreground hover:bg-muted"
                                )}
                                onClick={() => {
                                  item.onSelect?.();
                                  if (item.href) window.location.href = item.href;
                                  closeDialog();
                                }}
                                onMouseEnter={() => setSelectedIndex(idx)}
                              >
                                <span className="text-sm font-medium leading-none">
                                  {highlight(item.title, query)}
                                </span>
                                {item.description && (
                                  <span className="text-xs text-muted-foreground line-clamp-1">
                                    {highlight(item.description, query)}
                                  </span>
                                )}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border/60 px-3 py-2 flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/50 tabular-nums">
                  {filtered.length} 件
                </span>
                <span className="ml-auto hidden sm:flex items-center gap-2 text-[10px] text-muted-foreground/40">
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
      )}
    </>
  );
}
