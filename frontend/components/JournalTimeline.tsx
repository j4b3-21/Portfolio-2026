"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowUpRight } from "lucide-react";
import Markdown from "@/components/Markdown";
import { EASE } from "@/lib/motion";
import type { JournalEntry } from "@/lib/content";

function EntryRow({ entry, open, onToggle }: { entry: JournalEntry; open: boolean; onToggle: () => void }) {
    const d = new Date(`${entry.date}T00:00:00`);
    const dateLabel = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();
    return (
        <div className="hairline-t" data-testid={`journal-entry-${entry.slug}`}>
            <button
                data-testid={`journal-toggle-${entry.slug}`}
                onClick={onToggle}
                aria-expanded={open}
                aria-controls={`journal-body-${entry.slug}`}
                className="w-full grid grid-cols-12 gap-3 sm:gap-4 items-baseline py-6 sm:py-7 text-left group"
            >
                <span className="col-span-12 sm:col-span-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/75">
                    <span>{dateLabel}</span>
                    {entry.status === "draft" ? (
                        <span className="border border-ink/40 px-1.5 py-0.5 text-[11px] text-ink/75">Draft</span>
                    ) : null}
                </span>
                <span className="col-span-10 sm:col-span-7 font-serif font-normal text-xl sm:text-2xl leading-snug group-hover:text-electric transition-colors">
                    {entry.title}
                </span>
                <span className="col-span-2 sm:col-span-2 justify-self-end flex items-center gap-3">
                    <span className="hidden sm:inline font-mono text-[11px] uppercase tracking-[0.2em] text-ink/75">
                        {entry.category}
                    </span>
                    <Plus
                        size={18}
                        aria-hidden="true"
                        className={`transition-transform duration-500 ${open ? "rotate-45 text-electric" : "text-ink/70"}`}
                    />
                </span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`journal-body-${entry.slug}`}
                        data-testid={`journal-entry-body-${entry.slug}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [...EASE] }}
                        className="overflow-hidden"
                    >
                        <div className="pb-9 sm:pl-[25%]">
                            <div className="max-w-2xl">
                                <Markdown body={entry.body} />
                            </div>
                            {entry.related?.length ? (
                                <div className="mt-6 flex flex-wrap gap-3">
                                    {entry.related.map((slug) => (
                                        <Link
                                            key={slug}
                                            href={`/work/${slug}`}
                                            className="inline-flex items-center gap-1.5 border border-ink/25 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80 hover:border-electric hover:text-electric transition-colors"
                                        >
                                            {slug} <ArrowUpRight size={10} />
                                        </Link>
                                    ))}
                                </div>
                            ) : null}
                            <Link
                                href={`/journey/${entry.slug}`}
                                data-testid={`journal-read-${entry.slug}`}
                                className="mt-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink link-sweep"
                            >
                                Read as article <ArrowUpRight size={11} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function JournalTimeline({ entries, years }: {
    entries: JournalEntry[];
    years: { year: number; subtitle: string }[];
}) {
    const [openId, setOpenId] = useState<string | null>(null);
    return (
        <div data-testid="journal-timeline">
            {years.map(({ year, subtitle }) => {
                const yearEntries = entries.filter((e) => e.year === year);
                if (yearEntries.length === 0) return null;
                return (
                    <div key={year} className="mb-14" data-testid={`journal-year-${year}`}>
                        <div className="flex flex-wrap items-baseline gap-4 mb-6">
                            <h3 className="font-serif font-normal text-4xl sm:text-5xl">{year}</h3>
                            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/75">{subtitle}</p>
                        </div>
                        <div className="border-t border-ink/10">
                            {yearEntries.map((e) => (
                                <EntryRow
                                    key={e.slug}
                                    entry={e}
                                    open={openId === e.slug}
                                    onToggle={() => setOpenId(openId === e.slug ? null : e.slug)}
                                />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
