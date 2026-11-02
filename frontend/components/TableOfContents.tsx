"use client";

import { useEffect, useState } from "react";

export default function TableOfContents({ headings }: { headings: { id: string; label: string }[] }) {
    const [active, setActive] = useState(headings[0]?.id ?? "");
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
            { rootMargin: "-20% 0px -65% 0px" }
        );
        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });
        return () => observer.disconnect();
    }, [headings]);
    if (!headings.length) return null;
    return (
        <nav className="sticky top-28 font-mono text-[11px] uppercase tracking-[0.18em] leading-loose" aria-label="On this page">
            {headings.map((heading) => (
                <a key={heading.id} href={`#${heading.id}`} className={`block transition-colors ${active === heading.id ? "text-glowlow" : "text-cream/70 hover:text-cream"}`}>
                    {heading.label}
                </a>
            ))}
        </nav>
    );
}
