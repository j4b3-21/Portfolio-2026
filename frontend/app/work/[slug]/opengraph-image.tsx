import { makeOg } from "@/lib/og";
import { getProject } from "@/lib/content";

export const alt = "Case study — The Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = getProject(slug);
    return makeOg({
        title: p ? p.title : "Case study",
        sub: p ? p.tagline : "The Archive",
    });
}
