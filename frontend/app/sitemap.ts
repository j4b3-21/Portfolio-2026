import type { MetadataRoute } from "next";
import { getJournal, projectSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPaths = ["", "/work", "/journey", "/research", "/about", "/contact", "/resume"];
    return [
        ...staticPaths.map((p) => ({
            url: absoluteUrl(p || "/"),
            changeFrequency: "weekly" as const,
            priority: p === "" ? 1 : 0.8,
        })),
        ...projectSlugs().map((slug) => ({
            url: absoluteUrl(`/work/${slug}`),
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...getJournal({ includeDrafts: false }).map((entry) => ({
            url: absoluteUrl(`/journey/${entry.slug}`),
            lastModified: new Date(entry.date),
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
