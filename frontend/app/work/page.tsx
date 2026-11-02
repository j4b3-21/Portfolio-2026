import type { Metadata } from "next";
import Link from "next/link";
import ProjectRow from "@/components/ProjectRow";
import { Reveal } from "@/components/Reveal";
import { getProjects } from "@/lib/content";
import { PROFILE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "Work",
    description: "Selected engineering work: research tooling, placement infrastructure, platform foundations and systems experiments.",
    alternates: { canonical: "/work" },
    openGraph: { url: absoluteUrl("/work") },
};

export default function Work() {
    const projects = getProjects();
    return (
        <section className="pt-32 sm:pt-40 pb-20" data-testid="work-index" aria-label="Work archive">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/75">The Archive / Work</p>
                    <h1 className="mt-6 font-serif font-normal text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
                        Work<span className="text-electric">.</span>
                    </h1>
                    <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ink/85">
                        Every case study opens into the problem, the architecture and the outcome.
                    </p>
                </Reveal>
                <div className="mt-8">
                    {projects.map((p, i) => (
                        <ProjectRow key={p.slug} project={p} index={i} flip={i % 2 === 1} />
                    ))}
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/70">
                    {projects.length} projects — {PROFILE.institution} and beyond
                </p>
            </div>
        </section>
    );
}
