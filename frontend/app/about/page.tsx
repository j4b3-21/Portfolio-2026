import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { getLeadership } from "@/lib/content";
import { PROFILE, DIMENSIONS, JOURNAL_YEARS, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "About",
    description: "Who I am, how I work, and what I'm still figuring out. Bhuvan M. Acharya, CS undergraduate at IIIT Tiruchirappalli.",
    alternates: { canonical: "/about" },
    openGraph: { url: absoluteUrl("/about") },
};

const IS_DEV = process.env.NODE_ENV === "development";
const FIGURING_OUT: string[] = [];

export default function About() {
    const leadership = getLeadership();
    return (
        <section className="pt-32 sm:pt-40 pb-24" data-testid="about-page" aria-label="About">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/75">The Archive / About</p>
                    <h1 className="mt-6 max-w-3xl font-serif font-normal text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.04]">
                        The person behind the archive<span className="text-electric">.</span>
                    </h1>
                </Reveal>

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 max-w-2xl">
                        {IS_DEV ? (
                            <div className="mb-10 slot-frame aspect-[4/5] max-w-[280px] flex items-center justify-center" data-testid="portrait-slot">
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/75 px-6 text-center">
                                    Portrait slot — /images/bhuvan.jpg
                                </p>
                            </div>
                        ) : null}

                        <Reveal>
                            <p className="text-lg sm:text-xl leading-relaxed text-ink/90">{PROFILE.description}</p>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-ink/85">
                                <p>
                                    Three questions organize everything on this site: <em>how does this actually work?</em> — answered
                                    by systems experiments like a filesystem on xv6. <em>What could I build with that?</em> — answered by
                                    CampusHire, NeuroWeave and BM4A. And <em>who else can I bring along?</em> — answered by a quantum
                                    club, a placement cell role and a web development community.
                                </p>
                            </div>
                        </Reveal>

                        <Reveal delay={0.12}>
                            <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85 pb-4 border-b border-ink/10">
                                Three dimensions
                            </h2>
                            <div className="mt-6 space-y-6">
                                {DIMENSIONS.map((d) => (
                                    <div key={d.id} data-testid={`about-dimension-${d.id}`} className="grid grid-cols-12 gap-4 items-baseline">
                                        <span className="col-span-2 sm:col-span-1 font-mono text-[11px] text-ink/75">{d.index}</span>
                                        <span className="col-span-10 sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-electric">
                                            {d.label}
                                        </span>
                                        <p className="col-span-12 sm:col-span-8 text-[14px] leading-relaxed text-ink/90">{d.text}</p>
                                    </div>
                                ))}
                            </div>
                        </Reveal>

                        {FIGURING_OUT.length > 0 ? <Reveal delay={0.16}>
                            <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85 pb-4 border-b border-ink/10">
                                What I'm still figuring out
                            </h2>
                            <ul className="mt-6 space-y-4">
                                <li className="flex gap-3 text-[14px] leading-relaxed text-ink/90">
                                    <span className="mt-[0.6em] w-3 h-px bg-electric shrink-0" />
                                    [Slot — the open questions you actually carry, in your words.]
                                </li>
                            </ul>
                        </Reveal> : null}
                    </div>

                    <aside className="lg:col-span-4 lg:col-start-9">
                        <Reveal delay={0.08}>
                            <div className="border border-ink/15 p-7">
                                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">Leadership</p>
                                <ul className="mt-5 space-y-5">
                                    {leadership.map((l) => (
                                        <li key={l.id} data-testid={`about-leadership-${l.id}`}>
                                            <p className="font-serif text-lg leading-snug">{l.org}</p>
                                            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/80">{l.role}</p>
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/journey" className="mt-7 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] link-sweep">
                                    Read the stories <ArrowUpRight size={11} />
                                </Link>
                            </div>
                        </Reveal>

                        <Reveal delay={0.14}>
                            <div className="mt-8 border border-ink/15 p-7">
                                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">Chapters ahead</p>
                                <ul className="mt-5 space-y-4">
                                    {JOURNAL_YEARS.slice(0, 2).map((y) => (
                                        <li key={y.year} className="flex items-baseline gap-4">
                                            <span className="font-serif text-xl">{y.year}</span>
                                            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80">{y.subtitle}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <div className="mt-8 bg-[#E9E7DD] border border-ink/10 p-7 print:hidden">
                                <p className="font-serif italic text-xl leading-snug text-ink/90">
                                    “{PROFILE.tagline}”
                                </p>
                                <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/80">
                                    The Archive — operating principle
                                </p>
                            </div>
                        </Reveal>
                    </aside>
                </div>
            </div>
        </section>
    );
}
