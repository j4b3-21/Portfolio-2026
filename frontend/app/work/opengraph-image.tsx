import { makeOg } from "@/lib/og";

export const alt = "Work — The Archive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default function Image() {
    return makeOg({ title: "Work — things I've built.", sub: "Research tooling · placement infrastructure · platform foundations · systems experiments" });
}
