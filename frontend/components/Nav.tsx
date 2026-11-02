"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { CHANNELS, NAV_LINKS } from "@/lib/site";
import { EASE } from "@/lib/motion";

export function Mark({ className = "w-7 h-7" }: { className?: string }) {
    return (
        <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
            <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="currentColor" strokeWidth="1.3" transform="rotate(-24 16 16)" />
            <ellipse cx="16" cy="16" rx="13" ry="5.2" fill="none" stroke="#536BFA" strokeWidth="1.3" transform="rotate(38 16 16)" />
            <circle cx="16" cy="16" r="3.4" fill="currentColor" />
            <circle cx="25.6" cy="8.6" r="1.9" fill="#536BFA" />
        </svg>
    );
}

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const dark = pathname.startsWith("/work/") || pathname === "/research";
    const reduce = useReducedMotion();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 30);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setOpen(false); }, [pathname]);
    useEffect(() => {
        document.body.style.overflow = open ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    const isActive = (to: string) =>
        to === "/" ? pathname === "/" : pathname.startsWith(to);

    const barTone = open || dark ? "text-cream" : "text-ink";

    return (
        <header
            data-testid="site-nav"
            className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 print:hidden ${
                open
                    ? "bg-transparent border-b border-transparent"
                    : dark
                        ? scrolled
                            ? "bg-void/90 backdrop-blur-md border-b border-cream/15"
                            : "bg-transparent border-b border-transparent"
                        : scrolled
                            ? "bg-paper/95 backdrop-blur-md border-b border-ink/10"
                            : "bg-transparent border-b border-transparent"
            }`}
        >
            <div
                className={`relative z-10 max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between transition-all duration-500 ${
                    scrolled ? "h-14" : "h-20"
                } ${barTone}`}
            >
                <Link href="/" data-testid="nav-logo" className="flex items-center gap-3 group" aria-label="The Archive — home">
                    <Mark className="w-7 h-7 transition-transform duration-700 ease-out group-hover:rotate-[150deg]" />
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] leading-[1.35]">
                        Bhuvan M. Acharya
                        <br />
                        <span className="opacity-60">The Archive</span>
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-9" aria-label="Primary">
                    {NAV_LINKS.map((l) => (
                        <Link
                            key={l.to}
                            href={l.to}
                            data-testid={`nav-link-${l.label.toLowerCase()}`}
                            data-active={isActive(l.to)}
                            className={`link-sweep font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                                isActive(l.to)
                                    ? dark ? "text-glowlow" : "text-electric"
                                    : dark ? "text-cream/85 hover:text-cream" : "text-ink/75 hover:text-ink"
                            }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>

                <button
                    data-testid="nav-menu-toggle"
                    className="md:hidden p-2 -mr-2 transition-colors"
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                    aria-expanded={open}
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        data-testid="mobile-menu"
                        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="md:hidden fixed inset-0 top-0 bg-void text-cream flex flex-col justify-between pt-28 pb-10 px-6"
                    >
                        <nav className="flex flex-col" aria-label="Mobile">
                            {NAV_LINKS.map((l, i) => (
                                <motion.div
                                    key={l.to}
                                    initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.08 + i * 0.07, ease: EASE }}
                                >
                                    <Link
                                        href={l.to}
                                        data-testid={`mobile-nav-link-${l.label.toLowerCase()}`}
                                        className="flex items-baseline justify-between py-4 border-b border-cream/10"
                                    >
                                        <span className={`font-serif text-4xl ${isActive(l.to) ? "text-glowlow" : ""}`}>
                                            {l.label}
                                        </span>
                                        <span className="font-mono text-[11px] text-cream/70">0{i + 1}</span>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.45, duration: 0.5 }}
                            className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-cream/70"
                        >
                            <span>An ongoing exploration</span>
                            <a href={CHANNELS.find((channel) => channel.id === "github")?.href} className="flex items-center gap-1 text-cream" target="_blank" rel="noopener noreferrer">
                                GitHub <ArrowUpRight size={12} />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
