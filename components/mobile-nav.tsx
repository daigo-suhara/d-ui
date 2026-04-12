"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SiteNav } from "@/components/site-nav";
import { components, getComponentsByCategory } from "@/lib/registry-data";
import type { ComponentCategory, ComponentConfig } from "@/lib/registry-data";

interface MobileNavProps {
  grouped: Record<ComponentCategory, ComponentConfig[]>;
}

export function MobileNav({ grouped }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="flex h-13 items-center gap-3 border-b border-border/60 bg-card/30 backdrop-blur-sm px-4 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          aria-label="メニューを開く"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Menu className="h-4 w-4" />
        </SheetTrigger>
        <SheetContent side="left" showCloseButton={false} className="w-64 p-0 gap-0">
          {/* Logo */}
          <div className="flex h-13 items-center gap-2.5 border-b border-border/60 px-4">
            <Image src="/logo.png" alt="d-ui logo" width={24} height={24} className="rounded-md" />
            <Link
              href="/"
              className="font-semibold text-sm tracking-tight"
              onClick={() => setOpen(false)}
            >
              d<span className="text-primary">-ui</span>
            </Link>
          </div>

          {/* Nav */}
          <div
            className="flex-1 overflow-hidden flex flex-col pt-3 pb-2"
            onClick={() => setOpen(false)}
          >
            <SiteNav grouped={grouped} />
          </div>

          {/* Footer */}
          <div className="border-t border-border/60 px-4 py-2.5">
            <p className="text-[11px] text-muted-foreground/60 tabular-nums">
              {components.length} コンポーネント
            </p>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.png" alt="d-ui logo" width={24} height={24} className="rounded-md" />
        <span className="font-semibold text-sm tracking-tight">
          d<span className="text-primary">-ui</span>
        </span>
      </Link>
    </header>
  );
}
