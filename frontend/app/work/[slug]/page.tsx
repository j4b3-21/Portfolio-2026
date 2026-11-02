import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import MarkdownWithDiagram from "@/components/MarkdownWithDiagram";
import { Reveal } from "@/components/Reveal";
import { getProject, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import TableOfContents from "@/components/TableOfContents";

export function generateStaticParams() {
    return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const p = getProject(slug);
    if (!p) return {};
    return {
        title: `Work: ${p.title}`,
        description: p.tagline,
        alternates: { canonical: `/work/${p.slug}` },
        openGraph: { url: absoluteUrl(`/work/${p.slug}`), title: p.title, description: p.tagline, images: p.og ? [{ url: p.og }] : undefined },
        twitter: { card: "summary_large_image", title: p.title, description: p.tagline },
    };
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug: paramsSlug } = await params;
    const projects = getProjects();
    const p = getProject(paramsSlug);
    if (!p) notFound();

    const idx = projects.findIndex((x) => x.slug === p.slug);
    const next = projects[(idx + 1) % projects.length];
    const metaColumns = 2 + Number(Boolean(p.repo)) + Number(Boolean(p.demo));
    const headings = [...p.body.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
        label: match[1].trim().replace(/[*`]/g, ""),
        id: match[1].trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: p.title,
        description: p.tagline,
        author: "Bhuvan M. Acharya",
        codeRepository: p.repo ?? undefined,
        url: absoluteUrl(`/work/${p.slug}`),
    };

    return (
        <article className="bg-void text-cream min-h-screen" data-testid="case-study-page">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 pb-20">
                <Link
                    href="/work"
                    data-testid="case-back-link"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/85 hover:text-glowlow transition-colors"
                >
                    <ArrowLeft size={12} /> All work
                </Link>

                <Reveal>
                    <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cream/85">
                        <span className="text-glowlow">Case study</span>
                        <span>/</span>
                        <span>{p.year}</span>
                        <span>/</span>
                        <span>{p.status}</span>
                    </div>
                    <h1 className="mt-5 font-serif font-normal text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] max-w-4xl">
                        {p.title}
                    </h1>
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/85">{p.tagline}</p>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className={`mt-12 grid grid-cols-2 ${metaColumns === 4 ? "md:grid-cols-4" : metaColumns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"} gap-6 border-b border-cream/15 pb-8`}>
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Role</p>
                            <p className="mt-2 text-sm text-cream/90 leading-relaxed">{p.role}</p>
                        </div>
                        <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Stack</p>
                            <p className="mt-2 text-sm text-cream/90 leading-relaxed">{p.stack.join(" · ")}</p>
                        </div>
                        {p.repo ? <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Source</p>
                            <a
                                href={p.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="case-repo-link"
                                className="mt-2 inline-flex items-center gap-1.5 text-sm text-cream hover:text-glowlow transition-colors link-sweep"
                            >
                                GitHub <ArrowUpRight size={12} />
                            </a>
                        </div> : null}
                        {p.demo ? <div>
                            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Live demo</p>
                            <a
                                href={p.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid="case-demo-link"
                                className="mt-2 inline-flex items-center gap-1.5 text-sm hover:text-glowlow transition-colors link-sweep"
                            >
                                {p.demoLabel} <ArrowUpRight size={12} />
                            </a>
                        </div> : null}
                    </div>
                </Reveal>

                {p.og ? (
                    <Reveal delay={0.12}>
                        <div className="mt-10 border border-cream/15 bg-surface overflow-hidden">
                            <div className="relative w-full aspect-[16/9]">
                                <Image
                                    src={p.og}
                                    alt={`${p.title} — ${p.imageCaption ?? "product screenshot"}`}
                                    fill
                                    priority
                                    sizes="(max-width: 1440px) 100vw, 1200px"
                                    className="object-contain"
                                />
                            </div>
                        </div>
                        {p.imageCaption ? (
                            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">{p.imageCaption}</p>
                        ) : null}
                    </Reveal>
                ) : null}

                <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <div className="hidden lg:block lg:col-span-3">
                        <TableOfContents headings={headings} />
                    </div>
                    <div className="lg:col-span-8 max-w-3xl">
                        <MarkdownWithDiagram body={p.body} dark />
                    </div>
                </div>

                <div className="mt-20 border-t border-cream/15 pt-10" data-testid="case-outcome">
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Outcome</p>
                    <p className="mt-4 max-w-3xl font-serif text-xl sm:text-2xl leading-snug text-cream/90">{p.outcome}</p>
                    <div className="mt-8 flex flex-wrap gap-4">
                        {p.demo ? (
                            <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-cream text-void px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-glowlow hover:text-cream transition-colors">
                                {p.demoLabel} <ArrowUpRight size={11} />
                            </a>
                        ) : null}
                        {p.repo ? (
                            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-cream/30 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] hover:border-glowlow hover:text-glowlow transition-colors">
                                Repository <ArrowUpRight size={11} />
                            </a>
                        ) : null}
                    </div>
                </div>

                <div className="mt-24 border-t border-cream/15 pt-10">
                    <Link href={`/work/${next.slug}`} data-testid="case-next-link" className="group block">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-cream/85">Next case study</p>
                        <p className="mt-3 font-serif text-3xl sm:text-5xl group-hover:text-glowlow transition-colors">
                            {next.title} <ArrowUpRight size={26} className="inline ml-2" />
                        </p>
                    </Link>
                </div>
            </div>
        </article>
    );
}
