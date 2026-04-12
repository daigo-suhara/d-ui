import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ArticleCardProps {
  title: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  coverImage?: string;
  href?: string;
  variant?: "default" | "horizontal" | "minimal";
  className?: string;
}

export function ArticleCard({
  title,
  excerpt,
  date,
  tags,
  coverImage,
  href,
  variant = "default",
  className,
}: ArticleCardProps) {
  const Wrapper = href ? "a" : ("div" as React.ElementType);
  const wrapperProps = href ? { href } : {};
  const tag = tags?.[0];

  /* ── Horizontal ──────────────────────────────────────────── */
  if (variant === "horizontal") {
    return (
      <Wrapper
        {...wrapperProps}
        className={cn(
          "group flex items-stretch gap-0 overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:border-border hover:shadow-lg hover:shadow-black/5",
          href && "cursor-pointer",
          className
        )}
      >
        {/* accent strip */}
        <div className="w-1 shrink-0 bg-gradient-to-b from-primary/60 to-primary/20 transition-all duration-300 group-hover:from-primary group-hover:to-primary/40" />

        {/* content */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4">
          <div className="space-y-1.5">
            {tag && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                {tag}
              </span>
            )}
            <h3 className="line-clamp-2 font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
              {title}
            </h3>
          </div>
          <div className="flex items-center justify-between">
            {date && <span className="text-xs text-muted-foreground">{date}</span>}
            <ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
        </div>

        {/* image */}
        {coverImage && (
          <div className="w-24 shrink-0 overflow-hidden sm:w-32">
            <img
              src={coverImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
      </Wrapper>
    );
  }

  /* ── Minimal ─────────────────────────────────────────────── */
  if (variant === "minimal") {
    return (
      <Wrapper
        {...wrapperProps}
        className={cn(
          "group grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-border/40 py-5 last:border-b-0",
          href && "cursor-pointer",
          className
        )}
      >
        {/* date column */}
        <div className="w-14 shrink-0 text-right">
          {date ? (
            <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
              {date}
            </span>
          ) : (
            <div className="h-3 w-14 rounded bg-muted" />
          )}
        </div>

        {/* title + tag */}
        <div className="min-w-0 space-y-0.5">
          {tag && (
            <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/60">
              {tag}
            </span>
          )}
          <h3 className="truncate font-semibold leading-snug transition-colors group-hover:text-primary">
            {title}
          </h3>
        </div>

        {/* arrow */}
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/20 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </Wrapper>
    );
  }

  /* ── Default ─────────────────────────────────────────────── */
  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-border/40 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-border/70 hover:shadow-xl hover:shadow-black/10",
        href && "cursor-pointer",
        className
      )}
    >
      {/* image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-primary/20 via-muted to-muted/80">
        {coverImage && (
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
      </div>

      {/* body */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        {tag && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
            {tag}
          </span>
        )}
        <h3 className="line-clamp-2 text-xl font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {title}
        </h3>
        {excerpt && (
          <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          {date && (
            <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
              {date}
            </span>
          )}
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground/30 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
      </div>
    </Wrapper>
  );
}
