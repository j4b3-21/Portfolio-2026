/*
 * Central site configuration.
 *
 * SITE_URL: TODO — replace with your production domain before going live
 * (used for every canonical URL, og:url, og:image, sitemap entry and JSON-LD).
 */
export const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://the-archive-bhuvan.vercel.app";

export function absoluteUrl(path: string): string {
    return `${SITE_URL}${path}`;
}

export const PROFILE = {
    name: "Bhuvan M. Acharya",
    title: "The Archive",
    tagline: "An ongoing exploration of technology, systems and ideas.",
    degree: "B.Tech Computer Science & Engineering",
    institution: "IIIT Tiruchirappalli",
    klass: "Class of 2028",
    location: "India",
    description:
        "I'm Bhuvan M. Acharya, a Computer Science undergraduate at IIIT Tiruchirappalli. I build software systems, explore emerging technologies and create opportunities for people to learn and build together.",
    github: "https://github.com/j4b3-21",
    githubHandle: "@j4b3-21",
    email: "bhuvanm200623@gmail.com",
    linkedin: "https://www.linkedin.com/in/bhuvan-m-acharya-7b9256335/",
    linkedinLabel: "in/bhuvan-m-acharya",
};

export type ExperienceEntry = {
    title: string;
    organization: string;
    location?: string;
    period: string;
    summary: string;
    bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
    {
        title: "Founding Software Engineer Intern",
        organization: "Nebula Technologies Labs Pvt. Ltd.",
        location: "Remote",
        period: "May 2026 – Aug 2026",
        summary: "Built the company CRM platform and its production engineering foundations as a founding engineer.",
        bullets: [
            "Architected and developed a production CRM platform with Java, Spring Boot, React, PostgreSQL and REST APIs.",
            "Designed infrastructure with Docker, Nginx, VPS hosting and Cloudflare.",
            "Built Jenkins and GitHub Actions CI/CD pipelines, reducing deployment time from approximately 10 minutes to under 1 minute.",
            "Developed and tested backend services with JUnit, Postman and Bruno while debugging API, database and deployment failures.",
            "Worked with PostgreSQL indexing, query optimization, transactions, migrations, JSONB and connection pooling.",
            "Developed concurrent and asynchronous backend components using Java concurrency, thread pools, RabbitMQ and Kafka.",
            "Collaborated in a six-member engineering team across design discussions, code reviews, Jira workflows and production releases.",
        ],
    },
    {
        title: "Undergraduate Research Collaborator",
        organization: "Indian Institute of Information Technology Tiruchirappalli",
        location: "Tiruchirappalli, India",
        period: "2026 – Present",
        summary: "Contributing to reproducibility in computational neuroscience and fMRI-based research.",
        bullets: [
            "Developing an open-source graph-native research workflow platform focused on experiment traceability.",
            "Designing systems for dataset versioning, experiment tracking, workflow orchestration and artifact management.",
            "Contributing to implementation, evaluation and reproducible research methodologies.",
        ],
    },
];

export type Channel = {
    id: string;
    label: string;
    value: string;
    href: string;
    copyValue?: string;
    internal?: boolean;
};

export const CHANNELS: Channel[] = [
    {
        id: "email",
        label: "Email",
        value: PROFILE.email,
        href: `mailto:${PROFILE.email}`,
        copyValue: PROFILE.email,
    },
    {
        id: "github",
        label: "GitHub",
        value: PROFILE.github.replace(/^https?:\/\//, ""),
        href: PROFILE.github,
    },
    {
        id: "linkedin",
        label: "LinkedIn",
        value: PROFILE.linkedinLabel,
        href: PROFILE.linkedin,
    },
    {
        id: "resume",
        label: "Résumé (PDF)",
        value: "Résumé (PDF)",
        href: "/resume.pdf",
        internal: true,
    },
];

export const DIMENSIONS = [
    {
        id: "engineer",
        index: "01",
        label: "ENGINEER",
        text: "Building complete software products, reliable systems and infrastructure.",
    },
    {
        id: "explorer",
        index: "02",
        label: "EXPLORER",
        text: "Investigating AI, machine learning, quantum computing and computational research.",
    },
    {
        id: "founder",
        index: "03",
        label: "FOUNDER",
        text: "Creating communities, taking initiative and bringing people together.",
    },
];

export const CAPABILITIES = [
    {
        id: "product-engineering",
        label: "PRODUCT ENGINEERING",
        items: [
            { name: "React", status: "shipped", projects: ["campushire", "neuroweave"] },
            { name: "Next.js", status: "shipped", projects: ["campushire", "atrang"] },
            { name: "TypeScript", status: "shipped", projects: ["campushire", "atrang", "offline"] },
            { name: "Java", status: "shipped", projects: ["campushire", "atrang"] },
            { name: "Spring Boot", status: "shipped", projects: ["campushire", "bm4a", "atrang"] },
        ],
    },
    {
        id: "systems",
        label: "SYSTEMS",
        items: [
            { name: "PostgreSQL", status: "shipped", projects: ["campushire", "bm4a", "atrang"] },
            { name: "Redis", status: "shipped", projects: ["campushire", "bm4a"] },
            { name: "API design", status: "shipped", projects: ["campushire", "bm4a", "atrang"] },
            { name: "System architecture", status: "shipped", projects: ["campushire", "bm4a"] },
            { name: "Authorization", status: "shipped", projects: ["campushire", "bm4a", "atrang"] },
        ],
    },
    {
        id: "infrastructure",
        label: "INFRASTRUCTURE",
        items: [
            { name: "Docker", status: "shipped", projects: ["campushire", "bm4a", "atrang"] },
            { name: "Nginx", status: "shipped", projects: ["campushire"] },
            { name: "Linux", status: "shipped", projects: [] },
            { name: "CI/CD", status: "shipped", projects: ["campushire", "bm4a"] },
            { name: "Deployment & automation", status: "shipped", projects: ["campushire", "atrang"] },
        ],
    },
    {
        id: "emerging",
        label: "EMERGING TECHNOLOGIES",
        items: [
            { name: "AI/ML", status: "exploring", projects: [] },
            { name: "Deep learning", status: "exploring", projects: [] },
            { name: "Quantum computing", status: "exploring", projects: [] },
        ],
    },
];

export const RESEARCH_AREAS = [
    {
        id: "ai-ml",
        index: "R.01",
        title: "Artificial Intelligence & Machine Learning",
        blurb: "How models learn, where they fail, and what it takes to build with them.",
    },
    {
        id: "quantum-computing",
        index: "R.02",
        title: "Quantum Computing",
        blurb: "A different model of computation — and the community co-founded around it.",
    },
    {
        id: "reproducibility",
        index: "R.03",
        title: "Computational Research & Reproducibility",
        blurb: "Provenance, caching and run records — the question behind NeuroWeave.",
    },
];

export const JOURNAL_YEARS = [
    { year: 2028, subtitle: "Graduation and the next chapter." },
    { year: 2027, subtitle: "Research and experimentation." },
    { year: 2026, subtitle: "Building, leadership and community." },
    { year: 2025, subtitle: "Foundations and exploration." },
    { year: 2024, subtitle: "First year — the vocabulary." },
];

export const NAV_LINKS = [
    { to: "/work", label: "Work" },
    { to: "/journey", label: "Journey" },
    { to: "/research", label: "Research" },
    { to: "/about", label: "About" },
    { to: "/resume", label: "Résumé" },
    { to: "/contact", label: "Contact" },
];
