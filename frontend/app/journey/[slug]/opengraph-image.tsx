import { makeOg } from "@/lib/og";
import { getJournalEntry } from "@/lib/content";

export const alt = "Journal entry — The Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = getJournalEntry(slug);
    return makeOg({
        title: entry ? entry.title : "Journal",
        sub: entry ? `${entry.category} — ${entry.date}` : "The Archive",
    });
}
