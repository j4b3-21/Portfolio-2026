import Link from "next/link";

export default function NotFound() {
    return (
        <section className="pt-40 pb-24 min-h-[70vh]" data-testid="not-found-page" aria-label="Page not found">
            <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink/85">404 — Unwritten</p>
                <h1 className="mt-6 font-serif font-normal text-[clamp(2.4rem,5.5vw,4rem)] leading-tight max-w-2xl">
                    This page hasn't been written yet<span className="text-electric">.</span>
                </h1>
                <p className="mt-6 max-w-md text-[15px] text-ink/90">
                    Some chapters of the archive are still blank. This just isn't one of them.
                </p>
                <Link
                    href="/"
                    data-testid="not-found-home-link"
                    className="mt-10 inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] hover:bg-electric transition-colors"
                >
                    Back to the archive
                </Link>
            </div>
        </section>
    );
}
