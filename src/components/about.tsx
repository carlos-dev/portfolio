import { about } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="border-b border-line">
      <p
        data-reveal="1"
        className="px-gutter pt-[clamp(40px,6vw,80px)] pb-[clamp(24px,3vw,36px)] font-mono text-[11px] tracking-[0.16em] text-dim-2"
      >
        03 / ABOUT
      </p>

      <div
        data-reveal="1"
        className="max-w-[68ch] px-gutter pb-[clamp(48px,7vw,104px)]"
      >
        <p className="text-lead-lg font-medium leading-[1.32] tracking-[-0.02em] text-pretty text-fg">
          {about[0]}
        </p>
        {about.slice(1).map((para, i) => (
          <p
            key={i}
            className="mt-[clamp(20px,2.5vw,28px)] text-body-lg leading-[1.6] text-pretty text-dim"
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
