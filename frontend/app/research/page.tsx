import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import Markdown from "@/components/Markdown";
import { getResearch } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "Research & Exploration",
    description: "Three open threads: AI/ML, quantum computing, and reproducibility in computational research.",
    alternates: { canonical: "/research" },
    openGraph: { url: absoluteUrl("/research") },
};

export default function Research() {
    const areas = getResearch();
    return (
        <section className="bg-void text-cream min-h-screen pt-32 sm:pt-40 pb-24" data-testid="research-page" aria-label="Research and exploration">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cream/85">
                        The Archive / Research & Exploration
                    </p>
                    <h1 className="mt-6 max-w-4xl font-serif font-normal text-[clamp(2.2rem,5vw,3.8rem)] leading-[1.08]">
                        Some questions are worth exploring beyond the boundaries of what we already know
                        <span className="text-glowlow">.</span>
                    </h1>
                </Reveal>

                <div className="mt-20">
                    {areas.map((a, i) => (
                        <Reveal key={a.slug} delay={i * 0.04} className="border-t border-cream/15">
                            <section id={a.slug} data-testid={`research-area-${a.slug}`} className="py-14">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                    <div className="lg:col-span-4">
                                        <p className="font-mono text-[11px] tracking-[0.25em] text-glowlow">{a.index}</p>
                                        <h2 className="mt-4 font-serif font-normal text-2xl sm:text-3xl leading-snug">{a.title}</h2>
                                        <span className="mt-5 inline-block font-mono text-[9px] uppercase tracking-[0.22em] border border-cream/30 text-cream/90 px-2.5 py-1.5">
                                            {a.status}
                                        </span>
                                        {a.concepts?.length ? (
                                            <div className="mt-8">
                                                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-cream/85 mb-3">
                                                    Concepts I'm studying
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {a.concepts.map((c) => (
                                                        <span key={c} className="font-mono text-[9px] uppercase tracking-[0.16em] bg-surface border border-cream/15 px-2.5 py-1.5 text-cream/90">
                                                            {c}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ) : null}
                                        {a.repos?.length ? (
                                            <div className="mt-8">
                                                <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-cream/85 mb-3">Code</p>
                                                {a.repos.map((r) => (
                                                    <a
                                                        key={r.href}
                                                        href={r.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block font-mono text-[11px] text-cream/90 hover:text-glowlow transition-colors mt-2"
                                                    >
                                                        {r.label}
                                                    </a>
                                                ))}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="lg:col-span-7 lg:col-start-6 max-w-3xl">
                                        <Markdown body={a.body} dark />
                                    </div>
                                </div>
                            </section>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
