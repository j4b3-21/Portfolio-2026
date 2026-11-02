/* Original project covers drawn in the site palette — no GitHub branding. */

export function ProjectCover({ variant, title, spec }: {
    variant: "bm4a" | "ptfs" | "offline" | "atrang" | "screenshot";
    title: string;
    spec: string;
}) {
    return (
        <svg
            viewBox="0 0 800 500"
            className="w-full h-full"
            role="img"
            aria-label={`${title} — illustrated cover`}
            preserveAspectRatio="xMidYMid meet"
        >
            <rect width="800" height="500" fill="#FAF8F5" />
            <g stroke="#25251F" strokeOpacity="0.07">
                {Array.from({ length: 13 }, (_, i) => (
                    <line key={i} x1={i * 66.6} y1="0" x2={i * 66.6} y2="500" />
                ))}
            </g>

            {variant === "bm4a" && <LayeredEngines />}
            {variant === "ptfs" && <InodeGrid />}
            {variant === "offline" && <RouteLoop />}
            {variant === "atrang" && <VoxelWorld />}

            <text x="48" y="428" fill="#25251F" fontSize="44" style={{ fontFamily: "var(--font-serif), Georgia, serif" }}>
                {title}
            </text>
            <text x="48" y="462" fill="#25251F" fillOpacity="0.72" fontSize="13" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.14em" }}>
                {spec.toUpperCase()}
            </text>
            <text x="48" y="60" fill="#536BFA" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.2em" }}>
                ARCHIVE / COVER
            </text>
        </svg>
    );
}

function LayeredEngines() {
    const layers = [
        { y: 96, w: 560, label: "IDENTITY" },
        { y: 152, w: 620, label: "METADATA" },
        { y: 208, w: 540, label: "RECORDS" },
        { y: 264, w: 580, label: "RELATIONSHIPS / AUDIT" },
    ];
    return (
        <g>
            {layers.map((l, i) => (
                <g key={i} className="dnode">
                    <title>{`Platform module layer: ${l.label}`}</title>
                    <rect x="48" y={l.y} width={l.w} height="40" fill="none" stroke="#25251F" strokeWidth="1.5" />
                    <text x={l.w + 66} y={l.y + 25} fill="#25251F" fillOpacity="0.75" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em" }}>
                        {l.label}
                    </text>
                    {i < layers.length - 1 && (
                        <line x1="330" y1={l.y + 40} x2="330" y2={layers[i + 1].y} stroke="#536BFA" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    )}
                </g>
            ))}
            <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#536BFA" />
                </marker>
            </defs>
        </g>
    );
}

function InodeGrid() {
    const cells = Array.from({ length: 40 }, (_, i) => i);
    return (
        <g>
            <g className="dnode">
                <title>Inode table</title>
                <rect x="60" y="110" width="150" height="220" fill="none" stroke="#25251F" strokeWidth="1.5" />
                <text x="76" y="140" fill="#25251F" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em" }}>INODES</text>
                {Array.from({ length: 6 }, (_, i) => (
                    <line key={i} x1="60" y1={160 + i * 28} x2="210" y2={160 + i * 28} stroke="#25251F" strokeOpacity="0.3" />
                ))}
            </g>
            <g className="dnode">
                <title>Data blocks carrying priority tags</title>
                {cells.map((i) => {
                    const col = i % 8;
                    const row = Math.floor(i / 8);
                    const tagged = [2, 5, 9, 14, 18, 23, 27, 31].includes(i);
                    return (
                        <rect
                            key={i}
                            x={280 + col * 56}
                            y={110 + row * 44}
                            width="40"
                            height="30"
                            fill={tagged ? "#536BFA" : "none"}
                            fillOpacity={tagged ? 0.85 : 0}
                            stroke="#25251F"
                            strokeWidth="1.2"
                        />
                    );
                })}
                <text x="280" y="96" fill="#25251F" fillOpacity="0.75" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em" }}>
                    DATA BLOCKS — PRIORITY TAGS
                </text>
            </g>
            <line x1="210" y1="220" x2="272" y2="220" stroke="#536BFA" strokeWidth="1.5" markerEnd="url(#arrow-ptfs)" />
            <defs>
                <marker id="arrow-ptfs" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#536BFA" />
                </marker>
            </defs>
        </g>
    );
}

function RouteLoop() {
    return (
        <g>
            <g className="dnode">
                <title>Phone showing the prepared loop</title>
                <rect x="560" y="90" width="150" height="300" rx="24" fill="none" stroke="#25251F" strokeWidth="2" />
                <circle cx="635" cy="120" r="4" fill="#25251F" />
                <path
                    d="M 600 250 C 590 190, 660 160, 665 205 C 670 245, 600 240, 615 285 C 628 322, 672 300, 655 260"
                    fill="none"
                    stroke="#536BFA"
                    strokeWidth="2.5"
                    strokeDasharray="6 5"
                />
                <circle cx="600" cy="250" r="6" fill="#25251F" />
            </g>
            {[
                { x: 120, y: 130, label: "QUIET" },
                { x: 200, y: 210, label: "CURIOUS" },
                { x: 110, y: 300, label: "EXPLORE NEW AREA" },
            ].map((m, i) => (
                <g key={i} className="dnode">
                    <title>Walk mode</title>
                    <circle cx={m.x} cy={m.y} r="5" fill="none" stroke="#25251F" strokeWidth="1.5" />
                    <text x={m.x + 18} y={m.y + 5} fill="#25251F" fillOpacity="0.8" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.14em" }}>
                        {m.label}
                    </text>
                </g>
            ))}
            <text x="120" y="370" fill="#25251F" fillOpacity="0.7" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.12em" }}>
                SPOKEN CUES — OCCASIONAL
            </text>
        </g>
    );
}

function VoxelWorld() {
    const cube = (x: number, y: number, s: number, hot: boolean) => (
        <g key={`${x}-${y}`} className="dnode">
            <title>Festival rendered as an explorable 3D world</title>
            <path d={`M ${x} ${y} l ${s} ${-s * 0.5} l ${s} ${s * 0.5} l ${-s} ${s * 0.5} z`} fill={hot ? "#536BFA" : "#E4E1D6"} stroke="#25251F" strokeWidth="1.2" />
            <path d={`M ${x} ${y} l ${-s} ${s * 0.5} l ${s} ${s * 0.5} l ${s} ${-s * 0.5} z`} fill={hot ? "#7189FF" : "#D8D4C6"} stroke="#25251F" strokeWidth="1.2" />
            <path d={`M ${x} ${y + s} l ${-s} ${-s * 0.5 + 0} l 0 ${-s * 0.5} l ${s} ${s * 0.5 - 0}`} fill="none" />
            <path d={`M ${x - s} ${y + s * 0.5} l 0 ${s * 0.6} l ${s} ${s * 0.5} l 0 ${-s * 0.6} z`} fill="#CFCAB6" stroke="#25251F" strokeWidth="1.2" />
            <path d={`M ${x + s} ${y + s * 0.5} l 0 ${s * 0.6} l ${-s} ${s * 0.5} l 0 ${-s * 0.6} z`} fill="#B9B5AA" stroke="#25251F" strokeWidth="1.2" />
        </g>
    );
    return (
        <g>
            {cube(430, 160, 60, false)}
            {cube(560, 130, 60, true)}
            {cube(495, 230, 60, false)}
            {cube(625, 210, 60, false)}
            <text x="80" y="150" fill="#25251F" fillOpacity="0.8" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.14em" }}>
                /EVENTS — PUBLIC SHOWCASE
            </text>
            <text x="80" y="210" fill="#25251F" fillOpacity="0.8" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.14em" }}>
                /ADMIN — COMMAND CENTER
            </text>
            <text x="80" y="270" fill="#536BFA" fontSize="12" style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.14em" }}>
                THREE.JS WORLD
            </text>
        </g>
    );
}
