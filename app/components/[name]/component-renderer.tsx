"use client";

import * as React from "react";
import { GradientButton } from "@/registry/components/gradient-button";
import { GlowCard, GlowCardTitle, GlowCardDescription } from "@/registry/components/glow-card";
import { AnimatedCounter } from "@/registry/components/animated-counter";
import { StatusBadge } from "@/registry/components/status-badge";
import { ShimmerText } from "@/registry/components/shimmer-text";
import { SegmentedControl } from "@/registry/components/segmented-control";
import { StatsCard } from "@/registry/components/stats-card";
import { ProgressRing } from "@/registry/components/progress-ring";
import { Timeline } from "@/registry/components/timeline";
import { Rating } from "@/registry/components/rating";
import { Marquee, MarqueeItem } from "@/registry/components/marquee";
import { Kbd, Shortcut } from "@/registry/components/kbd";
import { AvatarGroup } from "@/registry/components/avatar-group";
import { Typewriter } from "@/registry/components/typewriter";
import { FlipCard } from "@/registry/components/flip-card";
import { MagneticButton } from "@/registry/components/magnetic-button";
import { StepIndicator } from "@/registry/components/step-indicator";
import { SearchDialog } from "@/registry/components/search-dialog";
import { SiteHeader } from "@/registry/components/site-header";
import { SiteFooter } from "@/registry/components/site-footer";
import { ArticleCard } from "@/registry/components/article-card";
import { ReadingProgress } from "@/registry/components/reading-progress";
import { TableOfContents } from "@/registry/components/table-of-contents";
import { Users, TrendingUp, ShoppingCart, Activity } from "lucide-react";

type ComponentName =
  | "gradient-button"
  | "glow-card"
  | "animated-counter"
  | "status-badge"
  | "shimmer-text"
  | "segmented-control"
  | "stats-card"
  | "progress-ring"
  | "timeline"
  | "rating"
  | "marquee"
  | "kbd"
  | "avatar-group"
  | "typewriter"
  | "flip-card"
  | "magnetic-button"
  | "step-indicator"
  | "search-dialog"
  | "site-header"
  | "site-footer"
  | "article-card"
  | "reading-progress"
  | "table-of-contents";

function SegmentedDemo() {
  const [v, setV] = React.useState("list");
  return (
    <SegmentedControl
      options={[
        { value: "list", label: "リスト" },
        { value: "grid", label: "グリッド" },
        { value: "table", label: "テーブル" },
      ]}
      value={v}
      onChange={setV}
    />
  );
}

function SegmentedSizeDemo() {
  const [v, setV] = React.useState("a");
  return (
    <div className="space-y-3">
      <SegmentedControl size="sm" options={[{ value: "a", label: "Small" }, { value: "b", label: "Option" }]} value={v} onChange={setV} />
      <SegmentedControl size="md" options={[{ value: "a", label: "Medium" }, { value: "b", label: "Option" }]} value={v} onChange={setV} />
      <SegmentedControl size="lg" options={[{ value: "a", label: "Large" }, { value: "b", label: "Option" }]} value={v} onChange={setV} />
    </div>
  );
}

function RatingDemo() {
  const [r, setR] = React.useState(3);
  return <Rating value={r} onChange={setR} />;
}

function RatingSizeDemo() {
  return (
    <div className="space-y-2">
      <Rating value={4} size="sm" readOnly />
      <Rating value={4} size="md" readOnly />
      <Rating value={4} size="lg" readOnly />
    </div>
  );
}

const previews: Record<ComponentName, React.ReactNode[]> = {
  "gradient-button": [
    <GradientButton gradient="purple" key="0">Get Started</GradientButton>,
    <div className="flex flex-wrap gap-3" key="1">
      {(["purple", "blue", "green", "orange", "pink"] as const).map((g) => (
        <GradientButton key={g} gradient={g} className="capitalize">{g}</GradientButton>
      ))}
    </div>,
    <div className="flex items-center gap-3" key="2">
      <GradientButton size="sm">Small</GradientButton>
      <GradientButton size="md">Medium</GradientButton>
      <GradientButton size="lg">Large</GradientButton>
    </div>,
  ],
  "glow-card": [
    <GlowCard glowColor="purple" className="max-w-sm" key="0">
      <GlowCardTitle>ホバーしてみて</GlowCardTitle>
      <GlowCardDescription>カードにグロー発光エフェクトがかかります。</GlowCardDescription>
    </GlowCard>,
    <div className="grid grid-cols-2 gap-4" key="1">
      {(["purple", "blue", "green", "pink"] as const).map((color) => (
        <GlowCard key={color} glowColor={color}>
          <GlowCardTitle className="capitalize">{color}</GlowCardTitle>
          <GlowCardDescription>Hover to glow.</GlowCardDescription>
        </GlowCard>
      ))}
    </div>,
  ],
  "animated-counter": [
    <div className="text-5xl font-bold tabular-nums" key="0">
      <AnimatedCounter value={1000} />
    </div>,
    <div className="flex gap-10" key="1">
      {[
        { value: 12500, prefix: "¥", suffix: "K" },
        { value: 98.5, suffix: "%", decimals: 1 },
        { value: 24, suffix: "k" },
      ].map((stat, i) => (
        <div key={i} className="text-center">
          <div className="text-4xl font-bold">
            <AnimatedCounter {...stat} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {["売上", "稼働率", "ユーザー"][i]}
          </p>
        </div>
      ))}
    </div>,
  ],
  "status-badge": [
    <div className="flex flex-wrap gap-2" key="0">
      {(["online", "offline", "away", "busy", "error", "warning"] as const).map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>,
    <div className="flex flex-wrap gap-2" key="1">
      <StatusBadge status="online" label="稼働中" />
      <StatusBadge status="busy" label="会議中" />
      <StatusBadge status="error" label="障害発生" />
    </div>,
  ],
  "shimmer-text": [
    <ShimmerText as="h2" className="text-3xl font-bold" key="0">
      シマーエフェクト
    </ShimmerText>,
    <div className="space-y-3" key="1">
      {[
        { colors: "from-violet-500 via-purple-300 to-violet-500", label: "パープル" },
        { colors: "from-cyan-500 via-blue-300 to-cyan-500", label: "ブルー" },
        { colors: "from-amber-500 via-yellow-300 to-amber-500", label: "ゴールド" },
      ].map(({ colors, label }) => (
        <ShimmerText key={label} as="h3" className="text-2xl font-bold" colors={colors}>
          {label}シマー
        </ShimmerText>
      ))}
    </div>,
    <div className="space-y-3" key="2">
      <ShimmerText className="text-xl font-semibold" speed="slow">ゆっくり</ShimmerText>
      <ShimmerText className="text-xl font-semibold" speed="normal">普通</ShimmerText>
      <ShimmerText className="text-xl font-semibold" speed="fast">速い</ShimmerText>
    </div>,
  ],
  "segmented-control": [
    <SegmentedDemo key="0" />,
    <SegmentedSizeDemo key="1" />,
  ],
  "stats-card": [
    <StatsCard
      key="0"
      title="月間売上"
      value="¥1,234,567"
      trend={12.5}
      trendLabel="先月比"
      icon={<TrendingUp className="h-4 w-4" />}
    />,
    <div className="grid grid-cols-2 gap-4 w-full max-w-md" key="1">
      <StatsCard title="ユーザー数" value="12,540" trend={8.2} trendLabel="先月比" icon={<Users className="h-4 w-4" />} />
      <StatsCard title="売上" value="¥980K" trend={-3.1} trendLabel="先月比" icon={<ShoppingCart className="h-4 w-4" />} />
      <StatsCard title="稼働率" value="99.9%" trend={0} trendLabel="変化なし" icon={<Activity className="h-4 w-4" />} />
      <StatsCard title="注文数" value="3,421" trend={21.4} trendLabel="先月比" />
    </div>,
  ],
  "progress-ring": [
    <ProgressRing value={72} size={100} key="0" />,
    <div className="flex gap-6" key="1">
      {(["primary", "success", "warning", "danger"] as const).map((c, i) => (
        <ProgressRing key={c} value={[80, 65, 45, 30][i]} color={c} size={80} />
      ))}
    </div>,
  ],
  "timeline": [
    <Timeline
      key="0"
      items={[
        { title: "プロジェクト開始", date: "2024/01", variant: "success" },
        { title: "ベータリリース", description: "初回テスト公開", date: "2024/03" },
        { title: "バグ修正", description: "クリティカルな問題を解決", date: "2024/04", variant: "warning" },
        { title: "本番リリース", date: "2024/06", variant: "success" },
      ]}
    />,
  ],
  "rating": [
    <RatingDemo key="0" />,
    <RatingSizeDemo key="1" />,
    <Rating value={4} readOnly key="2" />,
  ],
  "marquee": [
    <Marquee key="0" gap={16}>
      {["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui", "Vercel", "Radix UI"].map((t) => (
        <MarqueeItem key={t}>
          <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground">{t}</span>
        </MarqueeItem>
      ))}
    </Marquee>,
    <Marquee key="1" direction="right" gap={16}>
      {["Design", "Engineering", "Product", "Marketing", "Sales", "Support"].map((t) => (
        <MarqueeItem key={t}>
          <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">{t}</span>
        </MarqueeItem>
      ))}
    </Marquee>,
  ],
  "kbd": [
    <div className="flex gap-2" key="0">
      {["⌘", "⇧", "⌥", "Enter", "Esc"].map((k) => <Kbd key={k}>{k}</Kbd>)}
    </div>,
    <div className="space-y-2" key="1">
      {[["保存", ["⌘", "S"]], ["検索", ["⌘", "K"]], ["元に戻す", ["⌘", "Z"]]].map(([label, keys]) => (
        <div key={String(label)} className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground w-16">{label}</span>
          <Shortcut keys={keys as string[]} />
        </div>
      ))}
    </div>,
  ],
  "avatar-group": [
    <AvatarGroup
      key="0"
      avatars={[
        { name: "田中 太郎" },
        { name: "佐藤 花子" },
        { name: "山田 次郎" },
        { name: "鈴木 一郎" },
        { name: "高橋 美咲" },
        { name: "伊藤 健太" },
      ]}
      max={4}
    />,
    <div className="space-y-4" key="1">
      {(["sm", "md", "lg"] as const).map((size) => (
        <AvatarGroup
          key={size}
          size={size}
          avatars={[{ name: "田中" }, { name: "佐藤" }, { name: "山田" }]}
        />
      ))}
    </div>,
  ],
  "typewriter": [
    <div className="text-2xl font-semibold" key="0">
      I love{" "}
      <Typewriter texts={["React", "TypeScript", "Next.js", "Tailwind CSS"]} />
    </div>,
    <Typewriter
      key="1"
      texts={["Hello World", "こんにちは", "Bonjour", "Hola"]}
      cursor={false}
      className="text-xl"
    />,
    <Typewriter
      key="2"
      texts={["ゆっくり表示されます...", "じっくり読めます。"]}
      speed={120}
      deleteSpeed={60}
      pause={2500}
      className="text-lg"
    />,
  ],
  "flip-card": [
    <FlipCard
      key="0"
      height="160px"
      className="w-56"
      front={
        <div className="flex h-full items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
          ホバーしてね
        </div>
      }
      back={
        <div className="flex h-full items-center justify-center rounded-xl bg-muted p-4 text-center text-sm">
          裏面が見えました！
        </div>
      }
    />,
    <FlipCard
      key="1"
      trigger="click"
      height="160px"
      className="w-56"
      front={
        <div className="flex h-full items-center justify-center rounded-xl border-2 border-dashed border-primary text-primary font-semibold">
          クリックしてね
        </div>
      }
      back={
        <div className="flex h-full items-center justify-center rounded-xl bg-primary text-primary-foreground font-semibold">
          もう一度クリックで戻る
        </div>
      }
    />,
    <FlipCard
      key="2"
      direction="vertical"
      height="160px"
      className="w-56"
      front={
        <div className="flex h-full items-center justify-center rounded-xl bg-emerald-500 text-white font-bold text-lg">
          縦にフリップ
        </div>
      }
      back={
        <div className="flex h-full items-center justify-center rounded-xl bg-violet-500 text-white font-bold text-lg">
          裏面
        </div>
      }
    />,
  ],
  "magnetic-button": [
    <MagneticButton key="0">Hover around me</MagneticButton>,
    <div className="flex gap-6 items-center" key="1">
      <MagneticButton strength={15}>Subtle</MagneticButton>
      <MagneticButton strength={30}>Normal</MagneticButton>
      <MagneticButton strength={60}>Strong</MagneticButton>
    </div>,
  ],
  "search-dialog": [
    <SearchDialog
      key="0"
      shortcut="/"
      items={[
        { id: "1", title: "ダッシュボード", description: "メトリクスと概要", group: "ページ" },
        { id: "2", title: "ユーザー管理", description: "ユーザーの追加・編集", group: "ページ" },
        { id: "3", title: "設定", description: "アカウントと通知設定", group: "ページ" },
        { id: "4", title: "ダークモード切替", group: "操作" },
        { id: "5", title: "ログアウト", group: "操作" },
      ]}
    />,
    <SearchDialog
      key="1"
      items={[
        { id: "1", title: "React", description: "UIライブラリ" },
        { id: "2", title: "TypeScript", description: "型安全なJS" },
        { id: "3", title: "Next.js", description: "Reactフレームワーク" },
      ]}
      trigger={
        <button className="rounded-full border px-4 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors">
          🔍 検索
        </button>
      }
    />,
    <SearchDialog
      key="2"
      placeholder="コマンドを入力…"
      shortcut={false}
      items={[
        { id: "1", title: "新しいファイル" },
        { id: "2", title: "ファイルを開く" },
        { id: "3", title: "保存" },
        { id: "4", title: "名前を付けて保存" },
        { id: "5", title: "印刷" },
      ]}
    />,
  ],
  "site-header": [
    <SiteHeader key="0" title="My App" />,
    <SiteHeader
      key="1"
      title="My App"
      nav={[
        { label: "ホーム", href: "/" },
        { label: "ドキュメント", href: "/docs" },
        { label: "ブログ", href: "/blog" },
      ]}
    />,
    <SiteHeader
      key="2"
      title="My App"
      nav={[{ label: "ドキュメント", href: "/docs" }]}
      actions={
        <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
          ログイン
        </button>
      }
      sticky
    />,
  ],
  "site-footer": [
    <SiteFooter key="0" copyright="© 2026 My App. All rights reserved." />,
    <SiteFooter
      key="1"
      logo="My App"
      description="shadcn registry を使ったコンポーネントライブラリ。"
      copyright="© 2026 My App."
    />,
    <SiteFooter
      key="2"
      logo="My App"
      description="オープンソースのコンポーネントコレクション。"
      sections={[
        {
          heading: "プロダクト",
          links: [
            { label: "機能", href: "#" },
            { label: "料金", href: "#" },
            { label: "変更履歴", href: "#" },
          ],
        },
        {
          heading: "リソース",
          links: [
            { label: "ドキュメント", href: "#" },
            { label: "GitHub", href: "#" },
          ],
        },
      ]}
      copyright="© 2026 My App. All rights reserved."
    />,
  ],
  "article-card": [
    <ArticleCard
      key="0"
      title="Next.js App Router 入門"
      excerpt="App Router の基本的な使い方から、ルートグループ、レイアウト、サーバーコンポーネントまで丁寧に解説します。"
      date="2026-04-12"
      tags={["Next.js"]}
      className="max-w-sm"
    />,
    <div className="space-y-2 w-full max-w-lg" key="1">
      {[
        { title: "Tailwind CSS v4 の新機能まとめ", date: "2026-04-10", tags: ["CSS"]  },
        { title: "TypeScript 5.5 リリースノート", date: "2026-04-08", tags: ["TypeScript"] },
        { title: "React 19 で変わること", date: "2026-04-05", tags: ["React"] },
      ].map((post) => (
        <ArticleCard key={post.title} variant="horizontal" {...post} href="/blog" />
      ))}
    </div>,
    <div className="w-full max-w-md" key="2">
      {[
        { title: "Tailwind CSS v4 の新機能まとめ", date: "2026-04-10", tags: ["CSS"] },
        { title: "TypeScript 5.5 リリースノート", date: "2026-04-08", tags: ["TypeScript"] },
        { title: "React 19 で変わること", date: "2026-04-05", tags: ["React"] },
      ].map((post) => (
        <ArticleCard key={post.title} variant="minimal" {...post} href="/blog" />
      ))}
    </div>,
  ],
  "reading-progress": [
    <div className="w-full space-y-3" key="0">
      <p className="text-xs text-muted-foreground">スクロール進捗バー（固定表示）のプレビュー：</p>
      {(["primary", "blue", "green", "purple", "orange", "pink"] as const).map((color, i) => (
        <div key={color} className="flex items-center gap-3">
          <span className="w-16 text-xs text-muted-foreground">{color}</span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={[
                "h-full rounded-full",
                color === "primary" ? "bg-primary" :
                color === "blue" ? "bg-blue-500" :
                color === "green" ? "bg-emerald-500" :
                color === "purple" ? "bg-violet-500" :
                color === "orange" ? "bg-orange-500" :
                "bg-pink-500",
              ].join(" ")}
              style={{ width: `${40 + i * 10}%` }}
            />
          </div>
          <span className="w-8 text-right text-xs text-muted-foreground">{40 + i * 10}%</span>
        </div>
      ))}
    </div>,
    <div className="relative w-full overflow-hidden rounded-lg border bg-muted/20" key="1">
      <div className="h-1 w-2/3 bg-primary" />
      <div className="space-y-2 p-4">
        <p className="text-sm font-medium">記事タイトル</p>
        <p className="text-xs text-muted-foreground">上部のバーがスクロール読了率を示します。</p>
      </div>
    </div>,
  ],
  "table-of-contents": [
    <TableOfContents
      key="0"
      activeId="setup"
      items={[
        { id: "intro", label: "はじめに" },
        { id: "setup", label: "セットアップ" },
        { id: "install", label: "インストール", level: 2 },
        { id: "config", label: "設定", level: 2 },
        { id: "usage", label: "使い方" },
        { id: "examples", label: "サンプル", level: 2 },
        { id: "advanced", label: "応用" },
      ]}
      className="w-48"
    />,
    <TableOfContents
      key="1"
      activeId="examples"
      items={[
        { id: "overview", label: "概要" },
        { id: "install", label: "インストール" },
        { id: "usage", label: "使い方" },
        { id: "examples", label: "サンプルコード" },
        { id: "props", label: "Props リファレンス", level: 2 },
        { id: "faq", label: "よくある質問" },
      ]}
      title="この記事の内容"
      className="w-52"
    />,
  ],
  "step-indicator": [
    <StepIndicator
      key="0"
      currentStep={1}
      steps={[
        { label: "アカウント" },
        { label: "プロフィール" },
        { label: "確認" },
        { label: "完了" },
      ]}
      className="w-full max-w-sm"
    />,
    <StepIndicator
      key="1"
      orientation="vertical"
      currentStep={2}
      steps={[
        { label: "注文受付", description: "ご注文が確定しました" },
        { label: "梱包中", description: "商品を梱包しています" },
        { label: "配送中", description: "ドライバーが向かっています" },
        { label: "配達完了" },
      ]}
      className="max-w-xs"
    />,
  ],
};

interface ComponentRendererProps {
  componentName: string;
  exampleIndex: number;
}

export function ComponentRenderer({ componentName, exampleIndex }: ComponentRendererProps) {
  const examples = previews[componentName as ComponentName];
  if (!examples) return <p className="text-muted-foreground text-sm">プレビューなし</p>;
  return <>{examples[exampleIndex] ?? examples[0]}</>;
}
