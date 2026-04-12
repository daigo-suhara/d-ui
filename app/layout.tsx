import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ExternalLink, Package2 } from "lucide-react";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { TooltipProvider } from "@/components/ui/tooltip";
import { components, getComponentsByCategory } from "@/lib/registry-data";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	title: "dai/ui — コンポーネント集",
	description: "shadcn registry を使った自分専用コンポーネントライブラリ",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const grouped = getComponentsByCategory();

	return (
		<html lang="ja" className="dark">
			<body
				className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
			>
				<TooltipProvider>
					<div className="flex h-screen overflow-hidden">
						{/* Sidebar */}
						<aside className="flex w-56 shrink-0 flex-col border-r border-border/60 bg-card/30 backdrop-blur-sm">
							{/* Logo */}
							<div className="flex h-13 items-center gap-2.5 border-b border-border/60 px-4 py-3.5">
								<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary/90 shadow-sm">
									<Package2 className="h-3.5 w-3.5 text-primary-foreground" />
								</div>
								<Link href="/" className="font-semibold text-sm tracking-tight">
									dai<span className="text-primary">/ui</span>
								</Link>
							</div>

							{/* Search + Nav */}
							<div className="flex-1 overflow-hidden flex flex-col pt-3 pb-2">
								<SiteNav grouped={grouped} />
							</div>

							{/* Footer */}
							<div className="border-t border-border/60 px-4 py-2.5 flex items-center justify-between">
								<p className="text-[11px] text-muted-foreground/60 tabular-nums">
									{components.length} コンポーネント
								</p>
								<a
									href="https://ui.shadcn.com/docs/registry"
									target="_blank"
									rel="noopener noreferrer"
									className="text-[11px] text-muted-foreground/40 hover:text-muted-foreground flex items-center gap-1 transition-colors"
								>
									docs
									<ExternalLink className="h-2.5 w-2.5" />
								</a>
							</div>
						</aside>

						{/* Main content */}
						<main className="flex-1 overflow-y-auto">{children}</main>
					</div>
				</TooltipProvider>
			</body>
		</html>
	);
}
