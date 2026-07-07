import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HJB Premium";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #710014 0%, #161616 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 60,
          color: "#F2F1ED",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 36, letterSpacing: 4, textTransform: "uppercase", color: "#B38F6F" }}>HJB</div>
        <div style={{ fontSize: 70, fontWeight: 700, marginTop: 12 }}>Lomo fino al vacío</div>
        <div style={{ fontSize: 28, marginTop: 18, color: "#F2F1ED", opacity: 0.9 }}>Cotizaciones mayoristas y certificación INVIMA</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
