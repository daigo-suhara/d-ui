import { codeToHtml } from "shiki";
import { CopyButton } from "@/components/copy-button";

interface CodeBlockProps {
  code: string;
  lang?: string;
  showCopy?: boolean;
  className?: string;
}

export async function CodeBlock({
  code,
  lang = "tsx",
  showCopy = true,
  className,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang,
    theme: "github-dark-dimmed",
  });

  return (
    <div className={`group relative ${className ?? ""}`}>
      {showCopy && (
        <div className="absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
          <CopyButton value={code} />
        </div>
      )}
      <div
        className="overflow-auto rounded-lg text-sm [&>pre]:overflow-auto [&>pre]:p-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
