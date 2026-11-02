import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProjectCover } from "@/components/covers";
import type { Project } from "@/lib/content";

export default function ProjectRow({ project, index, flip = false }: { project: Project; index: number; flip?: boolean }) {
    const num = String(index + 1).padStart(2, "0");
    const statusLabel = project.status.toUpperCase();

    return (
        <Reveal>
            <article
                data-testid={`project-card-${project.slug}`}
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center py-10 md:py-14"
            >
                <div className={`relative md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                    <Link href={`/work/${project.slug}`} data-testid={`project-preview-${project.slug}`} aria-label={`Open case study: ${project.title}`} className="block">
                        <div className="relative aspect-[16/10] overflow-hidden border border-ink/14 bg-[#FAF8F5]">
                            {project.cover === "screenshot" && project.og ? (
                                <Image
                                    src={project.og}
                                    alt={`${project.title} — ${project.imageCaption ?? "product screenshot"}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                    className="object-contain"
                                />
                            ) : (
                                <ProjectCover variant={project.cover} title={project.title} spec={project.stack.slice(0, 3).join(" · ")} />
                            )}
                        </div>
                        {project.imageCaption ? (
                            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70">
                                {project.imageCaption}
                            </p>
                        ) : null}
                    </Link>
                </div>

                <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink/70">
                        P.{num} — {statusLabel} · {project.year}
                    </p>
                    <Link href={`/work/${project.slug}`} className="mt-3 block">
                        <h3 className="font-serif font-normal text-3xl sm:text-4xl leading-tight transition-colors duration-300 group-hover:text-electric">
                            {project.title}
                        </h3>
                    </Link>
                    <p className="mt-4 text-[15px] leading-relaxed text-ink/80">{project.tagline}</p>
                    {project.contribution ? (
                        <p className="mt-4 text-[13px] leading-relaxed text-ink/70">
                            <span className="font-mono text-[9px] uppercase tracking-[0.22em] mr-2 text-ink/70">Team</span>
                            {project.contribution}
                        </p>
                    ) : null}

                    <div className="mt-7 flex flex-wrap items-center gap-5">
                        <Link
                            href={`/work/${project.slug}`}
                            data-testid={`project-open-${project.slug}`}
                            className="inline-flex items-center gap-2 bg-ink text-paper px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-electric"
                        >
                            Open case study
                            <ArrowUpRight size={12} />
                        </Link>
                        {project.repo ? (
                            <a
                                href={project.repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-testid={`project-repo-${project.slug}`}
                                className="link-sweep inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/85"
                            >
                                GitHub <ArrowUpRight size={11} />
                            </a>
                        ) : null}
                    </div>
                </div>
            </article>
        </Reveal>
    );
}
