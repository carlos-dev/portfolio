"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/lib/content";
import { ContactForm } from "./contact-form";

const links = [
  { flag: "--email", value: profile.email, href: `mailto:${profile.email}`, cmd: "contact", external: false },
  { flag: "--github", value: profile.github, href: profile.githubUrl, cmd: "contact", external: true },
  { flag: "--product", value: profile.product, href: profile.productUrl, cmd: "open", external: true },
];

export function SiteFooter({ stamp }: { stamp: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);

  // Breathing contribution heatmap behind the footer.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cols = 53;
    const rows = 7;
    const seed = Array.from(
      { length: cols * rows },
      (_, i) => (Math.sin(i * 12.9898) * 43758.5453) % 1,
    );

    const draw = (phase: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);
      const size = Math.max(6, Math.min(13, w / (cols * 1.5)));
      const gap = 3;
      const gridW = cols * (size + gap);
      const gridH = rows * (size + gap);
      const ox = w - gridW - 16;
      const oy = h - gridH - 16;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const v = Math.abs(seed[c * rows + r]);
          if (v < 0.42) continue;
          const breathe = 0.5 + 0.5 * Math.sin(phase + c * 0.22 + r * 0.5);
          const a = (v - 0.42) * 0.34 * (0.45 + 0.55 * breathe);
          ctx.fillStyle = `rgba(163,230,53,${a.toFixed(3)})`;
          ctx.fillRect(ox + c * (size + gap), oy + r * (size + gap), size, size);
        }
      }
    };

    draw(0);
    const onResize = () => draw(phaseRef.current);
    window.addEventListener("resize", onResize);

    if (reduced) {
      return () => window.removeEventListener("resize", onResize);
    }

    let visible = false;
    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting));
    io.observe(canvas);
    const id = setInterval(() => {
      if (visible) draw((phaseRef.current += 0.18));
    }, 110);

    return () => {
      clearInterval(id);
      io.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden">
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      />
      <div className="relative px-gutter pt-[clamp(48px,7vw,104px)] pb-[clamp(24px,3vw,40px)]">
        <div
          data-reveal="1"
          className="font-mono text-[11px] tracking-[0.16em] text-dim-2"
        >
          04 / CONTACT
        </div>
        <h2
          data-reveal="1"
          className="mt-[clamp(24px,3vw,40px)] mb-[clamp(32px,4vw,56px)] text-title font-extrabold leading-[0.92] tracking-[-0.045em]"
        >
          Tem um sistema
          <br />
          para colocar de pé
          <span className="text-accent">?</span>
        </h2>

        <div data-reveal="1">
          <ContactForm />
        </div>

        <p
          data-reveal="1"
          className="mb-3.5 font-mono text-[10.5px] tracking-[0.12em] text-dim-3"
        >
          {"// ou pelos canais diretos:"}
        </p>

        <ul className="grid list-none grid-cols-[repeat(auto-fit,minmax(280px,1fr))] border-t border-line font-mono">
          {links.map((l) => (
            <li key={l.flag} className="border-b border-line">
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
                className="flex items-center justify-between gap-4 py-[22px] pr-5 text-link transition-colors duration-[140ms]"
              >
                <span>
                  <span className="text-accent">$</span> {l.cmd} {l.flag}{" "}
                  <span className="text-dim-2">{l.value}</span>
                </span>
                <span aria-hidden="true" className="text-line-2">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="relative mt-[clamp(40px,6vw,72px)] flex flex-wrap items-center justify-between gap-3 border-t border-line bg-bg pt-5 pb-1 font-mono text-[10.5px] tracking-[0.12em] text-dim-3">
          <span>{"// built by hand · sem template"}</span>
          <span>{stamp}</span>
        </div>
      </div>
    </footer>
  );
}
