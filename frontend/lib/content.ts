import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";
import { renderBody } from "@/lib/markdown";

const CONTENT_ROOT = path.join(process.cwd(), "content");

/* Drafts are visible only in development; production renders published entries only. */
export const IS_DEV = process.env.NODE_ENV === "development";
const PLACEHOLDER_PATTERN = /\[[^\]]*(slot|to be (added|filled|written|confirmed)|your (story|reflection|closing)|photographs)[^\]]*\]/gi;
const warnedPlaceholderFiles = new Set<string>();

export function stripPlaceholders(text: string): string {
    return text
        .replace(PLACEHOLDER_PATTERN, "")
        .replace(/^\s*\*Draft[^*\n]*\*?\s*$/gim, "")
        .split("\n")
        .filter((line) => {
            const trimmed = line.replace(/^(\s*[-*+]\s+|\s*\d+\.\s+)/, "").trim();
            return trimmed.length > 0;
        })
        .join("\n")
        .replace(/\s+with\s*([,.!?]|$)/gi, "$1")
        .replace(/\s{2,}/g, " ")
        .trim();
}

function contentText(text: string): string {
    return IS_DEV ? text : stripPlaceholders(text);
}

function parseDoc(raw: string, slug: string) {
    const { data, content } = matter(raw);
    if ((PLACEHOLDER_PATTERN.test(raw) || /^\s*\*Draft/m.test(raw)) && !warnedPlaceholderFiles.has(`${slug}`)) {
        console.warn(`[content] placeholders remain in ${slug}`);
        warnedPlaceholderFiles.add(slug);
        PLACEHOLDER_PATTERN.lastIndex = 0;
    }
    return { data, body: contentText(content.trim()), slug };
}

function loadDir<S extends z.ZodTypeAny>(dir: string, schema: S): z.output<S>[] {
    const full = path.join(CONTENT_ROOT, dir);
    if (!fs.existsSync(full)) return [];
    const docs: z.output<S>[] = [];
    for (const file of fs.readdirSync(full)) {
        if (!/\.mdx?$/.test(file)) continue;
        try {
            const raw = fs.readFileSync(path.join(full, file), "utf8");
            const { data, body, slug } = parseDoc(raw, file.replace(/\.mdx?$/, ""));
            docs.push(schema.parse({ ...data, slug, body }) as z.output<S>);
        } catch (e) {
            console.error(`[content] failed to parse ${dir}/${file}:`, e instanceof Error ? e.message : e);
        }
    }
    return docs;
}

function render(body: string): string {
    return renderBody(body);
}

/* ---------- schemas ---------- */

const projectSchema = z.object({
    title: z.string().min(2),
    slug: z.string().min(2),
    tagline: z.string().min(10),
    year: z.string(),
    role: z.string().default(""),
    status: z.enum(["active", "shipped", "experiment"]).default("active"),
    featured: z.boolean().default(false),
    stack: z.array(z.string()).default([]),
    repo: z.string().url().optional().nullable(),
    demo: z.string().url().optional().nullable(),
    demoLabel: z.string().default("Project demo"),
    og: z.string().optional().nullable(),
    imageCaption: z.string().optional().nullable(),
    cover: z.enum(["screenshot", "bm4a", "ptfs", "offline", "atrang"]).default("screenshot"),
    contribution: z.string().default(""),
    outcome: z.string().default(""),
    body: z.string(),
});
export type Project = z.infer<typeof projectSchema>;

const journalSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(2),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    category: z.string().min(3),
    type: z.enum(["milestone", "article", "reflection", "note"]).default("note"),
    year: z.number().int().min(2024).max(2030),
    featured: z.boolean().default(false),
    status: z.enum(["draft", "published"]).default("draft"),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    body: z.string(),
});
export type JournalEntry = z.infer<typeof journalSchema>;

const researchSchema = z.object({
    title: z.string().min(3),
    slug: z.string().min(2),
    index: z.string().default("R.00"),
    status: z.enum(["exploring", "active"]).default("exploring"),
    concepts: z.array(z.string()).default([]),
    repos: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
    body: z.string(),
});
export type ResearchEntry = z.infer<typeof researchSchema>;

const leadershipSchema = z.object({
    id: z.string().min(2),
    org: z.string().min(3),
    role: z.string().min(3),
    kind: z.string().min(3),
    lead: z.boolean().default(false),
    facts: z.array(z.string()).default([]),
    body: z.string(),
});
export type LeadershipEntry = z.infer<typeof leadershipSchema>;

/* ---------- accessors ---------- */

const byDateDesc = (a: JournalEntry, b: JournalEntry) => (a.date < b.date ? 1 : -1);

export function getProjects(): Project[] {
    const priority: Record<string, number> = { campushire: 0, neuroweave: 1, bm4a: 2 };
    return loadDir("projects", projectSchema).map((project) => ({
        ...project,
        role: contentText(project.role),
        contribution: contentText(project.contribution),
        outcome: contentText(project.outcome),
    })).sort(
        (a, b) => (priority[a.slug] ?? 99) - (priority[b.slug] ?? 99) || a.slug.localeCompare(b.slug)
    );
}

export function getProject(slug: string): Project | undefined {
    return getProjects().find((p) => p.slug === slug);
}

export function getJournal({ includeDrafts = IS_DEV } = {}): JournalEntry[] {
    const entries = loadDir("journal", journalSchema);
    return entries
        .filter((e) => includeDrafts || e.status === "published")
        .sort(byDateDesc);
}

export function getJournalEntry(slug: string, { includeDrafts = IS_DEV } = {}): JournalEntry | undefined {
    return getJournal({ includeDrafts }).find((e) => e.slug === slug);
}

export function getResearch(): ResearchEntry[] {
    const order = ["ai-ml", "quantum-computing", "reproducibility"];
    return loadDir("research", researchSchema).sort(
        (a, b) => order.indexOf(a.slug) - order.indexOf(b.slug)
    );
}

export function getLeadership(): LeadershipEntry[] {
    const order = ["quantum-club", "tp-cell", "webdev-club"];
    return loadDir("leadership", leadershipSchema).map((entry) => ({
        ...entry,
        facts: entry.facts.map(contentText).filter(Boolean),
        body: contentText(entry.body),
    })).sort(
        (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
    );
}

export function renderMarkdown(entry: { body: string }): string {
    return render(entry.body);
}

export function groupByYear(entries: JournalEntry[], years: { year: number; subtitle: string }[]) {
    return years.map(({ year, subtitle }) => ({
        year,
        subtitle,
        entries: entries.filter((e) => e.year === year),
    })).filter((group) => group.entries.length > 0);
}

export function projectSlugs(): string[] {
    return getProjects().map((p) => p.slug);
}

export function publishedJournalSlugs(): string[] {
    return getJournal({ includeDrafts: false }).map((e) => e.slug);
}
