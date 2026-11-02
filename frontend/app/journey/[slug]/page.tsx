import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Markdown from "@/components/Markdown";
import { Reveal } from "@/components/Reveal";
import { getJournalEntry, getJournal, renderMarkdown } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
    return getJournal().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const entry = getJournalEntry(slug);
    if (!entry) return {};
    return {
        title: entry.title,
        description: `${entry.category} — ${entry.title}. From the journal of Bhuvan M. Acharya.`,
        alternates: { canonical: `/journey/${entry.slug}` },
        openGraph: {
            url: absoluteUrl(`/journey/${entry.slug}`),
            type: "article",
            title: entry.title,
            description: `${entry.category} — ${entry.title}`,
            publishedTime: entry.date,
        },
        twitter: { card: "summary_large_image", title: entry.title },
    };
}

export default async function JourneyDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: paramsSlug } = await params;
    const entry = getJournalEntry(paramsSlug);
    if (!entry) notFound();

    const d = new Date(`${entry.date}T00:00:00`);
    const dateLabel = d.toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: entry.title,
        datePublished: entry.date,
        author: { "@type": "Person", name: "Bhuvan M. Acharya" },
        url: absoluteUrl(`/journey/${entry.slug}`),
    };

    return (
        <article className="pt-32 sm:pt-40 pb-24" data-testid="journey-article">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <Reveal>
                        <Link
                            href="/journey"
                            data-testid="article-back-link"
                            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/85 hover:text-electric transition-colors"
                        >
                            <ArrowLeft size={12} /> The journal
                        </Link>
                        <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/85">
                            <span>{dateLabel}</span>
                            <span>/</span>
                            <span>{entry.category}</span>
                        </div>
                        <h1 className="mt-6 font-serif font-normal text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05]">{entry.title}</h1>
                        {entry.tags?.length ? (
                            <div className="mt-6 flex flex-wrap gap-2">
                                {entry.tags.map((t) => (
                                    <span key={t} className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink/80 border border-ink/20 px-2.5 py-1">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </Reveal>

                    <Reveal delay={0.08} className="mt-12">
                        <Markdown body={entry.body} />
                    </Reveal>

                    {entry.related?.length ? (
                        <Reveal delay={0.12} className="mt-14 border-t border-ink/10 pt-8">
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/85">Related projects</p>
                            <div className="mt-5 flex flex-wrap gap-3">
                                {entry.related.map((s) => (
                                    <Link
                                        key={s}
                                        href={`/work/${s}`}
                                        className="inline-flex items-center gap-1.5 border border-ink/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] hover:border-electric hover:text-electric transition-colors"
                                    >
                                        {s} <ArrowUpRight size={11} />
                                    </Link>
                                ))}
                            </div>
                        </Reveal>
                    ) : null}
                </div>
            </div>
        </article>
    );
}
