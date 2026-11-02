import type { MetadataRoute } from "next";
import { projectSlugs, publishedJournalSlugs } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();
    const staticPaths = ["", "/work", "/journey", "/research", "/about", "/contact", "/resume"];
    return [
        ...staticPaths.map((p) => ({
            url: absoluteUrl(p || "/"),
            lastModified: now,
            changeFrequency: "weekly" as const,
            priority: p === "" ? 1 : 0.8,
        })),
        ...projectSlugs().map((slug) => ({
            url: absoluteUrl(`/work/${slug}`),
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.7,
        })),
        ...publishedJournalSlugs().map((slug) => ({
            url: absoluteUrl(`/journey/${slug}`),
            lastModified: now,
            changeFrequency: "monthly" as const,
            priority: 0.6,
        })),
    ];
}
