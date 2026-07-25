import { ImageResponse } from "next/og";

export const alt = "GrowLab Studio — 브랜드 성장을 위한 홈페이지 제작 스튜디오";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          gap: 24,
          padding: 96,
          background: "#0a0a0a",
          color: "#ededed",
        }}
      >
        <div
          style={{
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 4,
            color: "#a1a1aa",
          }}
        >
          GROWLAB STUDIO
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2 }}>
          브랜드의 성장을 위한
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.2 }}>
          홈페이지를 제작합니다
        </div>
      </div>
    ),
    { ...size }
  );
}
