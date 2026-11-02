"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onCopy = () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(value).then(() => {
            setCopied(true);
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <button
            data-testid={`copy-${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onCopy}
            aria-label={`Copy ${label}`}
            className="inline-flex items-center gap-1.5 p-2 text-ink/70 hover:text-electric transition-colors"
        >
            {copied ? <Check size={15} className="text-electric" /> : <Copy size={15} />}
            <span aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.15em] w-14 text-left">
                {copied ? "Copied ✓" : ""}
            </span>
        </button>
    );
}
