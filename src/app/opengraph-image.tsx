import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

// Gerado no build e servido como PNG estático. Sem fonte custom de propósito:
// buscar TTF em build adiciona rede ao pipeline por um ganho pequeno aqui.
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const C = {
  bg: "#0a0a0b",
  surface: "#131316",
  surface2: "#1a1a1e",
  line: "#27272a",
  line2: "#3f3f46",
  fg: "#e4e4e7",
  dim: "#a1a1aa",
  dim3: "#85858e",
  accent: "#a3e635",
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: C.bg,
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            border: `1px solid ${C.line}`,
            backgroundColor: C.surface,
          }}
        >
          {/* barra de título da janela */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: `1px solid ${C.line}`,
              backgroundColor: C.surface2,
              padding: "16px 22px",
              fontSize: 18,
              letterSpacing: 2,
              color: C.dim3,
            }}
          >
            <div style={{ display: "flex", gap: 8 }}>
              <div
                style={{ width: 11, height: 11, border: `1px solid ${C.line2}` }}
              />
              <div
                style={{ width: 11, height: 11, border: `1px solid ${C.line2}` }}
              />
              <div
                style={{ width: 11, height: 11, border: `1px solid ${C.line2}` }}
              />
            </div>
            <div style={{ display: "flex" }}>intro.sh — bash — 80×24</div>
          </div>

          {/* corpo */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              justifyContent: "space-between",
              padding: "44px 48px 40px",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={{
                  display: "flex",
                  fontSize: 22,
                  letterSpacing: 3,
                  color: C.dim3,
                }}
              >
                00 / BOOT SEQUENCE
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 26,
                  fontSize: 116,
                  fontWeight: 800,
                  letterSpacing: -5,
                  lineHeight: 1,
                  color: C.fg,
                }}
              >
                {profile.name}
                <span style={{ color: C.accent }}>.</span>
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 26,
                  maxWidth: 820,
                  fontSize: 29,
                  lineHeight: 1.4,
                  color: C.dim,
                }}
              >
                {profile.tagline}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                borderTop: `1px solid ${C.line}`,
                paddingTop: 26,
                fontSize: 23,
                color: C.dim3,
              }}
            >
              <div style={{ display: "flex" }}>
                {profile.role} · {profile.location} · {profile.years}
              </div>
              <div style={{ display: "flex", color: C.accent }}>
                carlosandre.dev
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
