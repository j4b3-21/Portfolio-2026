import { makeOg } from "@/lib/og";

export const alt = "The Journal — a life in progress";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Image() {
    return makeOg({ title: "A life in progress.", sub: "The Journal — an evolving chronological archive" });
}
