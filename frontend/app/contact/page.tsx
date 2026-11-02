import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import CopyButton from "@/components/CopyButton";
import { CHANNELS, PROFILE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
    title: "Contact",
    description: "Open to ideas, collaborations and conversations — research, engineering, open source, or an interesting idea worth exploring.",
    alternates: { canonical: "/contact" },
    openGraph: { url: absoluteUrl("/contact") },
};

export default function Contact() {
    return (
        <section className="pt-32 sm:pt-40 pb-24 min-h-[80vh]" data-testid="contact-page" aria-label="Contact">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <Reveal>
                    <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/75">The Archive / Contact</p>
                    <h1 className="mt-6 max-w-3xl font-serif font-normal text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.04]">
                        Open to ideas, collaborations and conversations<span className="text-electric">.</span>
                    </h1>
                    <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ink/90">
                        Whether it's research, engineering, open source or an interesting idea worth exploring, I'm always open to
                        meaningful conversations.
                    </p>
                </Reveal>

                <Reveal delay={0.1} className="mt-14 max-w-3xl" data-testid="contact-channels">
                    {CHANNELS.map((c) => (
                        <div key={c.id} className="hairline-t" data-testid={`contact-channel-${c.id}`}>
                            <div className="grid grid-cols-12 gap-3 items-baseline py-6 sm:py-7">
                                <span className="col-span-4 sm:col-span-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink/75">
                                    {c.label}
                                </span>
                                <span className="col-span-6 sm:col-span-7 text-base sm:text-2xl font-serif">
                                    {c.internal ? (
                                        <Link href={c.href} data-testid={`contact-link-${c.id}`} className="link-sweep hover:text-electric transition-colors">
                                            {c.value}
                                        </Link>
                                    ) : (
                                        <a
                                            href={c.href}
                                            target={c.href.startsWith("mailto") ? undefined : "_blank"}
                                            rel="noopener noreferrer"
                                            data-testid={`contact-link-${c.id}`}
                                            className="link-sweep hover:text-electric transition-colors inline-flex items-center gap-2"
                                        >
                                            {c.value} <ArrowUpRight size={16} className="inline" />
                                        </a>
                                    )}
                                </span>
                                <span className="col-span-2 justify-self-end">
                                    {c.id === "email" ? <CopyButton value={c.copyValue ?? c.value} label={c.label} /> : null}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="hairline-t" />
                </Reveal>
            </div>
        </section>
    );
}
