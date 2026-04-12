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
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-3 sm:p-4">
          <div className="space-y-1.5">
            {tag && (
              <span className="text-xs font-semibold uppercase tracking-widest text-primary/70">
                {tag}
              </span>
            )}
            <h3 className="line-clamp-2 text-sm font-bold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-base">
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
          <div className="hidden w-20 shrink-0 overflow-hidden sm:block sm:w-28 md:w-32">
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
          "group grid grid-cols-[1fr_auto] items-center gap-3 border-b border-border/40 py-4 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:gap-4 sm:py-5",
          href && "cursor-pointer",
          className
        )}
      >
        {/* date column — hidden on mobile */}
        <div className="hidden w-14 shrink-0 text-right sm:block">
          {date ? (
            <span className="font-mono text-xs tabular-nums text-muted-foreground/60">
              {date}
            </span>
          ) : (
            <div className="h-3 w-14 rounded bg-muted" />
          )}
        </div>

        {/* title + tag + date on mobile */}
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2">
            {tag && (
              <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/60">
                {tag}
              </span>
            )}
            {date && (
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground/50 sm:hidden">
                {date}
              </span>
            )}
          </div>
          <h3 className="truncate text-sm font-semibold leading-snug transition-colors group-hover:text-primary sm:text-base">
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
      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        {tag && (
          <span className="text-[11px] font-semibold uppercase tracking-widest text-primary/70">
            {tag}
          </span>
        )}
        <h3 className="line-clamp-2 text-lg font-bold leading-snug tracking-tight transition-colors group-hover:text-primary sm:text-xl">
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
