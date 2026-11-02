import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROFILE, CHANNELS, NAV_LINKS } from "@/lib/site";
import { Mark } from "@/components/Nav";

export default function Footer() {
    return (
        <footer className="border-t border-ink/10 bg-paper print:hidden" data-testid="site-footer">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                    <div className="md:col-span-6">
                        <div className="flex items-center gap-3 text-ink">
                            <Mark className="w-9 h-9" />
                            <span className="font-serif text-3xl">{PROFILE.name}</span>
                        </div>
                        <p className="mt-5 max-w-sm text-ink/75 leading-relaxed">
                            {PROFILE.tagline} Computer Science at {PROFILE.institution}, {PROFILE.klass}.
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 mb-5">Navigate</p>
                        <ul className="space-y-3">
                            {NAV_LINKS.map((l) => (
                                <li key={l.to}>
                                    <Link
                                        href={l.to}
                                        data-testid={`footer-link-${l.label.toLowerCase()}`}
                                        className="link-sweep text-sm text-ink/80 hover:text-ink"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70 mb-5">Elsewhere</p>
                        <ul className="space-y-3">
                            {CHANNELS.filter((c) => !c.internal).map((c) => (
                                <li key={c.id}>
                                    <a
                                        href={c.href}
                                        target={c.href.startsWith("mailto") ? undefined : "_blank"}
                                        rel="noopener noreferrer"
                                        data-testid={`footer-link-${c.id}`}
                                        className="link-sweep text-sm text-ink/80 hover:text-ink inline-flex items-center gap-1"
                                    >
                                        {c.label} <ArrowUpRight size={12} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70">
                    <span data-testid="footer-brand">The Archive</span>
                    <span data-testid="footer-copyright">© {new Date().getFullYear()} {PROFILE.name}</span>
                </div>
            </div>
        </footer>
    );
}
