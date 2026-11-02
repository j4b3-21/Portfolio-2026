export const EASE = [0.16, 1, 0.3, 1] as const;

export function prefersReducedMotion(): boolean {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
