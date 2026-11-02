import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Hero from "@/components/Hero";
import ProjectRow from "@/components/ProjectRow";
import JournalTimeline from "@/components/JournalTimeline";
import { Reveal, SectionHead } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import CopyButton from "@/components/CopyButton";
import { getProjects, getJournal, getLeadership, IS_DEV } from "@/lib/content";
import { PROFILE, DIMENSIONS, CAPABILITIES, RESEARCH_AREAS, JOURNAL_YEARS, CHANNELS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: `${PROFILE.name} — The Archive`,
    description: PROFILE.description,
    alternates: { canonical: "/" },
};

const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    description: PROFILE.description,
    email: `mailto:${PROFILE.email}`,
    affiliation: { "@type": "CollegeOrUniversity", name: PROFILE.institution },
    url: absoluteUrl("/"),
    sameAs: [PROFILE.github, PROFILE.linkedin],
    jobTitle: "Software engineer (student)",
    alumniOf: { "@type": "CollegeOrUniversity", name: PROFILE.institution },
};

export default function Home() {
    const projects = getProjects();
    const journal = getJournal();
    const leadership = getLeadership();
    const featured = projects.filter((p) => p.featured).slice(0, 3);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
            <Hero />

            <section className="py-20 md:py-28" data-testid="intro-section" aria-label="Introduction">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <SectionHead index="01" label="Introduction" />
                    <Reveal>
                        <h2 className="mt-8 max-w-4xl font-serif font-normal text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.18]">
                            I like understanding how things work, then building something with that understanding.
                        </h2>
                    </Reveal>
                    <div className="mt-16">
                        {DIMENSIONS.map((d, i) => (
                            <Reveal key={d.id} delay={i * 0.06}>
                                <div
                                    data-testid={`dimension-badge-${d.id}`}
                                    className="group grid grid-cols-12 gap-4 items-baseline hairline-t py-7 sm:py-9 transition-colors duration-300 hover:bg-[#ECE9E0]"
                                >
                                    <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-ink/75 pl-1 sm:pl-2">{d.index}</span>
                                    <span className="col-span-10 sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.18em] text-electric">{d.label}</span>
                                    <p className="col-span-12 sm:col-span-7 text-[15px] sm:text-lg leading-relaxed text-ink/85 transition-transform duration-500 group-hover:translate-x-1">
                                        {d.text}
                                    </p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="pb-20 md:pb-28" data-testid="work-section" aria-label="Selected work">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div>
                            <SectionHead index="02" label="Selected work" />
                            <Reveal>
                                <h2 className="mt-8 font-serif font-normal text-3xl sm:text-4xl">Things I've built.</h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.08}>
                            <Link href="/work" data-testid="work-view-all" className="link-sweep font-mono text-[11px] uppercase tracking-[0.22em]">
                                View the full archive
                            </Link>
                        </Reveal>
                    </div>
                    <div className="mt-10">
                        {featured.map((p, i) => (
                            <ProjectRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28" data-testid="capabilities-section" aria-label="Engineering capabilities">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div>
                            <SectionHead index="03" label="Engineering capabilities" />
                            <Reveal>
                                <h2 className="mt-8 font-serif font-normal text-3xl sm:text-4xl">What I work with.</h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.08}>
                            <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80">
                            </div>
                        </Reveal>
                    </div>

                    <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-ink/10 border border-ink/10">
                        {CAPABILITIES.map((g, gi) => (
                            <Reveal key={g.id} delay={gi * 0.05} className="bg-paper">
                                <div data-testid={`capability-group-${g.id}`} className="p-7 h-full">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/75 pb-4 border-b border-ink/10">
                                        {g.id === "emerging" ? "EXPLORING" : g.label}
                                    </p>
                                    <ul className="mt-5 space-y-3.5">
                                        {g.items.map((it) => (
                                            <li key={it.name} className="text-[15px] text-ink/90">
                                                <span className="flex items-center gap-3">
                                                    {it.name}
                                                </span>
                                                {it.projects.length > 0 ? (
                                                    <span className="block mt-1 ml-[19px] font-mono text-[11px] uppercase tracking-[0.12em] text-ink/70 leading-relaxed">
                                                        →{" "}
                                                        {it.projects.slice(0, 2).map((slug, i) => (
                                                            <span key={slug}>
                                                                <Link href={`/work/${slug}`} className="hover:text-electric transition-colors">
                                                                    {projects.find((project) => project.slug === slug)?.title ?? slug}
                                                                </Link>
                                                                {i < Math.min(it.projects.length, 2) - 1 ? ", " : ""}
                                                            </span>
                                                        ))}
                                                        {it.projects.length > 2 ? ` +${it.projects.length - 2}` : ""}
                                                    </span>
                                                ) : null}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-void text-cream py-20 md:py-28" data-testid="research-teaser-section" aria-label="Research and exploration">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <SectionHead index="04" label="Research & exploration" tone="dark" />
                    <Reveal>
                        <h2 className="mt-8 max-w-3xl font-serif font-normal text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.18]">
                            Some questions are worth exploring beyond the boundaries of what we already know.
                        </h2>
                    </Reveal>
                    <div className="mt-16">
                        {RESEARCH_AREAS.map((r, i) => (
                            <Reveal key={r.id} delay={i * 0.06}>
                                <Link
                                    href={`/research#${r.id}`}
                                    data-testid={`research-teaser-${r.id}`}
                                    className="group grid grid-cols-12 gap-4 items-baseline border-t border-cream/15 py-7 sm:py-9 transition-colors duration-300 hover:bg-white/[0.03]"
                                >
                                    <span className="col-span-3 sm:col-span-1 font-mono text-[11px] text-glowlow pl-1">{r.index}</span>
                                    <h3 className="col-span-9 sm:col-span-4 font-serif font-normal text-xl sm:text-2xl leading-snug transition-colors group-hover:text-glowlow">
                                        {r.title}
                                    </h3>
                                    <p className="col-span-10 col-start-2 sm:col-span-6 sm:col-start-7 text-[14px] leading-relaxed text-cream/85">
                                        {r.blurb}
                                    </p>
                                    <ArrowUpRight
                                        size={18}
                                        className="hidden sm:block col-span-1 justify-self-end self-start text-cream/70 transition-all duration-300 group-hover:text-glowlow group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    />
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 md:py-28 bg-[#E9E7DD]" data-testid="leadership-section" aria-label="Leadership and community">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <SectionHead index="05" label="Leadership & community" />
                    <Reveal>
                        <h2 className="mt-8 max-w-3xl font-serif font-normal text-[clamp(1.7rem,3.4vw,2.6rem)] leading-[1.18]">
                            Starting things — and bringing people along.
                        </h2>
                    </Reveal>

                    {leadership.map((l, i) => (
                        <LeadershipStory key={l.id} entry={l} index={i} />
                    ))}
                </div>
            </section>

            {journal.length >= 3 ? <section className="py-20 md:py-28" data-testid="journal-section" aria-label="The journal">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                        <div>
                            <SectionHead index="06" label="The journal" />
                            <Reveal>
                                <h2 className="mt-8 font-serif font-normal text-3xl sm:text-4xl">A life in progress.</h2>
                            </Reveal>
                        </div>
                        <Reveal delay={0.08}>
                            <Link href="/journey" data-testid="journal-view-all" className="link-sweep font-mono text-[11px] uppercase tracking-[0.22em]">
                                Open the journal
                            </Link>
                        </Reveal>
                    </div>
                    <Reveal className="mt-12">
                        <JournalTimeline entries={journal} years={JOURNAL_YEARS} />
                    </Reveal>
                </div>
            </section> : null}

            <section className="py-20 md:py-28" data-testid="contact-section" aria-label="Contact">
                <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                    <SectionHead index={journal.length >= 3 ? "07" : "06"} label="Contact" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
                        <div className="lg:col-span-7">
                            <Reveal>
                                <h2 className="font-serif font-normal text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.12]">
                                    Open to ideas, collaborations and conversations.
                                </h2>
                            </Reveal>
                            <Reveal delay={0.08}>
                                <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/85">
                                    Whether it's research, engineering, open source or an interesting idea worth exploring, I'm always
                                    open to meaningful conversations.
                                </p>
                            </Reveal>
                        </div>
                        <div className="lg:col-span-5">
                            <Reveal delay={0.12}>
                                <ChannelRows />
                            </Reveal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

function LeadershipStory({ entry, index }: { entry: ReturnType<typeof getLeadership>[number]; index: number }) {
    if (entry.lead) {
        return (
            <Reveal delay={0.06} className="mt-14">
                <div data-testid={`leadership-${entry.id}`} className="border border-ink/15 bg-paper p-7 sm:p-12 relative">
                    <span className="absolute top-0 left-0 h-full w-1 bg-electric" aria-hidden="true" />
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-7">
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="font-mono text-[11px] uppercase tracking-[0.22em] bg-ink text-paper px-2.5 py-1.5">{entry.kind}</span>
                                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">{entry.role}</span>
                            </div>
                            <h3 className="mt-5 font-serif font-normal text-3xl sm:text-4xl leading-tight">{entry.org}</h3>
                            {entry.body ? <div className="mt-6 max-w-xl [&_p]:text-ink/85"><Markdown body={entry.body} /></div> : null}
                        </div>
                        <div className="lg:col-span-5">
                            <ul className="border-t border-ink/15">
                                {entry.facts.map((f, i) => (
                                    <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink/85 py-3 border-b border-ink/10">
                                        <span className="font-mono text-[11px] text-electric pt-0.5">M{i + 1}</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            {IS_DEV ? <div className="mt-6 slot-frame aspect-[16/10] hidden md:flex items-center justify-center" data-testid={`leadership-photo-slot-${entry.id}`}>
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 px-6 text-center">
                                    Photo slot — /images/quantum-club/ [photographs to be added]
                                </p>
                            </div> : null}
                        </div>
                    </div>
                </div>
            </Reveal>
        );
    }
    if (index === 1) {
        return (
            <Reveal delay={0.06} className="mt-8">
                <div data-testid={`leadership-${entry.id}`} className="grid grid-cols-1 md:grid-cols-12 border border-ink/15 bg-paper">
                    <div className="md:col-span-5 p-7 sm:p-9 border-b md:border-b-0 md:border-r border-ink/15">
                        <span className="font-mono text-[11px] uppercase tracking-[0.22em] border border-ink/30 px-2.5 py-1.5 text-ink/85">{entry.kind}</span>
                        <h3 className="mt-5 font-serif font-normal text-2xl sm:text-3xl leading-tight">{entry.org}</h3>
                        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">{entry.role}</p>
                    </div>
                    <div className="md:col-span-7 p-7 sm:p-9">
                        <ul className="space-y-2.5">
                            {entry.facts.map((f, i) => (
                                <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink/85">
                                    <span className="mt-[0.55em] w-3 h-px bg-electric shrink-0" />
                                    {f}
                                </li>
                            ))}
                        </ul>
                        {entry.body ? <div className="mt-6 [&_p]:text-ink/85"><Markdown body={entry.body} /></div> : null}
                    </div>
                </div>
            </Reveal>
        );
    }
    return (
        <Reveal delay={0.06} className="mt-8">
            <div data-testid={`leadership-${entry.id}`} className="border border-ink/15 bg-paper p-7 sm:p-9">
                <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] border border-ink/30 px-2.5 py-1.5 text-ink/85">{entry.kind}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">{entry.role}</span>
                </div>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <h3 className="md:col-span-4 font-serif font-normal text-2xl leading-tight">{entry.org}</h3>
                    <ul className="md:col-span-4 space-y-2.5">
                        {entry.facts.map((f, i) => (
                            <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink/85">
                                <span className="mt-[0.55em] w-3 h-px bg-electric shrink-0" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    {entry.body ? <div className="md:col-span-4 [&_p]:text-ink/85"><Markdown body={entry.body} /></div> : null}
                </div>
            </div>
        </Reveal>
    );
}

function ChannelRows() {
    return (
        <div data-testid="contact-channels">
            {CHANNELS.map((c) => (
                <div key={c.id} className="hairline-t" data-testid={`contact-channel-${c.id}`}>
                    <div className="grid grid-cols-12 gap-3 items-baseline py-6 sm:py-7">
                        <span className="col-span-4 sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/75">
                            {c.label}
                        </span>
                        <span className="col-span-6 sm:col-span-7 text-base sm:text-xl font-serif">
                            {c.internal ? (
                                <Link href={c.href} data-testid={`contact-link-${c.id}`} className="link-sweep hover:text-electric transition-colors">
                                    {c.value}
                                </Link>
                            ) : (
                                <a
                                    href={c.href}
                                    target={c.href.startsWith("mailto") ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    data-testid={`contact-link-${c.id}`}
                                    className="link-sweep hover:text-electric transition-colors inline-flex items-center gap-2"
                                >
                                    {c.value} <ArrowUpRight size={15} className="inline" />
                                </a>
                            )}
                        </span>
                        <span className="col-span-2 justify-self-end">
                            {c.id === "email" ? <CopyButton value={c.copyValue ?? c.value} label={c.label} /> : null}
                        </span>
                    </div>
                </div>
            ))}
            <div className="hairline-t" />
        </div>
    );
}
