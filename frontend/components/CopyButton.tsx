"use client";

import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ value, label }: { value: string; label: string }) {
    const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const onCopy = async () => {
        try {
            if (navigator.clipboard) await navigator.clipboard.writeText(value);
            else {
                const textarea = document.createElement("textarea");
                textarea.value = value;
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                if (!document.execCommand("copy")) throw new Error("copy failed");
                textarea.remove();
            }
            setStatus("copied");
            if (timer.current) clearTimeout(timer.current);
            timer.current = setTimeout(() => setStatus("idle"), 2000);
        } catch {
            setStatus("failed");
        }
    };

    return (
        <button
            data-testid={`copy-${label.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onCopy}
            aria-label={`Copy ${label}`}
            className="inline-flex items-center gap-1.5 p-2 text-ink/70 hover:text-electric transition-colors"
        >
            {status === "copied" ? <Check size={15} className="text-electric" /> : <Copy size={15} />}
            <span aria-live="polite" className="font-mono text-[11px] uppercase tracking-[0.15em] w-14 text-left">
                {status === "copied" ? "Copied ✓" : status === "failed" ? "Copy failed" : ""}
            </span>
        </button>
    );
}
