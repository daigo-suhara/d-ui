import * as React from "react";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  heading: string;
  links: FooterLink[];
}

interface SiteFooterProps {
  logo?: React.ReactNode;
  description?: string;
  sections?: FooterSection[];
  copyright?: string;
  bordered?: boolean;
  className?: string;
}

export function SiteFooter({
  logo,
  description,
  sections = [],
  copyright,
  bordered = true,
  className,
}: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "w-full bg-background/80",
        bordered && "border-t border-border/60",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        {/* Top section */}
        {(logo || description || sections.length > 0) && (
          <div
            className={cn(
              "grid gap-8",
              sections.length > 0
                ? "grid-cols-1 md:grid-cols-[1fr_repeat(var(--cols),auto)]"
                : "",
            )}
            style={
              { "--cols": sections.length } as React.CSSProperties
            }
          >
            {/* Brand */}
            {(logo || description) && (
              <div className="space-y-3 max-w-xs">
                {logo && (
                  <div className="font-semibold text-sm">{logo}</div>
                )}
                {description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            )}

            {/* Link columns */}
            {sections.map((section) => (
              <div key={section.heading} className="space-y-3">
                <p className="text-xs font-semibold text-foreground/80 uppercase tracking-wide">
                  {section.heading}
                </p>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Copyright */}
        {(logo || description || sections.length > 0) && (
          <div className="mt-8 border-t border-border/40 pt-6">
            <p className="text-[11px] text-muted-foreground/50">
              {copyright ?? `© ${year} All rights reserved.`}
            </p>
          </div>
        )}

        {/* Copyright only (no top content) */}
        {!logo && !description && sections.length === 0 && (
          <p className="text-[11px] text-muted-foreground/50">
            {copyright ?? `© ${year} All rights reserved.`}
          </p>
        )}
      </div>
    </footer>
  );
}
