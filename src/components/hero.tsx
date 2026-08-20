import { profile } from "@/lib/content";
import { Terminal } from "./terminal";

const [firstName, ...rest] = profile.name.split(" ");
const lastName = rest.join(" ");

const meta = [
  { k: "ROLE", v: profile.role, accent: false },
  { k: "EXPERIENCE", v: profile.years, accent: false },
  { k: "LOCATION", v: profile.coords, accent: false },
  { k: "AVAILABILITY", v: profile.availability, accent: true },
];

export function Hero() {
  return (
    <section
      id="boot"
      className="relative grid grid-cols-1 items-stretch border-b border-line lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
    >
      <div className="flex min-w-0 flex-col justify-between gap-[clamp(40px,6vw,80px)] border-b border-line px-gutter pt-[clamp(40px,7vw,96px)] pb-[clamp(40px,6vw,72px)] lg:border-b-0 lg:border-r">
        <div>
          <p className="mb-[clamp(28px,4vw,44px)] animate-glitch font-mono text-[11px] tracking-[0.16em] text-dim-2">
            00 / BOOT SEQUENCE
          </p>
          <h1 className="text-display font-extrabold leading-[0.84] tracking-[-0.045em] text-balance">
            {firstName}
            <br />
            {lastName}
            <span className="text-accent">.</span>
          </h1>
          <p className="mt-[clamp(24px,3vw,32px)] max-w-[34ch] text-lead leading-[1.5] text-pretty text-dim">
            {profile.tagline}
          </p>
        </div>

        <dl className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] border-t border-line font-mono">
          {meta.map((m, i) => {
            const last = i === meta.length - 1;
            return (
              <div
                key={m.k}
                className={[
                  "pt-4 pb-[18px]",
                  i === 0 ? "pr-[18px]" : last ? "pl-[18px]" : "px-[18px]",
                  last ? "" : "border-r border-line",
                ].join(" ")}
              >
                <dt className="text-[10px] tracking-[0.14em] text-dim-3">
                  {m.k}
                </dt>
                <dd
                  className={`mt-2 text-[12.5px] ${m.accent ? "text-accent" : "text-fg"}`}
                >
                  {m.v}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>

      <Terminal />
    </section>
  );
}
