import { Fragment } from "react";
import { projects, stats, type Project, type Viz } from "@/lib/content";

const BAR_DELAYS = [
  "0ms", "-.2s", "-.4s", "-.6s", "-.8s", "-1s",
  "-1.2s", "-1.4s", "-1.6s", "-1.8s", "-2s", "-.1s",
];

function Visualization({ viz }: { viz: Viz }) {
  if (viz.kind === "bars") {
    return (
      <span className="flex h-11 items-end gap-[3px]">
        {BAR_DELAYS.map((delay, i) => (
          <i
            key={i}
            style={{ animationDelay: delay }}
            className={`h-full flex-1 origin-bottom animate-bars bg-line ${
              i % 3 === 0
                ? "group-hover:bg-accent group-focus-within:bg-accent"
                : ""
            }`}
          />
        ))}
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
          d={viz.d}
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

  // matrix — cells injected client-side by <SiteEffects>
  return (
    <div
      data-matrix="1"
      aria-hidden="true"
      className="grid h-11 grid-cols-[repeat(26,1fr)] content-center gap-[3px]"
    />
  );
}

function Card({ p }: { p: Project }) {
  const inner = (
    <>
      <span className="pt-2.5 font-mono text-[11px] tracking-[0.14em] text-dim-3 group-hover:text-accent group-focus-within:text-accent">
        {p.idx}
      </span>
      <div className="grid min-w-0 grid-cols-1 gap-[clamp(16px,2.5vw,40px)] min-[900px]:grid-cols-[minmax(0,1.6fr)_minmax(0,.7fr)]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-3.5">
            <h3 className="text-project font-bold leading-none tracking-[-0.035em]">
              {p.title}
            </h3>
            <span
              className={`border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] ${
                p.tagAccent ? "text-accent" : "text-dim-2"
              }`}
            >
              {p.tag}
            </span>
          </div>
          <p className="mt-3.5 max-w-[52ch] text-body leading-[1.5] text-pretty text-dim">
            {p.desc}
          </p>
          <div className="mt-[18px] flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11px] text-dim-2">
            {p.stack.map((tech, i) => (
              <Fragment key={tech}>
                <span>{tech}</span>
                {i < p.stack.length - 1 && (
                  <span className="text-line-2">·</span>
                )}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-2.5">
          <Visualization viz={p.viz} />
          <div className="flex items-center justify-between gap-3 font-mono text-[10px] tracking-[0.12em] text-dim-3">
            <span>{p.metaLabel}</span>
            {p.live ? (
              <span className="flex items-center gap-1.5 text-accent">
                <span className="size-[5px] animate-dot rounded-full bg-accent" />
                {p.status}
              </span>
            ) : (
              <span>{p.status}</span>
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
      {p.href ? (
        <a href={p.href} target="_blank" rel="noopener" className={rowClass}>
          {inner}
        </a>
      ) : (
        <div className={rowClass}>{inner}</div>
      )}
    </li>
  );
}

export function SelectedWork() {
  return (
    <section id="work" className="border-b border-line">
      <div
        data-reveal="1"
        className="flex flex-wrap items-baseline justify-between gap-4 px-gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)] font-mono text-[11px] tracking-[0.16em] text-dim-2"
      >
        <span>01 / SELECTED WORK</span>
        <span>04 systems · running</span>
      </div>

      <ol className="list-none border-t border-line">
        {projects.map((p) => (
          <Card key={p.idx} p={p} />
        ))}
      </ol>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] font-mono">
        {stats.map((s, i) => {
          const last = i === stats.length - 1;
          return (
            <div
              key={s.label}
              data-reveal="1"
              className={`px-gutter py-[clamp(24px,3vw,40px)] ${
                last ? "" : "border-r border-line"
              }`}
            >
              <div
                {...(s.count ? { "data-count": String(s.value) } : {})}
                className={`text-stat font-bold tracking-[-0.03em] ${
                  s.accent ? "text-accent" : "text-fg"
                }`}
              >
                {s.value}
              </div>
              <div className="mt-2 text-[10px] tracking-[0.14em] text-dim-3">
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
