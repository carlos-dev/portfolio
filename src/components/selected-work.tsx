import { Fragment } from "react";
import { projects, stats, type Project, type Viz } from "@/lib/content";

// Agrupa amostras marcadas em cortes contíguos: "..##..###." -> corte 0 e 1.
// Serve para o destaque acender por corte, não amostra por amostra.
function cutGroups(mask: string) {
  const groups = new Map<number, number>();
  let group = -1;
  for (let index = 0; index < mask.length; index++) {
    if (mask[index] !== "#") continue;
    if (mask[index - 1] !== "#") group += 1;
    groups.set(index, group);
  }
  return groups;
}

function Visualization({ viz }: { viz: Viz }) {
  // cutcast: o sinal do vídeo longo, com as regiões que viram corte em
  // destaque. Altura é dado e fica parada — o que anima é só o destaque.
  if (viz.kind === "wave") {
    const groups = cutGroups(viz.cuts);
    return (
      <span aria-hidden="true" className="flex h-11 items-end gap-[2px]">
        {[...viz.heights].map((height, index) => {
          const group = groups.get(index);
          return (
            <i
              key={index}
              style={{
                height: `${20 + Number(height) * 8.5}%`,
                animationDelay:
                  group === undefined ? undefined : `${-group * 0.6}s`,
              }}
              className={`block flex-1 ${
                group === undefined
                  ? "bg-line group-hover:bg-line-2 group-focus-within:bg-line-2"
                  : "animate-cut bg-accent"
              }`}
            />
          );
        })}
      </span>
    );
  }

  if (viz.kind === "spark") {
    return (
      <svg
        viewBox="0 0 240 44"
        preserveAspectRatio="none"
        className="h-11 w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          data-spark="1"
          d={viz.path}
          fill="none"
          strokeWidth={1.25}
          className="stroke-line-2 group-hover:stroke-accent group-focus-within:stroke-accent"
        />
        <circle
          r={3}
          cx={240}
          cy={viz.cy}
          className="animate-dot-slow fill-accent"
        />
      </svg>
    );
  }

  // leveme: as paradas de um itinerário, ligadas pelo trajeto. Reusa o
  // data-spark, então o traço se desenha sozinho no reveal de scroll.
  if (viz.kind === "route") {
    const stops = viz.points
      .split(" ")
      .map((pair) => pair.split(",").map(Number));
    const line = stops
      .map(([stopX, stopY]) => `${stopX} ${stopY}`)
      .join(" L");
    return (
      <svg
        viewBox="0 0 240 44"
        preserveAspectRatio="none"
        className="h-11 w-full overflow-visible"
        aria-hidden="true"
      >
        <path
          data-spark="1"
          d={`M${line}`}
          fill="none"
          strokeWidth={1.25}
          className="stroke-line-2 group-hover:stroke-accent group-focus-within:stroke-accent"
        />
        {stops.map(([stopX, stopY], index) => {
          const edge = index === 0 || index === stops.length - 1;
          return (
            <circle
              key={index}
              cx={stopX}
              cy={stopY}
              r={edge ? 3 : 2}
              className={
                edge
                  ? "fill-accent"
                  : "fill-line-2 group-hover:fill-accent group-focus-within:fill-accent"
              }
            />
          );
        })}
      </svg>
    );
  }

  // radar-congresso: painel de votação nominal, varrido pelo ingest.
  return (
    <span
      aria-hidden="true"
      className="flex h-11 flex-col justify-center gap-[3px]"
    >
      {viz.rows.map((row, rowIndex) => (
        <span key={row} className="flex gap-[3px]">
          {[...row].map((cell, colIndex) => (
            <i
              key={colIndex}
              style={{
                animationDelay: `${(rowIndex * row.length + colIndex) * 0.028}s`,
              }}
              className={`block h-[11px] flex-1 animate-ingest ${
                cell === "#"
                  ? "bg-line-2 group-hover:bg-accent group-focus-within:bg-accent"
                  : "border border-line"
              }`}
            />
          ))}
        </span>
      ))}
    </span>
  );
}

function Card({ project }: { project: Project }) {
  const inner = (
    <>
      <span className="pt-2.5 font-mono text-[11px] tracking-[0.14em] text-dim-3 group-hover:text-accent group-focus-within:text-accent">
        {project.idx}
      </span>
      <div className="grid min-w-0 grid-cols-1 gap-[clamp(16px,2.5vw,40px)] min-[900px]:grid-cols-[minmax(0,1.6fr)_minmax(0,.7fr)]">
        <div className="min-w-0">
          {/* items-center, não baseline: o badge é caixa com borda e padding,
              então alinhar pela baseline do texto interno joga a caixa 16px
              abaixo do centro do título. */}
          <div className="flex flex-wrap items-center gap-3.5">
            <h3 className="text-project font-bold leading-none tracking-[-0.035em]">
              {project.title}
            </h3>
            <span
              className={`border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] ${
                project.tagAccent ? "text-accent" : "text-dim-2"
              }`}
            >
              {project.tag}
            </span>
          </div>
          <p className="mt-3.5 max-w-[52ch] text-body leading-[1.5] text-pretty text-dim">
            {project.desc}
          </p>
          <div className="mt-[18px] flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11px] text-dim-2">
            {project.stack.map((tech, index) => (
              <Fragment key={tech}>
                <span>{tech}</span>
                {index < project.stack.length - 1 && (
                  <span className="text-line-2">·</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <Visualization viz={project.viz} />
          <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.12em] text-dim-3">
            <span>{project.metaLabel}</span>
            {project.live ? (
              <span className="flex items-center gap-1.5 text-accent">
                <span className="size-[5px] animate-dot rounded-full bg-accent" />
                {project.status}
              </span>
            ) : (
              <span>{project.status}</span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const rowClass =
    "grid grid-cols-[64px_1fr] items-start gap-[clamp(16px,3vw,40px)] px-gutter py-[clamp(24px,3.4vw,44px)]";

  return (
    <li
      data-reveal="1"
      className="group border-b border-line transition-colors duration-150 ease-[cubic-bezier(.2,.8,.2,1)] hover:bg-surface focus-within:bg-surface"
    >
      {project.href ? (
        <a href={project.href} target="_blank" rel="noopener" className={rowClass}>
          {inner}
          <span className="sr-only">(abre em nova aba)</span>
        </a>
      ) : (
        <div className={rowClass}>{inner}</div>
      )}
    </li>
  );
}

export function SelectedWork() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-b border-line">
      <div
        data-reveal="1"
        className="flex flex-wrap items-baseline justify-between gap-4 px-gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)] font-mono text-[11px] tracking-[0.16em] text-dim-2"
      >
        <h2 id="work-title">01 / SELECTED WORK</h2>
        <span>04 systems · running</span>
      </div>

      <ol className="list-none border-t border-line">
        {projects.map((project) => (
          <Card key={project.idx} project={project} />
        ))}
      </ol>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] font-mono">
        {stats.map((stat, index) => {
          const last = index === stats.length - 1;
          return (
            <div
              key={stat.label}
              data-reveal="1"
              className={`px-gutter py-[clamp(24px,3vw,40px)] ${
                last ? "" : "border-r border-line"
              }`}
            >
              <div
                {...(stat.count ? { "data-count": String(stat.value) } : {})}
                className={`text-stat font-bold tracking-[-0.03em] ${
                  stat.accent ? "text-accent" : "text-fg"
                }`}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.14em] text-dim-3">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
