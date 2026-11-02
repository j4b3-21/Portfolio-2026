/* Responsive SVG architecture diagrams — ink strokes, electric data flow, mono labels.
   Rendered server-side; scale fluidly and stack cleanly at 390px. */

const INK = "#25251F";
const BLUE = "#536BFA";

function Defs({ id }: { id: string }) {
    return (
        <defs>
            <marker id={`arw-${id}`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={BLUE} />
            </marker>
        </defs>
    );
}

function Box({ x, y, w, h, label, tip }: { x: number; y: number; w: number; h: number; label: string; tip: string }) {
    return (
        <g className="dnode">
            <title>{tip}</title>
            <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth="1.5" />
            {label.split("\n").map((line, i) => (
                <text
                    key={i}
                    x={x + w / 2}
                    y={y + h / 2 + 4 + (i - (label.split("\n").length - 1) / 2) * 16}
                    textAnchor="middle"
                    fill={INK}
                    fontSize="12"
                    style={{ fontFamily: "var(--font-mono), monospace", letterSpacing: "0.08em" }}
                >
                    {line}
                </text>
            ))}
        </g>
    );
}

function Arrow({ id, points, dash = false }: { id: string; points: string; dash?: boolean }) {
    return (
        <polyline
            points={points}
            fill="none"
            stroke={BLUE}
            strokeWidth="1.5"
            strokeDasharray={dash ? "5 5" : undefined}
            markerEnd={`url(#arw-${id})`}
        />
    );
}

export default function Diagram({ slug, dark = false }: { slug: string; dark?: boolean }) {
    const id = slug;
    const stroke = dark ? "#DCDDD9" : INK;
    return (
        <figure className="my-10" data-testid={`diagram-${slug}`}>
            <svg viewBox="0 0 800 460" className="diagram" role="img" aria-label="Architecture diagram" style={{ stroke }}>
                <Defs id={id} />
                {slug === "neuroweave" && <NeuroWeave id={id} />}
                {slug === "campushire" && <CampusHire id={id} />}
                {slug === "bm4a" && <BM4A id={id} />}
                {slug === "atrang" && <Atrang id={id} />}
                {slug === "offline" && <Offline id={id} />}
                {slug === "ptfs" && <PTFS id={id} />}
            </svg>
            <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/70 dark:text-cream/70">
                Architecture — {slug}
            </figcaption>
        </figure>
    );
}

function NeuroWeave({ id }: { id: string }) {
    return (
        <>
            <Box x={220} y={20} w={360} h={48} label={"ANALYSIS CODE — ORDINARY PYTHON FUNCTIONS"} tip="Nodes are typed Python functions you already know how to write" />
            <Arrow id={id} points="400,68 400,96" />
            <Box x={220} y={100} w={360} h={48} label={"TYPED WORKFLOW GRAPH"} tip="Functions connect into a typed graph — in code or in the visual Studio" />
            <Arrow id={id} points="400,148 400,176" />
            <Box x={160} y={180} w={480} h={56} label={"GRAPH KERNEL"} tip="Validates, plans and executes the graph; records every run" />
            <Arrow id={id} points="260,236 260,270" />
            <Arrow id={id} points="400,236 400,270" />
            <Arrow id={id} points="540,236 540,270" />
            <Box x={110} y={274} w={180} h={56} label={"ARTIFACT\nSTORE"} tip="Content-addressed store for every output" />
            <Box x={310} y={274} w={180} h={56} label={"RUN RECORDS"} tip="Code hashes, params, seed, env, logs and metrics per run" />
            <Box x={510} y={274} w={180} h={56} label={"REPRODUCTION\nCHECKS"} tip="Re-execute and compare hashes for byte-identical reproduction" />
            <Arrow id={id} points="200,330 200,368" />
            <Arrow id={id} points="400,330 400,368" />
            <Arrow id={id} points="600,330 600,368" />
            <Box x={120} y={372} w={560} h={48} label={"CLI  ·  HTTP API  ·  STUDIO UI"} tip="Three ways in — same kernel, same records" />
        </>
    );
}

function CampusHire({ id }: { id: string }) {
    return (
        <>
            <Box x={40} y={30} w={140} h={48} label={"BROWSER"} tip="Students, coordinators, recruiters, placement officer" />
            <Box x={230} y={30} w={170} h={48} label={"NGINX\nTLS + RATE LIMITS"} tip="Nginx terminates TLS and shields the stack" />
            <Arrow id={id} points="180,54 226,54" />
            <Box x={450} y={30} w={150} h={48} label={"NEXT.JS\nWEB APP"} tip="The CampusHire web application" />
            <Box x={640} y={30} w={130} h={48} label={"API × 2"} tip="Two stateless Spring Boot API replicas" />
            <Arrow id={id} points="400,54 446,54" />
            <Arrow id={id} points="600,54 636,54" />
            <Box x={170} y={130} w={170} h={48} label={"KEYCLOAK"} tip="OIDC + PKCE identity with Google Workspace SSO" />
            <Arrow id={id} points="680,78 680,104 255,104 255,126" />
            <Box x={40} y={130} w={110} h={48} label={"GOOGLE\nSSO"} tip="College Google accounts sign students in" />
            <Arrow id={id} points="150,154 166,154" />
            <Arrow id={id} points="525,78 525,196 240,196 240,220" dash />
            <Arrow id={id} points="705,78 705,268 620,268" dash />
            <Box x={60} y={224} w={220} h={56} label={"POSTGRESQL 18\nJSONB · GIN · MAT VIEWS"} tip="Records, eligibility projections and analytics" />
            <Box x={330} y={224} w={140} h={56} label={"REDIS 8"} tip="Caches, pub/sub fan-out, rate limits" />
            <Box x={520} y={224} w={140} h={56} label={"OPENFGA"} tip="Relationship-based authorization" />
            <Box x={700} y={224} w={90} h={56} label={"MINIO"} tip="S3-compatible file storage" />
            <Box x={60} y={340} w={400} h={48} label={"SPRING BOOT 4 MODULAR MONOLITH — MODULITH-VERIFIED"} tip="Platform modules plus CampusHire modules" />
            <Arrow id={id} points="260,196 260,336" />
            <Box x={520} y={340} w={270} h={48} label={"DOCKER COMPOSE PROD\nNGINX · 2× API · CI"} tip="One-server production topology as code" />
        </>
    );
}

function BM4A({ id }: { id: string }) {
    return (
        <>
            <Box x={60} y={30} w={170} h={48} label={"API CLIENT"} tip="Any domain application configures BM4A through its API" />
            <Arrow id={id} points="230,54 276,54" />
            <Box x={280} y={30} w={180} h={48} label={"IDENTITY"} tip="Keycloak OIDC; JWTs validated for signature, issuer, audience, expiry" />
            <Box x={90} y={130} w={160} h={48} label={"KEYCLOAK"} tip="Issues and signs tokens (JWKS)" />
            <Arrow id={id} points="170,122 260,80" dash />
            <Box x={280} y={130} w={180} h={48} label={"TENANCY"} tip="Organizations, memberships, server-side tenant context" />
            <Arrow id={id} points="370,78 370,126" />
            <Box x={280} y={230} w={180} h={48} label={"METADATA"} tip="Modules, 17 field types, layouts, definition versions" />
            <Arrow id={id} points="370,178 370,226" />
            <Box x={280} y={330} w={180} h={48} label={"RECORDS"} tip="One generic CRUD engine over JSONB" />
            <Arrow id={id} points="370,278 370,326" />
            <Box x={540} y={330} w={180} h={48} label={"RELATIONSHIPS"} tip="1:1, 1:N, N:N links with cardinality enforcement" />
            <Arrow id={id} points="460,354 536,354" />
            <Box x={540} y={230} w={180} h={48} label={"OPENFGA"} tip="Relationship-based authorization; fails closed (503)" />
            <Arrow id={id} points="630,326 630,282" />
            <Box x={60} y={330} w={150} h={48} label={"POSTGRES\n(JSONB)"} tip="Canonical record storage" />
            <Arrow id={id} points="276,354 214,354" />
            <Box x={60} y={230} w={150} h={48} label={"AUDIT"} tip="Append-only, DB-enforced trail" />
        </>
    );
}

function Atrang({ id }: { id: string }) {
    return (
        <>
            <Box x={140} y={30} w={520} h={64} label={"NEXT.JS  ·  THREE.JS / R3F 3D WORLD"} tip="Public showcase and the explorable fest world" />
            <Box x={140} y={124} w={240} h={48} label={"/EVENTS — PUBLIC"} tip="Anyone can browse the fest" />
            <Box x={420} y={124} w={240} h={48} label={"/ADMIN — PROTECTED"} tip="Command center behind session auth" />
            <Arrow id={id} points="260,94 260,120" />
            <Arrow id={id} points="540,94 540,120" />
            <Arrow id={id} points="400,172 400,208" />
            <Box x={160} y={212} w={480} h={56} label={"HTTP + JSON + SAMESITE HTTPONLY SESSION COOKIE\n(ATRANG_SESSION_ID)"} tip="Session-cookie authentication" />
            <Arrow id={id} points="400,268 400,300" />
            <Box x={100} y={304} w={300} h={64} label={"SPRING BOOT 3.3.4  ·  JAVA 21\nSPRING SECURITY + BCRYPT"} tip="REST controllers, DTOs, JPA layers, security tests" />
            <Arrow id={id} points="400,368 400,396" />
            <Box x={60} y={400} w={330} h={48} label={"POSTGRESQL — 3NF, 5 TABLES"} tip="Relational core with NOT NULL, UNIQUE, CHECK constraints" />
            <Box x={430} y={400} w={340} h={48} label={"FLYWAY V1–V9 · VIEWS · TRIGGERS"} tip="Versioned migrations, analytical views, audit trigger" />
            <Arrow id={id} points="290,368 290,396" />
            <Arrow id={id} points="520,368 520,396" />
        </>
    );
}

function Offline({ id }: { id: string }) {
    return (
        <>
            <Box x={260} y={30} w={280} h={48} label={"REACT NATIVE + EXPO"} tip="One codebase, on-device first" />
            <Arrow id={id} points="400,78 400,108" />
            <Box x={100} y={112} w={280} h={56} label={"SQLITE\nEXPERIENCES · SESSIONS · METRICS"} tip="The archive of past walks, local only" />
            <Box x={420} y={112} w={280} h={56} label={"GPS + DETERMINISTIC\nROUTE / SAFETY LOGIC"} tip="Route geometry never depends on a model" />
            <Arrow id={id} points="240,168 240,204" />
            <Arrow id={id} points="560,168 560,204" />
            <Box x={100} y={208} w={280} h={64} label={"LOCALMODEL\nMOCK PLANNER (DEFAULT) · TINYLLAMA (OPTIONAL)"} tip="The model boundary — deterministic planner by default" />
            <Box x={420} y={208} w={280} h={64} label={"DEVICE TEXT-TO-SPEECH"} tip="Occasional spoken cues, only at meaningful moments" />
            <Arrow id={id} points="400,272 400,310" />
            <Box x={140} y={314} w={520} h={48} label={"WALK  →  STORY REPORT  →  PAST WALKS (/ARCHIVE)"} tip="Complete → report → archive loop" />
        </>
    );
}

function PTFS({ id }: { id: string }) {
    return (
        <>
            <Box x={240} y={30} w={320} h={48} label={"USER PROGRAMS (SYSCALLS)"} tip="open, read, write — the usual xv6 interfaces" />
            <Arrow id={id} points="400,78 400,108" />
            <Box x={180} y={112} w={440} h={56} label={"XV6 KERNEL — FILESYSTEM LAYER"} tip="The MIT educational kernel PTFS modifies" />
            <Arrow id={id} points="400,168 400,200" />
            <Box x={140} y={204} w={520} h={64} label={"PTFS — PRIORITY-TAG FILE SYSTEM"} tip="Files carry priority tags; retrieval respects importance" />
            <Arrow id={id} points="400,268 400,300" />
            <Box x={100} y={304} w={280} h={56} label={"INODE TABLE"} tip="File metadata, now including the priority tag" />
            <Box x={430} y={304} w={270} h={56} label={"TAGGED DATA BLOCKS"} tip="Blocks on disk, grouped by priority" />
            <Arrow id={id} points="300,332 296,332" />
            <Box x={100} y={400} w={600} h={40} label={"DISK IMAGE — BOOTS"} tip="A real, bootable modified xv6 image" />
        </>
    );
}
