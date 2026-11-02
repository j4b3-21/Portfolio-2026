import Markdown from "@/components/Markdown";
import Diagram from "@/components/diagrams";

export default function MarkdownWithDiagram({ body, dark = false, className = "" }: {
    body: string; dark?: boolean; className?: string;
}) {
    const parts = body.split("[[diagram]]");
    return (
        <div className={className}>
            {parts.map((part, index) => {
                if (index === 0) return <Markdown key={index} body={part} dark={dark} />;
                const lines = part.trimStart().split("\n");
                const slug = lines.shift()?.trim() ?? "";
                return (
                    <div key={index}>
                        <Diagram slug={slug} dark={dark} />
                        <Markdown body={lines.join("\n")} dark={dark} />
                    </div>
                );
            })}
        </div>
    );
}
