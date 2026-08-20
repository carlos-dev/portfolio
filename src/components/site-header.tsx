"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/content";

export function SiteHeader() {
  const [clock, setClock] = useState("--:--:--");

  useEffect(() => {
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      setClock(`${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex h-11 items-center justify-between gap-4 border-b border-line bg-bg/85 px-gutter font-mono text-[10.5px] uppercase tracking-[0.1em] text-dim-2 backdrop-blur">
      <span>
        {profile.name} <span className="text-line-2">{"//"}</span> {profile.role}
      </span>
      <span className="flex items-center gap-2.5">
        <span className="hidden min-[720px]:inline">{profile.location}</span>
        <span className="size-[5px] shrink-0 animate-dot-slow rounded-full bg-accent" />
        <span className="text-accent">SYSTEM ONLINE</span>
        <span aria-hidden="true" className="min-w-[60px] text-right text-dim-3">
          {clock}
        </span>
      </span>
    </header>
  );
}
