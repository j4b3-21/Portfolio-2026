"use client";

import { Suspense, lazy, useState, useEffect, Component, ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

const Scene = lazy(() => import("./SculptureScene"));

class SceneBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
    state = { failed: false };
    static getDerivedStateFromError() { return { failed: true }; }
    render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export function SculptureFallback() {
    return (
        <svg viewBox="0 0 420 420" className="w-full h-full" data-testid="sculpture-fallback" role="img" aria-label="Static orbital diagram">
            <g fill="none" strokeWidth="1">
                <ellipse cx="210" cy="210" rx="180" ry="66" transform="rotate(-24 210 210)" stroke="#25251F" opacity="0.7" />
                <ellipse cx="210" cy="210" rx="148" ry="54" transform="rotate(32 210 210)" stroke="#B9B5AA" />
                <ellipse cx="210" cy="210" rx="106" ry="40" transform="rotate(-72 210 210)" stroke="#25251F" opacity="0.5" />
            </g>
            <line x1="210" y1="210" x2="352" y2="112" stroke="#25251F" strokeWidth="0.6" opacity="0.35" />
            <line x1="210" y1="210" x2="86" y2="292" stroke="#25251F" strokeWidth="0.6" opacity="0.35" />
            <line x1="210" y1="210" x2="286" y2="330" stroke="#25251F" strokeWidth="0.6" opacity="0.35" />
            <circle cx="210" cy="210" r="34" fill="#25251F" />
            <circle cx="210" cy="210" r="44" fill="none" stroke="#25251F" strokeWidth="0.7" opacity="0.3" />
            <circle cx="352" cy="112" r="9" fill="#536BFA" />
            <circle cx="86" cy="292" r="6" fill="#25251F" />
            <circle cx="286" cy="330" r="5" fill="#82968A" />
        </svg>
    );
}

function webglAvailable(): boolean {
    try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
        return false;
    }
}

function lowPowerDevice(): boolean {
    if (typeof navigator === "undefined") return true;
    const nav = navigator as Navigator & { deviceMemory?: number };
    if (nav.deviceMemory !== undefined && nav.deviceMemory < 4) return true;
    if (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency < 4) return true;
    return false;
}

export default function Sculpture({ className = "" }: { className?: string }) {
    const reduce = useReducedMotion();
    /* null = still deciding (SSR + first paint show the static fallback);
       the scene mounts only after first paint, per the performance budget. */
    const [supported, setSupported] = useState<boolean | null>(null);

    useEffect(() => {
        setSupported(!reduce && !lowPowerDevice() && webglAvailable());
    }, [reduce]);

    if (supported !== true) {
        return (
            <div className={className} data-testid={supported === false ? "hero-orbital-sculpture-fallback" : "hero-orbital-sculpture-loading"}>
                <SculptureFallback />
            </div>
        );
    }

    return (
        <div className={className} data-testid="hero-orbital-sculpture">
            <SceneBoundary fallback={<SculptureFallback />}>
                <Suspense fallback={<SculptureFallback />}>
                    <Scene />
                </Suspense>
            </SceneBoundary>
        </div>
    );
}
