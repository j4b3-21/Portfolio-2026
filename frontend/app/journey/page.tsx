import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import JournalTimeline from "@/components/JournalTimeline";
import { getJournal, groupByYear } from "@/lib/content";
import { JOURNAL_YEARS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "The Journal — a life in progress",
    description: "A chronological archive of milestones, technical articles, reflections and learning notes.",
    alternates: { canonical: "/journey" },
    openGraph: { url: absoluteUrl("/journey") },
};

export default function Journey() {
    const journal = getJournal();
    const groups = groupByYear(journal, JOURNAL_YEARS);
    return (
        <section className="pt-32 sm:pt-40 pb-24" data-testid="journey-page" aria-label="The journal">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/75">The Archive / Journal</p>
                    <h1 className="mt-6 font-serif font-normal text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
                        A life in progress<span className="text-electric">.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/85">
                        An evolving chronological record — milestones, technical articles, reflections and learning notes,
                        newest first.
                    </p>
                </Reveal>
                <Reveal delay={0.08} className="mt-16">
                    <JournalTimeline entries={journal} years={JOURNAL_YEARS} />
                </Reveal>
            </div>
        </section>
    );
}
