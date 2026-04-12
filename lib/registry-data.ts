export type ComponentCategory = "buttons" | "cards" | "data" | "feedback" | "typography" | "navigation";

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ComponentConfig {
  name: string;
  title: string;
  description: string;
  category: ComponentCategory;
  filePath: string;
  props: PropDef[];
  usage: string;
  examples: { label: string; code: string }[];
}

export const categoryLabels: Record<ComponentCategory, string> = {
  buttons: "ボタン",
  cards: "カード",
  data: "データ表示",
  feedback: "フィードバック",
  typography: "テキスト",
  navigation: "ナビゲーション",
};

export const components: ComponentConfig[] = [
  {
    name: "gradient-button",
    title: "Gradient Button",
    description: "カスタマイズ可能なグラデーション背景とホバーアニメーションを持つボタン。",
    category: "buttons",
    filePath: "registry/components/gradient-button.tsx",
    props: [
      { name: "gradient", type: '"purple" | "blue" | "green" | "orange" | "pink"', default: '"purple"', description: "グラデーションのカラースキーム" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "ボタンのサイズ" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { GradientButton } from "@/components/ui/gradient-button"

export default function Example() {
  return (
    <GradientButton gradient="purple" size="md">
      Click me
    </GradientButton>
  )
}`,
    examples: [
      {
        label: "Purple (default)",
        code: `<GradientButton gradient="purple">Get Started</GradientButton>`,
      },
      {
        label: "All variants",
        code: `<div className="flex flex-wrap gap-3">
  <GradientButton gradient="purple">Purple</GradientButton>
  <GradientButton gradient="blue">Blue</GradientButton>
  <GradientButton gradient="green">Green</GradientButton>
  <GradientButton gradient="orange">Orange</GradientButton>
  <GradientButton gradient="pink">Pink</GradientButton>
</div>`,
      },
      {
        label: "Sizes",
        code: `<div className="flex items-center gap-3">
  <GradientButton size="sm">Small</GradientButton>
  <GradientButton size="md">Medium</GradientButton>
  <GradientButton size="lg">Large</GradientButton>
</div>`,
      },
    ],
  },
  {
    name: "glow-card",
    title: "Glow Card",
    description: "ホバー時にカスタマイズ可能な色でグロー発光するカードコンポーネント。",
    category: "cards",
    filePath: "registry/components/glow-card.tsx",
    props: [
      { name: "glowColor", type: '"purple" | "blue" | "green" | "orange" | "pink" | "white"', default: '"purple"', description: "ホバー時のグロー発光カラー" },
      { name: "intensity", type: '"low" | "medium" | "high"', default: '"medium"', description: "グロー強度" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { GlowCard, GlowCardTitle, GlowCardDescription } from "@/components/ui/glow-card"

export default function Example() {
  return (
    <GlowCard glowColor="purple">
      <GlowCardTitle>Card Title</GlowCardTitle>
      <GlowCardDescription>Card description text.</GlowCardDescription>
    </GlowCard>
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<GlowCard glowColor="purple" className="max-w-sm">
  <GlowCardTitle>Hover me</GlowCardTitle>
  <GlowCardDescription>This card glows purple when you hover over it.</GlowCardDescription>
</GlowCard>`,
      },
      {
        label: "All glow colors",
        code: `<div className="grid grid-cols-2 gap-4">
  {(["purple","blue","green","pink"] as const).map(color => (
    <GlowCard key={color} glowColor={color}>
      <GlowCardTitle className="capitalize">{color}</GlowCardTitle>
      <GlowCardDescription>Hover to see the {color} glow.</GlowCardDescription>
    </GlowCard>
  ))}
</div>`,
      },
    ],
  },
  {
    name: "animated-counter",
    title: "Animated Counter",
    description: "IntersectionObserver を使い、スクロールでビューポートに入ったときにカウントアップアニメーションする数値コンポーネント。",
    category: "data",
    filePath: "registry/components/animated-counter.tsx",
    props: [
      { name: "value", type: "number", description: "カウントアップする目標値" },
      { name: "duration", type: "number", default: "1500", description: "アニメーションの長さ（ミリ秒）" },
      { name: "prefix", type: "string", default: '""', description: "数値の前に付く文字列（例：¥）" },
      { name: "suffix", type: "string", default: '""', description: "数値の後に付く文字列（例：%）" },
      { name: "decimals", type: "number", default: "0", description: "表示する小数点以下の桁数" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { AnimatedCounter } from "@/components/ui/animated-counter"

export default function Example() {
  return (
    <div className="text-4xl font-bold">
      <AnimatedCounter value={12500} prefix="$" suffix="+" />
    </div>
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<div className="text-5xl font-bold tabular-nums">
  <AnimatedCounter value={1000} />
</div>`,
      },
      {
        label: "Stats row",
        code: `<div className="flex gap-8">
  {[
    { value: 12500, prefix: "$", suffix: "+" },
    { value: 98.5, suffix: "%", decimals: 1 },
    { value: 24, suffix: "k" },
  ].map((stat, i) => (
    <div key={i} className="text-center">
      <div className="text-4xl font-bold">
        <AnimatedCounter {...stat} />
      </div>
    </div>
  ))}
</div>`,
      },
    ],
  },
  {
    name: "status-badge",
    title: "Status Badge",
    description: "オンライン/オフラインなどのステータスをパルスアニメーション付きドットで表示するバッジ。",
    category: "feedback",
    filePath: "registry/components/status-badge.tsx",
    props: [
      { name: "status", type: '"online" | "offline" | "away" | "busy" | "error" | "warning"', description: "表示するステータス" },
      { name: "label", type: "string", description: "カスタムラベル（省略するとステータス名が表示される）" },
      { name: "pulse", type: "boolean", default: "true", description: "パルスアニメーションの有無" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { StatusBadge } from "@/components/ui/status-badge"

export default function Example() {
  return <StatusBadge status="online" />
}`,
    examples: [
      {
        label: "All statuses",
        code: `<div className="flex flex-wrap gap-2">
  <StatusBadge status="online" />
  <StatusBadge status="offline" />
  <StatusBadge status="away" />
  <StatusBadge status="busy" />
  <StatusBadge status="error" />
  <StatusBadge status="warning" />
</div>`,
      },
      {
        label: "Custom labels",
        code: `<div className="flex flex-wrap gap-2">
  <StatusBadge status="online" label="Active" />
  <StatusBadge status="busy" label="In Meeting" />
  <StatusBadge status="error" label="Service Down" />
</div>`,
      },
    ],
  },
  {
    name: "shimmer-text",
    title: "Shimmer Text",
    description: "CSS グラデーションアニメーションでキラキラと光るシマーエフェクトのテキストコンポーネント。",
    category: "typography",
    filePath: "registry/components/shimmer-text.tsx",
    props: [
      { name: "speed", type: '"slow" | "normal" | "fast"', default: '"normal"', description: "アニメーション速度" },
      { name: "colors", type: "string", description: "Tailwindのグラデーションクラス（from-* via-* to-*）" },
      { name: "as", type: '"span" | "h1" | "h2" | "h3" | "p"', default: '"span"', description: "レンダリングするHTML要素" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { ShimmerText } from "@/components/ui/shimmer-text"

export default function Example() {
  return (
    <ShimmerText as="h1" className="text-4xl font-bold">
      Hello World
    </ShimmerText>
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<ShimmerText as="h2" className="text-3xl font-bold">
  Shimmer Effect
</ShimmerText>`,
      },
      {
        label: "Color variants",
        code: `<div className="space-y-3">
  <ShimmerText as="h3" className="text-2xl font-bold" colors="from-violet-500 via-purple-300 to-violet-500">
    Purple Shimmer
  </ShimmerText>
  <ShimmerText as="h3" className="text-2xl font-bold" colors="from-cyan-500 via-blue-300 to-cyan-500">
    Blue Shimmer
  </ShimmerText>
  <ShimmerText as="h3" className="text-2xl font-bold" colors="from-amber-500 via-yellow-300 to-amber-500">
    Gold Shimmer
  </ShimmerText>
</div>`,
      },
      {
        label: "Speeds",
        code: `<div className="space-y-3">
  <ShimmerText className="text-xl font-semibold" speed="slow">Slow shimmer</ShimmerText>
  <ShimmerText className="text-xl font-semibold" speed="normal">Normal shimmer</ShimmerText>
  <ShimmerText className="text-xl font-semibold" speed="fast">Fast shimmer</ShimmerText>
</div>`,
      },
    ],
  },

  // ── Segmented Control ────────────────────────────────────────────
  {
    name: "segmented-control",
    title: "Segmented Control",
    description: "タブのようにセグメントを切り替えられるボタングループ。",
    category: "buttons",
    filePath: "registry/components/segmented-control.tsx",
    props: [
      { name: "options", type: "{ value: T; label: ReactNode; disabled?: boolean }[]", description: "選択肢の配列" },
      { name: "value", type: "T", description: "選択中の値" },
      { name: "onChange", type: "(value: T) => void", description: "変更ハンドラ" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "サイズ" },
      { name: "fullWidth", type: "boolean", default: "false", description: "全幅表示" },
    ],
    usage: `"use client";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { useState } from "react";

export default function Example() {
  const [view, setView] = useState("list");
  return (
    <SegmentedControl
      options={[
        { value: "list", label: "リスト" },
        { value: "grid", label: "グリッド" },
        { value: "table", label: "テーブル" },
      ]}
      value={view}
      onChange={setView}
    />
  );
}`,
    examples: [
      { label: "基本", code: `<SegmentedControl options={[{value:"a",label:"リスト"},{value:"b",label:"グリッド"},{value:"c",label:"テーブル"}]} value="a" onChange={()=>{}} />` },
      { label: "サイズ", code: `<div className="space-y-3">\n  <SegmentedControl size="sm" options={[{value:"a",label:"Small"},{value:"b",label:"Option"}]} value="a" onChange={()=>{}} />\n  <SegmentedControl size="md" options={[{value:"a",label:"Medium"},{value:"b",label:"Option"}]} value="a" onChange={()=>{}} />\n  <SegmentedControl size="lg" options={[{value:"a",label:"Large"},{value:"b",label:"Option"}]} value="a" onChange={()=>{}} />\n</div>` },
    ],
  },

  // ── Stats Card ───────────────────────────────────────────────────
  {
    name: "stats-card",
    title: "Stats Card",
    description: "数値・トレンド・アイコンを表示するダッシュボード向けカード。",
    category: "cards",
    filePath: "registry/components/stats-card.tsx",
    props: [
      { name: "title", type: "string", description: "カードのラベル" },
      { name: "value", type: "string | number", description: "表示する値" },
      { name: "trend", type: "number", description: "前期比（%）" },
      { name: "trendLabel", type: "string", description: "トレンドの補足テキスト" },
      { name: "icon", type: "ReactNode", description: "アイコン" },
      { name: "prefix", type: "string", description: "値の前に付く文字" },
      { name: "suffix", type: "string", description: "値の後に付く文字" },
    ],
    usage: `import { StatsCard } from "@/components/ui/stats-card";
import { Users } from "lucide-react";

export default function Example() {
  return (
    <StatsCard
      title="月間ユーザー数"
      value="12,540"
      trend={8.2}
      trendLabel="先月比"
      icon={<Users className="h-4 w-4" />}
    />
  );
}`,
    examples: [
      { label: "基本", code: `<StatsCard title="売上" value="¥1,234,567" trend={12.5} trendLabel="先月比" />` },
      { label: "複数カード", code: `<div className="grid grid-cols-2 gap-4">\n  <StatsCard title="ユーザー数" value="12,540" trend={8.2} trendLabel="先月比" />\n  <StatsCard title="売上" value="¥980K" trend={-3.1} trendLabel="先月比" />\n  <StatsCard title="稼働率" value="99.9%" trend={0} trendLabel="変化なし" />\n  <StatsCard title="注文数" value="3,421" trend={21.4} trendLabel="先月比" />\n</div>` },
    ],
  },

  // ── Progress Ring ────────────────────────────────────────────────
  {
    name: "progress-ring",
    title: "Progress Ring",
    description: "SVGで描画する円形プログレスインジケーター。",
    category: "data",
    filePath: "registry/components/progress-ring.tsx",
    props: [
      { name: "value", type: "number", description: "現在値" },
      { name: "max", type: "number", default: "100", description: "最大値" },
      { name: "size", type: "number", default: "80", description: "直径（px）" },
      { name: "strokeWidth", type: "number", default: "8", description: "線の太さ" },
      { name: "color", type: '"primary" | "success" | "warning" | "danger"', default: '"primary"', description: "色" },
      { name: "showLabel", type: "boolean", default: "true", description: "中央にパーセントを表示" },
      { name: "label", type: "string", description: "カスタムラベル" },
    ],
    usage: `import { ProgressRing } from "@/components/ui/progress-ring";

export default function Example() {
  return <ProgressRing value={72} color="success" size={100} />;
}`,
    examples: [
      { label: "基本", code: `<ProgressRing value={72} size={100} />` },
      { label: "カラーバリエーション", code: `<div className="flex gap-6">\n  <ProgressRing value={80} color="primary" size={80} />\n  <ProgressRing value={65} color="success" size={80} />\n  <ProgressRing value={45} color="warning" size={80} />\n  <ProgressRing value={30} color="danger" size={80} />\n</div>` },
    ],
  },

  // ── Timeline ─────────────────────────────────────────────────────
  {
    name: "timeline",
    title: "Timeline",
    description: "縦型タイムラインで時系列イベントを表示するコンポーネント。",
    category: "data",
    filePath: "registry/components/timeline.tsx",
    props: [
      { name: "items", type: "TimelineItem[]", description: "表示するアイテムの配列" },
    ],
    usage: `import { Timeline } from "@/components/ui/timeline";

export default function Example() {
  return (
    <Timeline items={[
      { title: "プロジェクト開始", date: "2024/01", variant: "success" },
      { title: "ベータリリース", description: "初回テスト完了", date: "2024/03" },
      { title: "本番リリース", date: "2024/06", variant: "success" },
    ]} />
  );
}`,
    examples: [
      { label: "基本", code: `<Timeline items={[\n  { title: "プロジェクト開始", date: "2024/01", variant: "success" },\n  { title: "ベータリリース", description: "初回テスト公開", date: "2024/03" },\n  { title: "バグ修正", description: "クリティカルな問題を解決", date: "2024/04", variant: "warning" },\n  { title: "本番リリース", date: "2024/06", variant: "success" },\n]} />` },
    ],
  },

  // ── Rating ───────────────────────────────────────────────────────
  {
    name: "rating",
    title: "Rating",
    description: "クリックやホバーで選択できる星評価コンポーネント。",
    category: "feedback",
    filePath: "registry/components/rating.tsx",
    props: [
      { name: "value", type: "number", default: "0", description: "選択中の評価値" },
      { name: "max", type: "number", default: "5", description: "最大評価数" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "星のサイズ" },
      { name: "readOnly", type: "boolean", default: "false", description: "読み取り専用" },
      { name: "onChange", type: "(value: number) => void", description: "変更ハンドラ" },
    ],
    usage: `"use client";
import { Rating } from "@/components/ui/rating";
import { useState } from "react";

export default function Example() {
  const [rating, setRating] = useState(3);
  return <Rating value={rating} onChange={setRating} />;
}`,
    examples: [
      { label: "インタラクティブ", code: `<Rating value={3} onChange={() => {}} />` },
      { label: "サイズ", code: `<div className="space-y-2">\n  <Rating value={4} size="sm" readOnly />\n  <Rating value={4} size="md" readOnly />\n  <Rating value={4} size="lg" readOnly />\n</div>` },
      { label: "読み取り専用", code: `<Rating value={4} readOnly />` },
    ],
  },

  // ── Marquee ──────────────────────────────────────────────────────
  {
    name: "marquee",
    title: "Marquee",
    description: "コンテンツを水平に無限スクロールするマーキーコンポーネント。",
    category: "typography",
    filePath: "registry/components/marquee.tsx",
    props: [
      { name: "speed", type: '"slow" | "normal" | "fast"', default: '"normal"', description: "スクロール速度" },
      { name: "direction", type: '"left" | "right"', default: '"left"', description: "スクロール方向" },
      { name: "pauseOnHover", type: "boolean", default: "true", description: "ホバーで一時停止" },
      { name: "gap", type: "number", default: "16", description: "アイテム間のgap（px）" },
    ],
    usage: `import { Marquee, MarqueeItem } from "@/components/ui/marquee";

export default function Example() {
  return (
    <Marquee>
      {["React", "TypeScript", "Next.js", "Tailwind"].map((tag) => (
        <MarqueeItem key={tag}>
          <span className="rounded-full border px-3 py-1 text-sm">{tag}</span>
        </MarqueeItem>
      ))}
    </Marquee>
  );
}`,
    examples: [
      { label: "テキスト", code: `<Marquee gap={24}>\n  {["React","TypeScript","Next.js","Tailwind CSS","shadcn/ui","Vercel"].map(t => (\n    <MarqueeItem key={t}>\n      <span className="rounded-full border px-3 py-1 text-sm text-muted-foreground">{t}</span>\n    </MarqueeItem>\n  ))}\n</Marquee>` },
      { label: "右方向", code: `<Marquee direction="right" gap={24}>\n  {["Design","Engineering","Product","Marketing","Sales"].map(t => (\n    <MarqueeItem key={t}>\n      <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium">{t}</span>\n    </MarqueeItem>\n  ))}\n</Marquee>` },
    ],
  },

  // ── Kbd ──────────────────────────────────────────────────────────
  {
    name: "kbd",
    title: "Kbd",
    description: "キーボードショートカットキーを視覚的に表示するコンポーネント。",
    category: "typography",
    filePath: "registry/components/kbd.tsx",
    props: [
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "サイズ" },
      { name: "children", type: "ReactNode", description: "表示するキー文字" },
    ],
    usage: `import { Kbd, Shortcut } from "@/components/ui/kbd";

export default function Example() {
  return (
    <div className="flex items-center gap-2">
      <span>保存:</span>
      <Shortcut keys={["⌘", "S"]} />
    </div>
  );
}`,
    examples: [
      { label: "単体キー", code: `<div className="flex gap-2">\n  <Kbd>⌘</Kbd>\n  <Kbd>⇧</Kbd>\n  <Kbd>⌥</Kbd>\n  <Kbd>Enter</Kbd>\n  <Kbd>Esc</Kbd>\n</div>` },
      { label: "ショートカット", code: `<div className="space-y-2">\n  <div className="flex items-center gap-2 text-sm">\n    <span className="text-muted-foreground w-16">保存</span>\n    <Shortcut keys={["⌘","S"]} />\n  </div>\n  <div className="flex items-center gap-2 text-sm">\n    <span className="text-muted-foreground w-16">検索</span>\n    <Shortcut keys={["⌘","K"]} />\n  </div>\n  <div className="flex items-center gap-2 text-sm">\n    <span className="text-muted-foreground w-16">元に戻す</span>\n    <Shortcut keys={["⌘","Z"]} />\n  </div>\n</div>` },
    ],
  },

  // ── Avatar Group ─────────────────────────────────────────────────
  {
    name: "avatar-group",
    title: "Avatar Group",
    description: "複数のアバターを重ねて表示するスタック型グループ。",
    category: "data",
    filePath: "registry/components/avatar-group.tsx",
    props: [
      { name: "avatars", type: "{ src?: string; name: string; color?: string }[]", description: "アバターの配列" },
      { name: "max", type: "number", default: "5", description: "最大表示数" },
      { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "サイズ" },
    ],
    usage: `import { AvatarGroup } from "@/components/ui/avatar-group";

export default function Example() {
  return (
    <AvatarGroup
      avatars={[
        { name: "田中 太郎" },
        { name: "佐藤 花子" },
        { name: "山田 次郎" },
      ]}
    />
  );
}`,
    examples: [
      { label: "基本", code: `<AvatarGroup avatars={[{name:"田中 太郎"},{name:"佐藤 花子"},{name:"山田 次郎"},{name:"鈴木 一郎"},{name:"高橋 美咲"},{name:"伊藤 健太"}]} max={4} />` },
      { label: "サイズ", code: `<div className="space-y-4">\n  <AvatarGroup size="sm" avatars={[{name:"田中"},{name:"佐藤"},{name:"山田"}]} />\n  <AvatarGroup size="md" avatars={[{name:"田中"},{name:"佐藤"},{name:"山田"}]} />\n  <AvatarGroup size="lg" avatars={[{name:"田中"},{name:"佐藤"},{name:"山田"}]} />\n</div>` },
    ],
  },
  // ── Typewriter ───────────────────────────────────────────────────
  {
    name: "typewriter",
    title: "Typewriter",
    description: "複数のテキストを順番にタイプ＆デリートするタイプライターエフェクト。",
    category: "typography",
    filePath: "registry/components/typewriter.tsx",
    props: [
      { name: "texts", type: "string[]", description: "順番に表示するテキストの配列" },
      { name: "speed", type: "number", default: "80", description: "タイピング速度（ミリ秒/文字）" },
      { name: "deleteSpeed", type: "number", default: "40", description: "削除速度（ミリ秒/文字）" },
      { name: "pause", type: "number", default: "1500", description: "テキスト表示後の待機時間（ミリ秒）" },
      { name: "loop", type: "boolean", default: "true", description: "ループ再生" },
      { name: "cursor", type: "boolean", default: "true", description: "カーソルの表示" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { Typewriter } from "@/components/ui/typewriter"

export default function Example() {
  return (
    <h1 className="text-4xl font-bold">
      We build{" "}
      <Typewriter
        texts={["beautiful UIs.", "fast apps.", "great products."]}
      />
    </h1>
  )
}`,
    examples: [
      {
        label: "基本",
        code: `<div className="text-2xl font-semibold">
  I love{" "}
  <Typewriter texts={["React", "TypeScript", "Next.js", "Tailwind CSS"]} />
</div>`,
      },
      {
        label: "カーソルなし",
        code: `<Typewriter
  texts={["Hello World", "こんにちは", "Bonjour", "Hola"]}
  cursor={false}
  className="text-xl"
/>`,
      },
      {
        label: "速度調整",
        code: `<Typewriter
  texts={["ゆっくり表示されます...", "じっくり読めます。"]}
  speed={120}
  deleteSpeed={60}
  pause={2500}
  className="text-lg"
/>`,
      },
    ],
  },

  // ── Flip Card ────────────────────────────────────────────────────
  {
    name: "flip-card",
    title: "Flip Card",
    description: "ホバーまたはクリックで表裏がフリップするカードコンポーネント。",
    category: "cards",
    filePath: "registry/components/flip-card.tsx",
    props: [
      { name: "front", type: "ReactNode", description: "表面のコンテンツ" },
      { name: "back", type: "ReactNode", description: "裏面のコンテンツ" },
      { name: "trigger", type: '"hover" | "click"', default: '"hover"', description: "フリップのトリガー" },
      { name: "direction", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "フリップの方向" },
      { name: "height", type: "string", default: '"200px"', description: "カードの高さ" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { FlipCard } from "@/components/ui/flip-card"

export default function Example() {
  return (
    <FlipCard
      height="180px"
      className="w-64"
      front={
        <div className="flex h-full items-center justify-center rounded-xl bg-primary text-primary-foreground text-lg font-bold">
          表面
        </div>
      }
      back={
        <div className="flex h-full items-center justify-center rounded-xl bg-muted text-foreground text-sm p-4 text-center">
          裏面のコンテンツがここに表示されます。
        </div>
      }
    />
  )
}`,
    examples: [
      {
        label: "ホバーでフリップ",
        code: `<FlipCard
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
/>`,
      },
      {
        label: "クリックでフリップ",
        code: `<FlipCard
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
/>`,
      },
      {
        label: "縦方向フリップ",
        code: `<FlipCard
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
/>`,
      },
    ],
  },

  // ── Magnetic Button ──────────────────────────────────────────────
  {
    name: "magnetic-button",
    title: "Magnetic Button",
    description: "マウスカーソルに引き寄せられる磁石エフェクトのボタン。",
    category: "buttons",
    filePath: "registry/components/magnetic-button.tsx",
    props: [
      { name: "strength", type: "number", default: "30", description: "引き寄せの強さ（px）" },
      { name: "radius", type: "number", default: "150", description: "磁石が反応する半径（px）" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { MagneticButton } from "@/components/ui/magnetic-button"

export default function Example() {
  return (
    <MagneticButton>
      Hover around me
    </MagneticButton>
  )
}`,
    examples: [
      {
        label: "基本",
        code: `<MagneticButton>Hover around me</MagneticButton>`,
      },
      {
        label: "強度調整",
        code: `<div className="flex gap-6 items-center">
  <MagneticButton strength={15}>Subtle</MagneticButton>
  <MagneticButton strength={30}>Normal</MagneticButton>
  <MagneticButton strength={60}>Strong</MagneticButton>
</div>`,
      },
    ],
  },

  // ── Step Indicator ───────────────────────────────────────────────
  {
    name: "step-indicator",
    title: "Step Indicator",
    description: "ウィザードやフォームのステップ進行を水平・垂直で視覚化するインジケーター。",
    category: "data",
    filePath: "registry/components/step-indicator.tsx",
    props: [
      { name: "steps", type: "{ label: string; description?: string }[]", description: "ステップの配列" },
      { name: "currentStep", type: "number", description: "現在のステップインデックス（0始まり）" },
      { name: "orientation", type: '"horizontal" | "vertical"', default: '"horizontal"', description: "表示方向" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { StepIndicator } from "@/components/ui/step-indicator"

export default function Example() {
  return (
    <StepIndicator
      currentStep={1}
      steps={[
        { label: "アカウント作成" },
        { label: "プロフィール設定" },
        { label: "確認" },
      ]}
    />
  )
}`,
    examples: [
      {
        label: "水平（基本）",
        code: `<StepIndicator
  currentStep={1}
  steps={[
    { label: "アカウント" },
    { label: "プロフィール" },
    { label: "確認" },
    { label: "完了" },
  ]}
/>`,
      },
      {
        label: "垂直",
        code: `<StepIndicator
  orientation="vertical"
  currentStep={2}
  steps={[
    { label: "注文受付", description: "ご注文が確定しました" },
    { label: "梱包中", description: "商品を梱包しています" },
    { label: "配送中", description: "ドライバーが向かっています" },
    { label: "配達完了" },
  ]}
  className="max-w-xs"
/>`,
      },
    ],
  },
  {
    name: "search-dialog",
    title: "Search Dialog",
    description: "⌘K ショートカット対応の検索ダイアログ。モバイルではボトムシート、デスクトップでは中央モーダルとして表示。",
    category: "feedback",
    filePath: "registry/components/search-dialog.tsx",
    props: [
      { name: "items", type: "SearchItem[]", description: "検索対象のアイテム配列（id, title, description?, group?, href?, onSelect? を持つ）" },
      { name: "placeholder", type: "string", default: '"検索…"', description: "入力フィールドのプレースホルダー" },
      { name: "trigger", type: "React.ReactNode", description: "カスタムトリガー要素（省略時はデフォルトボタン）" },
      { name: "shortcut", type: 'string | false', default: '"k"', description: '⌘/Ctrl と組み合わせるキー（例: "k", "/", "p"）。false で無効化' },
      { name: "emptyMessage", type: "string", default: '"見つかりません"', description: "検索結果が0件のときのメッセージ" },
      { name: "className", type: "string", description: "トリガーボタンへの追加CSSクラス" },
    ],
    usage: `import { SearchDialog } from "@/components/ui/search-dialog"

const items = [
  { id: "1", title: "ダッシュボード", description: "概要を確認", group: "ページ", href: "/dashboard" },
  { id: "2", title: "設定", description: "アカウント設定", group: "ページ", href: "/settings" },
  { id: "3", title: "ログアウト", group: "操作", onSelect: () => signOut() },
]

export default function Example() {
  return <SearchDialog items={items} />
}`,
    examples: [
      {
        label: "基本",
        code: `<SearchDialog
  items={[
    { id: "1", title: "ダッシュボード", description: "メトリクスと概要", group: "ページ" },
    { id: "2", title: "ユーザー管理", description: "ユーザーの追加・編集", group: "ページ" },
    { id: "3", title: "設定", description: "アカウントと通知設定", group: "ページ" },
    { id: "4", title: "ダークモード切替", group: "操作" },
    { id: "5", title: "ログアウト", group: "操作" },
  ]}
/>`,
      },
      {
        label: "カスタムトリガー",
        code: `<SearchDialog
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
/>`,
      },
      {
        label: "グループなし",
        code: `<SearchDialog
  placeholder="コマンドを入力…"
  shortcut={false}
  items={[
    { id: "1", title: "新しいファイル" },
    { id: "2", title: "ファイルを開く" },
    { id: "3", title: "保存" },
    { id: "4", title: "名前を付けて保存" },
    { id: "5", title: "印刷" },
  ]}
/>`,
      },
    ],
  },
  {
    name: "site-header",
    title: "Site Header",
    description: "ロゴ・ナビゲーションリンク・アクションエリアを持つサイトヘッダーコンポーネント。sticky・backdrop-blur 対応。",
    category: "navigation",
    filePath: "registry/components/site-header.tsx",
    props: [
      { name: "logo", type: "React.ReactNode", description: "ロゴ画像やアイコン" },
      { name: "title", type: "string", default: '"My App"', description: "サイト名テキスト" },
      { name: "nav", type: "{ label: string; href: string }[]", default: "[]", description: "ナビゲーションリンクの配列" },
      { name: "actions", type: "React.ReactNode", description: "右端に表示するボタン等のアクション要素" },
      { name: "sticky", type: "boolean", default: "false", description: "スクロール時にヘッダーを固定するか" },
      { name: "bordered", type: "boolean", default: "true", description: "下部ボーダーを表示するか" },
      { name: "blurred", type: "boolean", default: "true", description: "backdrop-blur を適用するか" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { SiteHeader } from "@/components/ui/site-header"

export default function Example() {
  return (
    <SiteHeader
      title="My App"
      nav={[
        { label: "ホーム", href: "/" },
        { label: "ドキュメント", href: "/docs" },
      ]}
      sticky
    />
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<SiteHeader title="My App" />`,
      },
      {
        label: "With nav links",
        code: `<SiteHeader
  title="My App"
  nav={[
    { label: "ホーム", href: "/" },
    { label: "ドキュメント", href: "/docs" },
    { label: "ブログ", href: "/blog" },
  ]}
/>`,
      },
      {
        label: "With actions",
        code: `<SiteHeader
  title="My App"
  nav={[{ label: "ドキュメント", href: "/docs" }]}
  actions={
    <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
      ログイン
    </button>
  }
  sticky
/>`,
      },
    ],
  },
  {
    name: "site-footer",
    title: "Site Footer",
    description: "ロゴ・説明文・リンクセクション・コピーライトを持つサイトフッターコンポーネント。",
    category: "navigation",
    filePath: "registry/components/site-footer.tsx",
    props: [
      { name: "logo", type: "React.ReactNode", description: "ロゴ画像やアイコン" },
      { name: "description", type: "string", description: "ブランド説明文" },
      { name: "sections", type: "{ heading: string; links: { label: string; href: string }[] }[]", default: "[]", description: "リンクセクションの配列" },
      { name: "copyright", type: "string", description: "コピーライト文（省略時は自動生成）" },
      { name: "bordered", type: "boolean", default: "true", description: "上部ボーダーを表示するか" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { SiteFooter } from "@/components/ui/site-footer"

export default function Example() {
  return (
    <SiteFooter
      logo="My App"
      description="shadcn registry を使ったコンポーネントライブラリ。"
      sections={[
        {
          heading: "プロダクト",
          links: [
            { label: "機能", href: "/features" },
            { label: "料金", href: "/pricing" },
          ],
        },
      ]}
      copyright="© 2026 My App. All rights reserved."
    />
  )
}`,
    examples: [
      {
        label: "Minimal",
        code: `<SiteFooter copyright="© 2026 My App. All rights reserved." />`,
      },
      {
        label: "With brand",
        code: `<SiteFooter
  logo="My App"
  description="shadcn registry を使ったコンポーネントライブラリ。"
  copyright="© 2026 My App."
/>`,
      },
      {
        label: "Full layout",
        code: `<SiteFooter
  logo="My App"
  description="オープンソースのコンポーネントコレクション。"
  sections={[
    {
      heading: "プロダクト",
      links: [
        { label: "機能", href: "/features" },
        { label: "料金", href: "/pricing" },
        { label: "変更履歴", href: "/changelog" },
      ],
    },
    {
      heading: "リソース",
      links: [
        { label: "ドキュメント", href: "/docs" },
        { label: "GitHub", href: "https://github.com" },
      ],
    },
  ]}
  copyright="© 2026 My App. All rights reserved."
/>`,
      },
    ],
  },
  // ── Article Card ────────────────────────────────────────────────
  {
    name: "article-card",
    title: "Article Card",
    description: "ブログ記事の一覧表示に使えるカード。タグ・日付・抜粋・カバー画像に対応し、default / horizontal / minimal の3バリアントを持つ。",
    category: "cards",
    filePath: "registry/components/article-card.tsx",
    props: [
      { name: "title", type: "string", description: "記事タイトル" },
      { name: "excerpt", type: "string", description: "記事の抜粋（defaultバリアントで本文2行表示）" },
      { name: "date", type: "string", description: "公開日（例: 2026-04-12）" },
      { name: "tags", type: "string[]", description: "タグの配列。先頭の1件のみ表示される" },
      { name: "coverImage", type: "string", description: "カバー画像のURL。省略時はグラデーションプレースホルダーを表示" },
      { name: "href", type: "string", description: "カードのリンク先URL。指定すると <a> タグでレンダリングされる" },
      { name: "variant", type: '"default" | "horizontal" | "minimal"', default: '"default"', description: "レイアウトバリアント。用途に合わせて選択する" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { ArticleCard } from "@/components/ui/article-card"

export default function BlogIndex() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <ArticleCard
          key={post.slug}
          title={post.title}
          excerpt={post.excerpt}
          date={post.date}
          tags={post.tags}
          coverImage={post.coverImage}
          href={\`/blog/\${post.slug}\`}
        />
      ))}
    </div>
  )
}`,
    examples: [
      {
        label: "Default",
        code: `<ArticleCard
  title="Next.js App Router 入門"
  excerpt="App Router の基本的な使い方から、ルートグループ、レイアウト、サーバーコンポーネントまで解説します。"
  date="2026-04-12"
  tags={["Next.js"]}
  className="max-w-sm"
/>`,
      },
      {
        label: "Horizontal",
        code: `<div className="space-y-2 max-w-lg">
  {[
    { title: "Tailwind CSS v4 の新機能", date: "2026-04-10", tags: ["CSS"] },
    { title: "TypeScript 5.5 リリースノート", date: "2026-04-08", tags: ["TypeScript"] },
    { title: "React 19 で変わること", date: "2026-04-05", tags: ["React"] },
  ].map((post) => (
    <ArticleCard key={post.title} variant="horizontal" {...post} href="/blog" />
  ))}
</div>`,
      },
      {
        label: "Minimal list",
        code: `<div className="max-w-md">
  {[
    { title: "Tailwind CSS v4 の新機能", date: "2026-04-10", tags: ["CSS"] },
    { title: "TypeScript 5.5 リリースノート", date: "2026-04-08", tags: ["TypeScript"] },
    { title: "React 19 で変わること", date: "2026-04-05", tags: ["React"] },
  ].map((post) => (
    <ArticleCard key={post.title} variant="minimal" {...post} href="/blog" />
  ))}
</div>`,
      },
    ],
  },

  // ── Reading Progress ─────────────────────────────────────────────
  {
    name: "reading-progress",
    title: "Reading Progress",
    description: "ページのスクロール量に応じて進捗を表示する固定バー。ブログ記事の読了状況確認に便利。",
    category: "feedback",
    filePath: "registry/components/reading-progress.tsx",
    props: [
      { name: "color", type: '"primary" | "blue" | "green" | "purple" | "orange" | "pink"', default: '"primary"', description: "バーの色" },
      { name: "height", type: "number", default: "3", description: "バーの高さ（px）" },
      { name: "position", type: '"top" | "bottom"', default: '"top"', description: "バーの表示位置" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { ReadingProgress } from "@/components/ui/reading-progress"

export default function BlogLayout({ children }) {
  return (
    <>
      <ReadingProgress color="purple" />
      <main>{children}</main>
    </>
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<ReadingProgress color="primary" />`,
      },
      {
        label: "Colors",
        code: `<div className="space-y-2">
  {(["primary","blue","green","purple","orange","pink"] as const).map(color => (
    <div key={color} className="flex items-center gap-3">
      <span className="w-16 text-xs text-muted-foreground">{color}</span>
      <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
        <div className={
          color === "primary" ? "h-full w-3/4 bg-primary rounded-full" :
          color === "blue" ? "h-full w-3/4 bg-blue-500 rounded-full" :
          color === "green" ? "h-full w-3/4 bg-emerald-500 rounded-full" :
          color === "purple" ? "h-full w-3/4 bg-violet-500 rounded-full" :
          color === "orange" ? "h-full w-3/4 bg-orange-500 rounded-full" :
          "h-full w-3/4 bg-pink-500 rounded-full"
        } />
      </div>
    </div>
  ))}
</div>`,
      },
    ],
  },

  // ── Table of Contents ────────────────────────────────────────────
  {
    name: "table-of-contents",
    title: "Table of Contents",
    description: "記事内の見出しをナビゲートする目次コンポーネント。IntersectionObserver でスクロール位置と連動し、アクティブ項目をハイライト。",
    category: "navigation",
    filePath: "registry/components/table-of-contents.tsx",
    props: [
      { name: "items", type: "{ id: string; label: string; level?: 1 | 2 | 3 }[]", description: "目次項目の配列" },
      { name: "title", type: "string", default: '"目次"', description: "目次のタイトル" },
      { name: "activeId", type: "string", description: "外部から制御するアクティブID（省略時は自動検出）" },
      { name: "className", type: "string", description: "追加のCSSクラス" },
    ],
    usage: `import { TableOfContents } from "@/components/ui/table-of-contents"

export default function ArticlePage() {
  return (
    <div className="flex gap-8">
      <article className="flex-1">
        <h2 id="intro">はじめに</h2>
        <h2 id="setup">セットアップ</h2>
        <h3 id="install">インストール</h3>
        <h2 id="usage">使い方</h2>
      </article>
      <aside className="w-48">
        <TableOfContents
          items={[
            { id: "intro", label: "はじめに" },
            { id: "setup", label: "セットアップ" },
            { id: "install", label: "インストール", level: 2 },
            { id: "usage", label: "使い方" },
          ]}
        />
      </aside>
    </div>
  )
}`,
    examples: [
      {
        label: "Basic",
        code: `<TableOfContents
  items={[
    { id: "intro", label: "はじめに" },
    { id: "setup", label: "セットアップ" },
    { id: "install", label: "インストール", level: 2 },
    { id: "config", label: "設定", level: 2 },
    { id: "usage", label: "使い方" },
    { id: "examples", label: "サンプル", level: 2 },
  ]}
  className="w-48"
/>`,
      },
      {
        label: "With active item",
        code: `<TableOfContents
  activeId="setup"
  items={[
    { id: "intro", label: "はじめに" },
    { id: "setup", label: "セットアップ" },
    { id: "install", label: "インストール", level: 2 },
    { id: "usage", label: "使い方" },
  ]}
  className="w-48"
/>`,
      },
    ],
  },
];

export function getComponentByName(name: string): ComponentConfig | undefined {
  return components.find((c) => c.name === name);
}

export function getComponentsByCategory(): Record<ComponentCategory, ComponentConfig[]> {
  const result = {} as Record<ComponentCategory, ComponentConfig[]>;
  for (const comp of components) {
    if (!result[comp.category]) result[comp.category] = [];
    result[comp.category].push(comp);
  }
  return result;
}
