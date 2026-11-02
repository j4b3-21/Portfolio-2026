import { renderBody } from "@/lib/markdown";

export default function Markdown({ body, dark = false, className = "" }: {
    body: string; dark?: boolean; className?: string;
}) {
    let html = body;
    try {
        html = renderBody(body).replace(
            /\[[^\]]*(slot|to be (added|filled|written|confirmed)|your (story|reflection|closing)|photographs)[^\]]*\]/gi,
            '<mark class="placeholder-mark">$&</mark>'
        );
    } catch {
        html = `<p>${body}</p>`;
    }
    return (
        <div
            className={`md-body ${dark ? "md-body--dark" : ""} ${className}`}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
