import { makeOg } from "@/lib/og";

export const alt = "The Archive — Bhuvan M. Acharya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return makeOg({ title: "Building things. Exploring ideas.", sub: "Computer Science undergraduate — IIIT Tiruchirappalli — Class of 2028" });
}
