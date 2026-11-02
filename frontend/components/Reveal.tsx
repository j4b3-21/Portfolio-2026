"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { EASE, prefersReducedMotion } from "@/lib/motion";

export { EASE, prefersReducedMotion };

export function Reveal({ children, delay = 0, y = 24, className = "", once = true }: {
    children: ReactNode; delay?: number; y?: number; className?: string; once?: boolean;
}) {
    const reduce = useReducedMotion();
    return (
        <motion.div
            className={className}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y }}
            whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.01, margin: "0px 0px 8% 0px" }}
            transition={{ duration: 0.8, delay, ease: [...EASE] }}
        >
            {children}
        </motion.div>
    );
}

export function MaskedLines({ lines, className = "", delay = 0, as: Tag = "h1" }: {
    lines: ReactNode[]; className?: string; delay?: number; as?: keyof HTMLElementTagNameMap;
}) {
    const reduce = useReducedMotion();
    const T = Tag as "h1";
    return (
        <T className={className}>
            {lines.map((line, i) => (
                <span className="mask-line" key={i}>
                    <motion.span
                        initial={reduce ? { y: 0, opacity: 1 } : { y: "112%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1.05, delay: delay + i * 0.13, ease: [...EASE] }}
                    >
                        {line}
                    </motion.span>
                </span>
            ))}
        </T>
    );
}

export function SectionHead({ index, label, tone = "light", className = "" }: {
    index: string; label: string; tone?: "light" | "dark"; className?: string;
}) {
    return (
        <Reveal className={className}>
            <p className={`font-mono text-[11px] uppercase tracking-[0.25em] ${tone === "dark" ? "text-cream/70" : "text-ink/70"}`}>
                {index} <span className={tone === "dark" ? "text-glowlow" : "text-electric"}>/</span> {label}
            </p>
        </Reveal>
    );
}
