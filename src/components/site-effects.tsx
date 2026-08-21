"use client";

import { useEffect } from "react";

/**
 * Não renderiza nada. Toca as animações disparadas por scroll sobre as seções
 * renderizadas estaticamente: o reveal "compile", a contagem das stats, as
 * células da matrix de ingest e o desenho das sparklines.
 */

// Tempos das animações de scroll, em ms. Ficam juntos aqui porque são
// calibragem visual: mexer em um sem olhar os outros descompassa a cena.
const REVEAL_MS = 1100; // o wipe "compile" que traz cada bloco
const COUNT_MS = 900; // a contagem das stats
const SPARK_MS = 1100; // o traço das sparklines

export function SiteEffects() {
  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    const counts = Array.from(
      document.querySelectorAll<HTMLElement>("[data-count]"),
    );

    if (reduced || !("IntersectionObserver" in window)) return;

    reveals.forEach((el) => (el.style.opacity = "0"));

    const countUp = (el: HTMLElement) => {
      const target = parseInt(el.getAttribute("data-count") || "0", 10) || 0;
      const dur = COUNT_MS;
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = String(Math.round(target * eased)).padStart(
          String(target).length,
          "0",
        );
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = String(target).padStart(2, "0");
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          observer.unobserve(el);
          if (el.hasAttribute("data-count")) return countUp(el);
          el.style.opacity = "1";
          el.style.animation = `compile ${REVEAL_MS}ms cubic-bezier(.16,1,.3,1) forwards`;
          el.querySelectorAll<SVGPathElement>("[data-spark]").forEach((path) => {
            const len = path.getTotalLength();
            path.style.strokeDasharray = String(len);
            path.style.strokeDashoffset = String(len);
            path.style.transition = `stroke-dashoffset ${SPARK_MS}ms cubic-bezier(.16,1,.3,1)`;
            requestAnimationFrame(() => (path.style.strokeDashoffset = "0"));
          });
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    reveals.forEach((el) => observer.observe(el));
    counts.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
