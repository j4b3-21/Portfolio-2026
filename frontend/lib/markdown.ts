import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/* Isomorphic markdown renderer — safe in server and client components. */
export function renderBody(body: string): string {
    const html = marked.parse(body, { async: false });
    return html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, lvl, inner) => {
        const id = inner
            .replace(/<[^>]+>/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
    });
}
