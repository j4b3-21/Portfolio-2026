import Markdown from "@/components/Markdown";
import Diagram from "@/components/diagrams";

export default function MarkdownWithDiagram({ body, dark = false, className = "" }: {
    body: string; dark?: boolean; className?: string;
}) {
    const parts = body.split("[[diagram]]");
    return (
        <div className={className}>
            <Markdown body={parts[0] ?? ""} dark={dark} />
            {parts.length > 1 && <Diagram slug={parts[1]?.trim().split("\n")[0] ?? ""} dark={dark} />}
            {parts.slice(2).length > 0 && <Markdown body={parts.slice(2).join("\n")} dark={dark} />}
        </div>
    );
}
