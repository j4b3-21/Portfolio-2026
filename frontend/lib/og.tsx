import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

const serifFont = fs.readFileSync(path.join(process.cwd(), "assets/fonts/InstrumentSerif-Regular.ttf"));
const monoFont = fs.readFileSync(path.join(process.cwd(), "assets/fonts/IBMPlexMono-Regular.ttf"));

export const ogFonts = [
    { name: "Serif", data: serifFont, weight: 400 as const, style: "normal" as const },
    { name: "Mono", data: monoFont, weight: 400 as const, style: "normal" as const },
];

export function makeOg({ title, sub }: { title: string; sub?: string }) {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: "#F1EEE7",
                    padding: 64,
                    position: "relative",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 22, background: "#25251F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 16, height: 16, borderRadius: 8, background: "#F1EEE7" }} />
                    </div>
                    <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: "0.2em", color: "#25251F" }}>
                        BHUVAN M. ACHARYA — THE ARCHIVE
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ width: 88, height: 6, background: "#536BFA", marginBottom: 28 }} />
                    <div style={{ fontFamily: "Serif", fontSize: title.length > 60 ? 68 : 92, lineHeight: 1.02, color: "#25251F", maxWidth: 1020 }}>
                        {title}
                    </div>
                    {sub ? (
                        <div style={{ fontFamily: "Mono", fontSize: 24, letterSpacing: "0.08em", color: "rgba(37,37,31,0.75)", marginTop: 24 }}>
                            {sub}
                        </div>
                    ) : null}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Mono", fontSize: 20, letterSpacing: "0.15em", color: "rgba(37,37,31,0.75)" }}>
                    <div>AN ONGOING EXPLORATION OF TECHNOLOGY, SYSTEMS AND IDEAS</div>
                    <div>© 2026</div>
                </div>
            </div>
        ),
        { width: 1200, height: 630, fonts: ogFonts }
    );
}
