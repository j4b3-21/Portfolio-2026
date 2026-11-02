import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LenisSetup from "@/components/LenisSetup";
import Plausible from "@/components/Plausible";
import { PROFILE, SITE_URL } from "@/lib/site";

const serif = Instrument_Serif({ weight: "400", style: ["normal", "italic"], subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: `${PROFILE.name} — The Archive`,
        template: `%s — ${PROFILE.name}`,
    },
    description: PROFILE.description,
    openGraph: {
        title: `${PROFILE.name} — The Archive`,
        description: PROFILE.description,
        type: "website",
        siteName: "The Archive",
    },
    twitter: {
        card: "summary_large_image",
        title: `${PROFILE.name} — The Archive`,
        description: PROFILE.description,
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
            <body className="grain">
                <a href="#main" className="skip-link print-hidden">Skip to content</a>
                <LenisSetup />
                <Nav />
                <main id="main">{children}</main>
                <Footer />
                <Plausible />
            </body>
        </html>
    );
}
