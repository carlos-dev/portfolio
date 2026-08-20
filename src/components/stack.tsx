"use client";

import { useState } from "react";
import { deps, type Dep } from "@/lib/content";

// Non-breaking spaces keep the ASCII tree aligned once HTML collapses runs.
const NBSP = "  ";
const INDENT = "   ";

export function Stack() {
  const [active, setActive] = useState<string | null>(null);

  const dependencies = deps.filter((d) => d.group === "dependencies");
  const infrastructure = deps.filter((d) => d.group === "infrastructure");
  const current: Dep | undefined = deps.find((d) => d.key === active);

  const btnColor = (key: string) =>
    active === null ? "text-fg" : active === key ? "text-accent" : "text-dim-3";

  const DepLine = ({ d, last }: { d: Dep; last: boolean }) => (
    <div>
      <span className="text-line-2">{`│${NBSP}${last ? "└─" : "├─"} `}</span>
      <button
        type="button"
        onMouseEnter={() => setActive(d.key)}
        onFocus={() => setActive(d.key)}
        className={`cursor-pointer border-0 bg-transparent p-0 transition-colors duration-[140ms] ${btnColor(d.key)}`}
      >
        {d.name}
      </button>
      <span className="text-dim-3"> {d.version}</span>
    </div>
  );

  return (
    <section id="stack" className="border-b border-line">
      <div
        data-reveal="1"
        className="flex flex-wrap items-baseline justify-between gap-4 px-gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)] font-mono text-[11px] tracking-[0.16em] text-dim-2"
      >
        <span>02 / STACK</span>
        <span>árvore de dependências · hover para inspecionar</span>
      </div>

      <div className="grid grid-cols-1 border-t border-line min-[900px]:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <div
          onMouseLeave={() => setActive(null)}
          className="min-w-0 border-r border-line px-gutter py-[clamp(24px,3.5vw,48px)] font-mono text-tree leading-[2]"
        >
          <div className="text-fg">carlosandre.dev@8.0.0</div>

          <div className="text-dim-3">
            ├─ <span className="text-dim-2">dependencies</span>
          </div>
          {dependencies.map((d, i) => (
            <DepLine key={d.key} d={d} last={i === dependencies.length - 1} />
          ))}

          <div className="text-dim-3">
            ├─ <span className="text-dim-2">infrastructure</span>
          </div>
          {infrastructure.map((d, i) => (
            <DepLine key={d.key} d={d} last={i === infrastructure.length - 1} />
          ))}

          <div className="text-dim-3">
            └─ <span className="text-dim-2">scripts</span>
          </div>
          <div className="text-dim-3">
            {`${INDENT}├─ build `}
            <span className="text-line-2">→</span> ship pequeno, cedo, com log
          </div>
          <div className="text-dim-3">
            {`${INDENT}└─ debug `}
            <span className="text-line-2">→</span> ler o erro inteiro antes de
            opinar
          </div>
        </div>

        <div
          aria-live="polite"
          className="min-w-0 bg-surface-3 px-gutter py-[clamp(24px,3.5vw,48px)]"
        >
          <div className="font-mono text-[10px] tracking-[0.14em] text-dim-3">
            INSPECTOR
          </div>
          <div className="mt-5 min-h-[1.2em] text-inspector font-semibold tracking-[-0.03em] text-accent">
            {current ? current.name : "—"}
          </div>
          <p className="mt-3.5 min-h-[4.6em] max-w-[44ch] text-inspector-body leading-[1.55] text-pretty text-dim">
            {current
              ? current.desc
              : "Passe o mouse (ou tab) por uma dependência para ver como ela é usada de verdade — sem barrinha de porcentagem."}
          </p>
          <div className="mt-6 border-t border-line pt-[18px] font-mono text-[11px] text-dim-2">
            <span className="text-dim-3">used in:</span>{" "}
            {current ? current.used : "—"}
          </div>
        </div>
      </div>
    </section>
  );
}
