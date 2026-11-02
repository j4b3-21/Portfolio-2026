"use client";

import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Sculpture from "@/components/Sculpture";
import { MaskedLines, EASE, prefersReducedMotion } from "@/components/Reveal";
import { PROFILE } from "@/lib/site";

const META = [
    { label: "Degree", value: "B.Tech Computer Science & Engineering" },
    { label: "Institution", value: "IIIT Tiruchirappalli" },
    { label: "Class", value: "2028" },
    { label: "Based in", value: "India" },
];

export default function Hero() {
    const reduce = prefersReducedMotion();
    return (
        <section className="relative bg-cols overflow-hidden" data-testid="hero-section" aria-label="Introduction">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 lg:pt-36 pb-14 lg:pb-16 min-h-[92svh] flex flex-col">
                <div className="relative flex-1 flex items-center">
                    <div className="relative z-10 max-w-full lg:max-w-[60%]">
                        <motion.p
                            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.1, ease: [...EASE] }}
                            className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/75"
                        >
                            An ongoing exploration of technology, systems and ideas
                        </motion.p>

                        <MaskedLines
                            as="h1"
                            delay={0.25}
                            className="mt-6 font-serif font-normal text-[clamp(3.1rem,9.2vw,8.75rem)] leading-[0.98] tracking-[-0.01em]"
                            lines={[
                                <span key="a">Building things.</span>,
                                <span key="b" className="italic">
                                    Exploring <span className="text-electric">ideas.</span>
                                </span>,
                            ]}
                        />

                        <motion.p
                            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.62, ease: [...EASE] }}
                            className="mt-7 max-w-md text-[15px] sm:text-base leading-relaxed text-ink/85"
                        >
                            {PROFILE.description}
                        </motion.p>

                        <motion.div
                            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.74, ease: [...EASE] }}
                            className="mt-9 flex flex-wrap items-center gap-6"
                        >
                            <Link
                                href="/work"
                                data-testid="hero-cta-work"
                                className="group inline-flex items-center gap-2 bg-ink text-paper px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 hover:bg-electric"
                            >
                                Explore my work
                                <ArrowDown size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                            </Link>
                            <Link
                                href="/journey"
                                data-testid="hero-cta-journal"
                                className="link-sweep font-mono text-[11px] uppercase tracking-[0.2em] text-ink"
                            >
                                Read my journal
                            </Link>
                        </motion.div>
                    </div>

                    <div
                        className="relative mt-12 lg:mt-0 lg:absolute lg:right-[-6%] lg:top-1/2 lg:-translate-y-1/2 w-[88%] sm:w-[70%] lg:w-[48%] aspect-square"
                        aria-hidden="false"
                    >
                        <Sculpture className="absolute inset-0" />
                    </div>
                </div>

                <motion.div
                    initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.9 }}
                >
                    <div className="grid grid-cols-2 sm:grid-cols-4 hairline-t">
                        {META.map((m) => (
                            <div key={m.label} className="pt-4 pr-4">
                                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/75">{m.label}</p>
                                <p className="mt-1.5 text-sm text-ink/90">{m.value}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
