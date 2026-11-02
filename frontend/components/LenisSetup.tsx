"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { prefersReducedMotion } from "@/lib/motion";

function scrollTop() {
    const w = window as unknown as { __lenis?: Lenis | null };
    if (w.__lenis) w.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
}

export default function LenisSetup() {
    const pathname = usePathname();

    useEffect(() => {
        if (prefersReducedMotion()) return undefined;
        const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
        (window as unknown as { __lenis?: Lenis | null }).__lenis = lenis;
        let raf = 0;
        const loop = (t: number) => {
            lenis.raf(t);
            raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => {
            cancelAnimationFrame(raf);
            lenis.destroy();
            (window as unknown as { __lenis?: Lenis | null }).__lenis = null;
        };
    }, []);

    useEffect(() => {
        scrollTop();
    }, [pathname]);

    return null;
}
