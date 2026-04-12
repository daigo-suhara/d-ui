"use client";

import { ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { type ComponentCategory, components } from "@/lib/registry-data";
import { AnimatedCounter } from "@/registry/components/animated-counter";
import { AvatarGroup } from "@/registry/components/avatar-group";
import {
	GlowCard,
	GlowCardDescription,
	GlowCardTitle,
} from "@/registry/components/glow-card";
import { GradientButton } from "@/registry/components/gradient-button";
import { Kbd, Shortcut } from "@/registry/components/kbd";
import { MagneticButton } from "@/registry/components/magnetic-button";
import { Marquee, MarqueeItem } from "@/registry/components/marquee";
import { ProgressRing } from "@/registry/components/progress-ring";
import { Rating } from "@/registry/components/rating";
import { ShimmerText } from "@/registry/components/shimmer-text";
import { StatsCard } from "@/registry/components/stats-card";
import { StatusBadge } from "@/registry/components/status-badge";
import { StepIndicator } from "@/registry/components/step-indicator";

export function HomeClient() {
	const [rating, setRating] = React.useState(4);

	return (
		<div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-16 space-y-16">
			{/* Hero */}
			<section className="space-y-6">
				<div className="space-y-3">
					<ShimmerText
						as="h1"
						className="text-4xl font-bold tracking-tight md:text-5xl"
						colors="from-white via-white/60 to-white"
						speed="slow"
					>
						d-ui
					</ShimmerText>
					<p className="text-muted-foreground text-base leading-relaxed max-w-lg">
						shadcn registry をベースにした自分専用のコンポーネントライブラリ。
						<code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
							npx shadcn add
						</code>
						でそのままプロジェクトに導入できます。
					</p>
				</div>
				<div className="flex flex-wrap gap-3">
					<Link href={`/components/${components[0].name}`}>
						<GradientButton gradient="purple" size="md">
							コンポーネントを見る
							<ArrowRight className="ml-2 h-3.5 w-3.5" />
						</GradientButton>
					</Link>
					<MagneticButton strength={20}>ソースを見る</MagneticButton>
				</div>
			</section>

			{/* Stats */}
			<section className="grid grid-cols-3 gap-3">
				<div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
					<div className="text-2xl font-bold tabular-nums">
						<AnimatedCounter value={components.length} duration={1000} />
					</div>
					<p className="text-xs text-muted-foreground mt-1">コンポーネント</p>
				</div>
				<div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
					<div className="text-2xl font-bold tabular-nums">
						<AnimatedCounter value={5} duration={800} />
					</div>
					<p className="text-xs text-muted-foreground mt-1">カテゴリ</p>
				</div>
				<div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-center">
					<div className="text-2xl font-bold">MIT</div>
					<p className="text-xs text-muted-foreground mt-1">ライセンス</p>
				</div>
			</section>

			{/* Marquee */}
			<section className="overflow-hidden">
				<Marquee gap={12} speed="normal">
					{components.map((c) => (
						<MarqueeItem key={c.name}>
							<Link
								href={`/components/${c.name}`}
								className="rounded-full border border-border/60 bg-muted/30 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-border transition-colors whitespace-nowrap"
							>
								{c.title}
							</Link>
						</MarqueeItem>
					))}
				</Marquee>
			</section>

			{/* Showcase grid */}
			<section className="space-y-4">
				<h2 className="text-sm font-semibold text-muted-foreground/60 tracking-wide uppercase">
					コンポーネント例
				</h2>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{/* Stats demo */}
					<GlowCard glowColor="blue" className="p-0">
						<div className="p-1">
							<StatsCard
								title="月間ユーザー数"
								value="12,540"
								trend={8.2}
								trendLabel="先月比"
								className="border-none shadow-none bg-transparent"
							/>
						</div>
					</GlowCard>

					{/* Status + Rating demo */}
					<GlowCard glowColor="purple" className="p-5 space-y-4">
						<div className="space-y-2">
							<p className="text-xs text-muted-foreground font-medium">
								Status Badge
							</p>
							<div className="flex flex-wrap gap-2">
								<StatusBadge status="online" />
								<StatusBadge status="busy" />
								<StatusBadge status="away" />
							</div>
						</div>
						<div className="space-y-1.5">
							<p className="text-xs text-muted-foreground font-medium">
								Rating
							</p>
							<Rating value={rating} onChange={setRating} />
						</div>
					</GlowCard>

					{/* Progress + Avatar demo */}
					<GlowCard glowColor="green" className="p-5 space-y-4">
						<div className="space-y-2">
							<p className="text-xs text-muted-foreground font-medium">
								Progress Ring
							</p>
							<div className="flex gap-4">
								<ProgressRing
									value={80}
									color="success"
									size={56}
									strokeWidth={6}
								/>
								<ProgressRing
									value={45}
									color="warning"
									size={56}
									strokeWidth={6}
								/>
								<ProgressRing
									value={30}
									color="danger"
									size={56}
									strokeWidth={6}
								/>
							</div>
						</div>
						<div className="space-y-1.5">
							<p className="text-xs text-muted-foreground font-medium">
								Avatar Group
							</p>
							<AvatarGroup
								size="sm"
								avatars={[
									{ name: "田中 太郎" },
									{ name: "佐藤 花子" },
									{ name: "山田 次郎" },
									{ name: "鈴木 一郎" },
									{ name: "高橋 美咲" },
								]}
								max={4}
							/>
						</div>
					</GlowCard>

					{/* Kbd + Step demo */}
					<GlowCard glowColor="orange" className="p-5 space-y-4">
						<div className="space-y-2">
							<p className="text-xs text-muted-foreground font-medium">
								Keyboard Shortcuts
							</p>
							<div className="space-y-1.5">
								{[
									["検索", ["⌘", "K"]],
									["保存", ["⌘", "S"]],
									["元に戻す", ["⌘", "Z"]],
								].map(([label, keys]) => (
									<div
										key={String(label)}
										className="flex items-center gap-2 text-xs"
									>
										<span className="text-muted-foreground w-14">{label}</span>
										<Shortcut keys={keys as string[]} />
									</div>
								))}
							</div>
						</div>
						<div className="space-y-1.5">
							<p className="text-xs text-muted-foreground font-medium">
								Step Indicator
							</p>
							<StepIndicator
								currentStep={1}
								steps={[
									{ label: "入力" },
									{ label: "確認" },
									{ label: "完了" },
								]}
							/>
						</div>
					</GlowCard>
				</div>
			</section>

			{/* Install */}
			<section>
				<div className="rounded-xl border border-border/60 bg-muted/20 p-5 space-y-4">
					<div className="flex items-center gap-2 text-sm font-medium">
						<Terminal className="h-4 w-4 text-muted-foreground" />
						インストール方法
					</div>
					<div className="rounded-lg border bg-muted/50 px-3 py-2 font-mono text-xs text-foreground/80 break-all">
						npx shadcn add https://d-ui.daigo-suhara.com/registry/[name].json
					</div>
					<p className="text-xs text-muted-foreground leading-relaxed">
						各コンポーネントページのインストールコマンドをコピーして実行するだけで、プロジェクトに追加できます。
					</p>
				</div>
			</section>
		</div>
	);
}
