"use client";

import { useState } from "react";
import { deps, practices, type Dep } from "@/lib/content";

// Espaços não-quebráveis mantêm a árvore ASCII alinhada depois que o HTML
// colapsa sequências de espaço.
const NBSP = "  ";
const INDENT = "   ";

// `deps` é constante de módulo: particionar e indexar a cada render seria
// trabalho jogado fora.
const dependencies = deps.filter((dep) => dep.group === "dependencies");
const ai = deps.filter((dep) => dep.group === "ai");
const infrastructure = deps.filter((dep) => dep.group === "infrastructure");
const byKey = new Map(deps.map((dep) => [dep.key, dep]));


// IMPORTANTE: fica no escopo do módulo, não dentro de <Stack>. Definido lá
// dentro, virava um tipo de componente novo a cada render — React remontava
// todas as linhas e o botão que acabara de receber foco era destruído, jogando
// o foco de volta no <body>. Isso quebrava a navegação por teclado da árvore.
function DepLine({
  dep,
  last,
  active,
  onActivate,
}: {
  dep: Dep;
  last: boolean;
  active: string | null;
  onActivate: (key: string) => void;
}) {
  const color =
    active === null
      ? "text-fg"
      : active === dep.key
        ? "text-accent"
        : "text-dim-3";

  return (
    <div>
      <span className="text-line-2">{`│${NBSP}${last ? "└─" : "├─"} `}</span>
      <button
        type="button"
        onMouseEnter={() => onActivate(dep.key)}
        onFocus={() => onActivate(dep.key)}
        className={`cursor-pointer border-0 bg-transparent p-0 transition-colors duration-[140ms] ${color}`}
      >
        {dep.name}
      </button>
      {dep.version ? (
        <span className="text-dim-3"> {dep.version}</span>
      ) : null}
    </div>
  );
}

export function Stack() {
  const [active, setActive] = useState<string | null>(null);
  const current: Dep | undefined = active ? byKey.get(active) : undefined;

  return (
    <section id="stack" aria-labelledby="stack-title" className="border-b border-line">
      <div
        data-reveal="1"
        className="flex flex-wrap items-baseline justify-between gap-4 px-gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)] font-mono text-[11px] tracking-[0.16em] text-dim-2"
      >
        <h2 id="stack-title">02 / STACK</h2>
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
          {dependencies.map((dep, index) => (
            <DepLine
              key={dep.key}
              dep={dep}
              last={index === dependencies.length - 1}
              active={active}
              onActivate={setActive}
            />
          ))}

          <div className="text-dim-3">
            ├─ <span className="text-dim-2">ai</span>
          </div>
          {ai.map((dep, index) => (
            <DepLine
              key={dep.key}
              dep={dep}
              last={index === ai.length - 1}
              active={active}
              onActivate={setActive}
            />
          ))}

          <div className="text-dim-3">
            ├─ <span className="text-dim-2">infrastructure</span>
          </div>
          {infrastructure.map((dep, index) => (
            <DepLine
              key={dep.key}
              dep={dep}
              last={index === infrastructure.length - 1}
              active={active}
              onActivate={setActive}
            />
          ))}

          <div className="text-dim-3">
            └─ <span className="text-dim-2">scripts</span>
          </div>
          {practices.map((practice, index) => (
            <div key={practice.name} className="text-dim-3">
              {`${INDENT}${index === practices.length - 1 ? "└─" : "├─"} ${practice.name} `}
              <span className="text-line-2">→</span> {practice.text}
            </div>
          ))}
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
              : "Passe o mouse (ou tab) por uma dependência para ver o que eu realmente faço com ela — sem barrinha de porcentagem."}
          </p>
        </div>
      </div>
    </section>
  );
}
