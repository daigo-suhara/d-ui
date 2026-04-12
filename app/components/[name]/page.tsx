import { notFound } from "next/navigation";
import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getComponentSource } from "@/lib/registry";
import {
	categoryLabels,
	components,
	getComponentByName,
} from "@/lib/registry-data";
import { ComponentPreviewClient } from "./preview-client";

interface PageProps {
	params: Promise<{ name: string }>;
}

export function generateStaticParams() {
	return components.map((c) => ({ name: c.name }));
}

export async function generateMetadata({ params }: PageProps) {
	const { name } = await params;
	const comp = getComponentByName(name);
	if (!comp) return {};
	return { title: `${comp.title} — dai/ui` };
}

export default async function ComponentPage({ params }: PageProps) {
	const { name } = await params;
	const comp = getComponentByName(name);
	if (!comp) notFound();

	const source = await getComponentSource(comp.filePath);
	const registryUrl = `https://ui.daigo-suhara.com/registry/${comp.name}.json`;
	const installCmd = `npx shadcn add ${registryUrl}`;

	const shikiOpts = { lang: "tsx", theme: "github-dark-dimmed" } as const;

	const [sourceHtml, usageHtml, ...exampleHtmls] = await Promise.all([
		codeToHtml(source, shikiOpts),
		codeToHtml(comp.usage, shikiOpts),
		...comp.examples.map((ex) => codeToHtml(ex.code, shikiOpts)),
	]);

	return (
		<div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
			{/* Header */}
			<div className="mb-6">
				<div className="flex items-center gap-2 mb-2.5">
					<Badge variant="secondary" className="text-xs">
						{categoryLabels[comp.category]}
					</Badge>
				</div>
				<h1 className="text-2xl font-bold tracking-tight mb-1.5">
					{comp.title}
				</h1>
				<p className="text-muted-foreground text-sm leading-relaxed">
					{comp.description}
				</p>
			</div>

			{/* Install command */}
			<div className="mb-8">
				<p className="text-xs font-semibold tracking-wide text-muted-foreground/60 mb-2">
					インストール
				</p>
				<div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2">
					<code className="flex-1 font-mono text-xs text-foreground/80 truncate">
						{installCmd}
					</code>
					<CopyButton value={installCmd} variant="text" />
				</div>
			</div>

			{/* Preview */}
			<section className="mb-8">
				<p className="text-xs font-semibold tracking-wide text-muted-foreground/60 mb-3">
					サンプル
				</p>
				<ComponentPreviewClient
					componentName={comp.name}
					examples={comp.examples.map((ex, i) => ({
						label: ex.label,
						code: ex.code,
						codeHtml: exampleHtmls[i],
					}))}
				/>
			</section>

			<Separator className="my-8" />

			{/* Usage */}
			<section className="mb-8">
				<h2 className="text-sm font-semibold mb-3">使い方</h2>
				<div className="group relative rounded-lg border overflow-hidden">
					<div className="absolute right-2 top-2 z-10 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
						<CopyButton value={comp.usage} />
					</div>
					<div
						className="[&>pre]:overflow-auto [&>pre]:p-3 [&>pre]:text-xs [&>pre]:leading-relaxed md:[&>pre]:p-4 md:[&>pre]:text-sm"
						dangerouslySetInnerHTML={{ __html: usageHtml }}
					/>
				</div>
			</section>

			{/* Props */}
			{comp.props.length > 0 && (
				<section className="mb-8">
					<h2 className="text-sm font-semibold mb-3">プロパティ</h2>

					{/* モバイル: カードリスト */}
					<div className="flex flex-col gap-2 md:hidden">
						{comp.props.map((prop) => {
							const isRequired = prop.default === undefined;
							return (
								<div key={prop.name} className="rounded-lg border border-border/60 bg-muted/20 p-3 space-y-2">
									<div className="flex items-center gap-2 flex-wrap">
										<code className="font-mono font-semibold text-sm text-foreground">{prop.name}</code>
										{isRequired ? (
											<span className="text-[9px] font-semibold px-1.5 py-px rounded border border-rose-500/40 text-rose-400 bg-rose-500/5 leading-none tracking-wide">
												必須
											</span>
										) : (
											<span className="text-[9px] font-medium px-1.5 py-px rounded border border-border text-muted-foreground/60 leading-none tracking-wide">
												任意
											</span>
										)}
									</div>
									<code className="block font-mono text-[11px] text-violet-400 bg-violet-500/8 px-2 py-1.5 rounded border border-violet-500/15 break-all leading-relaxed">
										{prop.type}
									</code>
									<p className="text-xs text-muted-foreground leading-relaxed">{prop.description}</p>
									{prop.default !== undefined && (
										<div className="flex items-center gap-1.5 text-xs text-muted-foreground">
											<span>デフォルト:</span>
											<code className="font-mono text-[11px] bg-muted px-1.5 py-0.5 rounded">{prop.default}</code>
										</div>
									)}
								</div>
							);
						})}
					</div>

					{/* デスクトップ: テーブル */}
					<div className="hidden md:block rounded-xl border overflow-hidden">
						<table className="w-full text-xs border-collapse">
							<thead>
								<tr className="bg-muted/40 border-b border-border/60">
									<th className="pl-3 pr-1 py-2 w-[34px]"></th>
									<th className="px-2 py-2 text-left font-medium text-muted-foreground/70 w-[120px]">
										名前
									</th>
									<th className="px-3 py-2 text-left font-medium text-muted-foreground/70">
										型
									</th>
									<th className="px-3 py-2 text-left font-medium text-muted-foreground/70 w-[110px]">
										デフォルト
									</th>
									<th className="px-3 py-2 text-left font-medium text-muted-foreground/70">
										説明
									</th>
								</tr>
							</thead>
							<tbody>
								{comp.props.map((prop, i) => {
									const isRequired = prop.default === undefined;
									return (
										<tr
											key={prop.name}
											className={[
												"hover:bg-muted/20 transition-colors",
												i < comp.props.length - 1
													? "border-b border-border/40"
													: "",
											].join(" ")}
										>
											{/* バッジ */}
											<td className="pl-3 pr-1 py-2.5 align-top">
												{isRequired ? (
													<span className="text-[9px] font-semibold px-1 py-px rounded border border-rose-500/40 text-rose-400 bg-rose-500/5 leading-none tracking-wide whitespace-nowrap">
														必須
													</span>
												) : (
													<span className="text-[9px] font-medium px-1 py-px rounded border border-border text-muted-foreground/60 leading-none tracking-wide whitespace-nowrap">
														任意
													</span>
												)}
											</td>
											{/* 名前 */}
											<td className="px-2 py-2.5 align-top">
												<code className="font-mono font-semibold text-foreground text-[12px]">
													{prop.name}
												</code>
											</td>
											{/* 型 */}
											<td className="px-3 py-2.5 align-top">
												<code className="inline font-mono text-[11px] text-violet-400 bg-violet-500/8 px-1.5 py-0.5 rounded border border-violet-500/15 break-all leading-relaxed">
													{prop.type}
												</code>
											</td>
											{/* デフォルト */}
											<td className="px-3 py-2.5 align-top">
												{prop.default !== undefined ? (
													<code className="font-mono text-[11px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
														{prop.default}
													</code>
												) : (
													<span className="text-muted-foreground/30">—</span>
												)}
											</td>
											{/* 説明 */}
											<td className="px-3 py-2.5 align-top text-muted-foreground leading-relaxed">
												{prop.description}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</section>
			)}

			{/* Source */}
			<section>
				<h2 className="text-sm font-semibold mb-3">ソースコード</h2>
				<div className="group relative rounded-lg border overflow-hidden">
					<div className="absolute right-2 top-2 z-10 opacity-100 md:opacity-0 md:transition-opacity md:group-hover:opacity-100">
						<CopyButton value={source} />
					</div>
					<div
						className="[&>pre]:overflow-auto [&>pre]:max-h-[360px] [&>pre]:p-3 [&>pre]:text-xs [&>pre]:leading-relaxed md:[&>pre]:max-h-[500px] md:[&>pre]:p-4 md:[&>pre]:text-sm"
						dangerouslySetInnerHTML={{ __html: sourceHtml }}
					/>
				</div>
			</section>
		</div>
	);
}
