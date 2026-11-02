import type { Metadata } from "next";
import { Download } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { getProjects, getLeadership } from "@/lib/content";
import { PROFILE, CAPABILITIES, EXPERIENCE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "Résumé",
    description: "Curriculum vitae of Bhuvan M. Acharya — education, leadership, projects and skills.",
    alternates: { canonical: "/resume" },
    openGraph: { url: absoluteUrl("/resume") },
};

export default function Resume() {
    const projects = getProjects();
    const leadership = getLeadership();
    return (
        <section className="pt-32 sm:pt-40 pb-24 print:pt-0 print:pb-0 print-sheet" data-testid="resume-page" aria-label="Résumé">
            <div className="max-w-[900px] mx-auto px-5 sm:px-8">
                <Reveal>
                    <div className="flex flex-wrap items-start justify-between gap-6 hairline-b pb-8 print:hidden">
                        <div>
                            <h1 className="font-serif font-normal text-4xl sm:text-5xl">{PROFILE.name}</h1>
                            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/85 leading-loose">
                                {PROFILE.degree} — {PROFILE.institution} — {PROFILE.klass} — {PROFILE.location}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <a
                                href="/resume.pdf"
                                download
                                data-testid="resume-download-button"
                                className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-electric transition-colors"
                            >
                                <Download size={13} /> Download PDF
                            </a>
                        </div>
                    </div>
                    {/* on-print header */}
                    <div className="hidden print:block">
                        <h1 className="font-serif text-3xl">{PROFILE.name}</h1>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]">
                            {PROFILE.degree} — {PROFILE.institution} — {PROFILE.klass}
                        </p>
                        <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]">
                            {PROFILE.email} · {PROFILE.linkedinLabel} · {PROFILE.github.replace(/^https?:\/\//, "")}
                        </p>
                    </div>
                </Reveal>

                <Reveal delay={0.05}>
                    <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85 leading-loose print:hidden">
                        Contact:{" "}
                        <a href={`mailto:${PROFILE.email}`} className="link-sweep text-electric">{PROFILE.email}</a>
                        {" · "}
                        <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="link-sweep text-electric">{PROFILE.linkedinLabel}</a>
                        {" · "}
                        <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="link-sweep text-electric">{PROFILE.github.replace(/^https?:\/\//, "")}</a>
                    </p>
                </Reveal>

                <Reveal delay={0.1}>
                    <Section title="Education">
                        <Row left={PROFILE.institution} mid="B.Tech, Computer Science & Engineering — Class of 2028" right="2024 – 2028" />
                    </Section>

                    <Section title="Experience">
                        {EXPERIENCE.map((entry) => (
                            <div key={`${entry.organization}-${entry.title}`} className="mb-6" data-testid={`resume-experience-${entry.organization.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                                <Row left={entry.organization} mid={entry.title} right={entry.period} />
                                <p className="mt-1 text-[12px] text-ink/90">{entry.location ? `${entry.location} — ` : ""}{entry.summary}</p>
                                <ul className="mt-2 space-y-1">
                                    {entry.bullets.slice(0, 4).map((bullet) => <Bullet key={bullet}>{bullet}</Bullet>)}
                                </ul>
                            </div>
                        ))}
                    </Section>

                    <Section title="Leadership">
                        {leadership.map((l) => (
                            <div key={l.id} className="mb-4" data-testid={`resume-leadership-${l.id}`}>
                                <Row left={l.org} mid={l.role} right="" />
                                <ul className="mt-1.5">
                                    {l.facts.slice(0, 3).map((f, i) => (
                                        <Bullet key={i}>{f}</Bullet>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </Section>

                    <Section title="Projects">
                        {projects.map((p) => (
                            <div key={p.slug} className="mb-3.5" data-testid={`resume-project-${p.slug}`}>
                                <Row left={p.title} mid={p.tagline} right={p.repo ? "repository" : ""} href={p.repo ?? undefined} />
                                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-ink/85">
                                    {p.stack.slice(0, 6).join(" · ")}
                                </p>
                            </div>
                        ))}
                    </Section>

                    <Section title="Skills">
                        {CAPABILITIES.map((g) => (
                            <div key={g.id} className="mb-3">
                                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/85">
                                    {g.label}{g.id === "emerging" ? " (exploring)" : ""}
                                </p>
                                <p className="mt-1 text-[13px] text-ink/95">
                                    {g.items.map((i) => i.name).join(" · ")}
                                </p>
                            </div>
                        ))}
                    </Section>
                </Reveal>
            </div>
        </section>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mt-8">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85 pb-2.5 border-b border-ink/20">{title}</h2>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function Row({ left, mid, right, href }: { left: string; mid: string; right: string; href?: string }) {
    return (
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <p className="text-[14px] font-medium text-ink">{left}</p>
            {mid ? <p className="flex-1 min-w-[200px] text-[12px] text-ink/95">{mid}</p> : null}
            {right ? (
                href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] uppercase tracking-[0.18em] text-electric link-sweep">
                        {right}
                    </a>
                ) : (
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/85">{right}</p>
                )
            ) : null}
        </div>
    );
}

function Bullet({ children }: { children: React.ReactNode }) {
    return (
        <li className="flex gap-3 text-[12px] leading-relaxed text-ink/95">
            <span className="mt-[0.6em] w-2.5 h-px bg-electric shrink-0" />
            {children}
        </li>
    );
}
