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

  // Heatmap de contribuições respirando atrás do footer. Pintado em rAF e
  // pausado fora da viewport. O buffer só é redimensionado no resize — antes
  // era reatribuído a cada frame, o que forçava realocação ~9x por segundo.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cols = 53;
    const rows = 7;
    const seed = Array.from(
      { length: cols * rows },
      (_, i) => (Math.sin(i * 12.9898) * 43758.5453) % 1,
    );

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      if (!w || !h) return false;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      // setTransform, não scale: não acumula a cada chamada.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const draw = (phase: number) => {
      if (!w || !h) return;
      ctx.clearRect(0, 0, w, h);
      const size = Math.max(6, Math.min(13, w / (cols * 1.5)));
      const gap = 3;
      const ox = w - cols * (size + gap) - 16;
      const oy = h - rows * (size + gap) - 16;
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

    const paint = () => {
      if (resize()) draw(phaseRef.current);
    };
    paint();

    const onResize = () => paint();
    window.addEventListener("resize", onResize);

    if (reduced) {
      return () => window.removeEventListener("resize", onResize);
    }

    // Mesma cadência de antes (~9 fps), agora alinhada ao refresh do display.
    const STEP_MS = 110;
    let visible = false;
    let last = 0;
    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (!visible || now - last < STEP_MS) return;
      last = now;
      draw((phaseRef.current += 0.18));
    };

    const io = new IntersectionObserver((e) => (visible = e[0].isIntersecting));
    io.observe(canvas);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
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
                {l.external && <span className="sr-only">(abre em nova aba)</span>}
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
