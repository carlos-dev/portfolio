"use client";

import { useEffect } from "react";
import { C } from "@/lib/ui";

/**
 * Renders nothing. Drives the scroll-triggered animations over the statically
 * rendered sections: the "compile" reveal, the count-up stats, the ingest
 * matrix cells, and the sparkline draw-in. Ported from the design's support.js.
 */
export function SiteEffects() {
  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // radar-congresso card: a 26-cell ingest matrix, built client-side.
    document.querySelectorAll<HTMLElement>("[data-matrix]").forEach((host) => {
      if (host.childElementCount) return; // guard against double-run
      for (let i = 0; i < 26; i++) {
        const cell = document.createElement("i");
        const hot = i % 7 === 3;
        cell.style.cssText = `display:block;height:${10 + (i % 4) * 8}px;background:${hot ? C.accent : C.border};opacity:${hot ? ".85" : "1"};align-self:end`;
        if (!reduced)
          cell.style.animation = `bars 2.6s cubic-bezier(.4,0,.2,1) ${-i * 0.09}s infinite`;
        cell.style.transformOrigin = "bottom";
        host.appendChild(cell);
      }
    });

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
      const dur = 900;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased)).padStart(
          String(target).length,
          "0",
        );
        if (t < 1) requestAnimationFrame(step);
        else el.textContent = String(target).padStart(2, "0");
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          if (el.hasAttribute("data-count")) return countUp(el);
          el.style.opacity = "1";
          el.style.animation = "compile 640ms cubic-bezier(.16,1,.3,1) forwards";
          el.querySelectorAll<SVGPathElement>("[data-spark]").forEach((p) => {
            const len = p.getTotalLength();
            p.style.strokeDasharray = String(len);
            p.style.strokeDashoffset = String(len);
            p.style.transition =
              "stroke-dashoffset 1100ms cubic-bezier(.16,1,.3,1)";
            requestAnimationFrame(() => (p.style.strokeDashoffset = "0"));
          });
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    reveals.forEach((el) => io.observe(el));
    counts.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
