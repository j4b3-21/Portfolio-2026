import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
    return new ImageResponse(
        (
            <div style={{ width: "100%", height: "100%", background: "#F1EEE7", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ position: "absolute", width: 130, height: 54, borderRadius: "50%", border: "5px solid #25251F", transform: "rotate(-24deg)" }} />
                <div style={{ position: "absolute", width: 130, height: 54, borderRadius: "50%", border: "5px solid #536BFA", transform: "rotate(38deg)" }} />
                <div style={{ width: 34, height: 34, borderRadius: 17, background: "#25251F" }} />
                <div style={{ position: "absolute", top: 32, right: 34, width: 18, height: 18, borderRadius: 9, background: "#536BFA" }} />
            </div>
        ),
        size
    );
}
