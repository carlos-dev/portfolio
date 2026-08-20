"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SCRIPT,
  COMMANDS,
  SECRET_COMMAND,
  SECRET_OUTPUT,
  TYPING_SPEED,
  type TermLine,
} from "@/lib/content";

const FG = "var(--color-fg)";
const DIM2 = "var(--color-dim-2)";

export function Terminal() {
  const [lines, setLines] = useState<TermLine[]>([]);
  const [typing, setTyping] = useState(true);
  const [input, setInput] = useState("");
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    const box = logRef.current;
    if (box) requestAnimationFrame(() => (box.scrollTop = box.scrollHeight));
  }, []);

  // Boot: digita cada linha caractere por caractere. O efeito só liga a
  // animação movida a timer (um sistema externo); todas as transições de
  // estado vivem dentro da rotina async `boot` que ele dispara.
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(setTimeout(res, ms)));

    const boot = async () => {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        setLines(SCRIPT.slice());
        setTyping(false);
        return;
      }
      setLines([]);
      setTyping(true);
      for (let i = 0; i < SCRIPT.length; i++) {
        if (cancelled) return;
        const line = SCRIPT[i];
        setLines((s) => s.concat([{ ...line, text: "" }]));
        for (let c = 1; c <= line.text.length; c++) {
          await wait(TYPING_SPEED + Math.random() * TYPING_SPEED * 0.6);
          if (cancelled) return;
          setLines((s) => {
            const next = s.slice();
            next[i] = { ...line, text: line.text.slice(0, c) };
            return next;
          });
          scrollToBottom();
        }
        await wait(i === 0 ? 340 : 160);
      }
      if (!cancelled) setTyping(false);
    };

    void boot();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [scrollToBottom]);

  const push = useCallback(
    (newLines: TermLine[]) => {
      setLines((s) => s.concat(newLines));
      scrollToBottom();
    },
    [scrollToBottom],
  );

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      push([{ prefix: "$", text: raw, color: FG }]);
      if (!cmd) return;
      if (cmd === "clear") return setLines([]);
      if (cmd === SECRET_COMMAND.toLowerCase()) return push(SECRET_OUTPUT);
      if (cmd === "ls") return push(COMMANDS["ls projects"]);
      if (cmd === "about" || cmd === "cat") return push(COMMANDS["cat about"]);
      if (COMMANDS[cmd]) return push(COMMANDS[cmd]);
      push([
        { prefix: " ", text: `command not found: ${cmd} — tente 'help'`, color: DIM2 },
      ]);
    },
    [push],
  );

  return (
    <div className="flex min-w-0 flex-col justify-center gap-[14px] bg-bg px-gutter py-[clamp(24px,4vw,48px)]">
      <div
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-[clamp(340px,44vh,460px)] cursor-text flex-col border border-line bg-surface"
      >
        {/* barra de título */}
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line bg-surface-2 px-[14px] py-2.5 font-mono text-[10.5px] tracking-[0.1em] text-dim-2">
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-[7px] border border-line-2" />
            ))}
          </span>
          <span>intro.sh — bash — 80×24</span>
          <span className="text-dim-3">v2.6.1</span>
        </div>

        {/* log */}
        <div
          ref={logRef}
          role="log"
          aria-live={typing ? "off" : "polite"}
          aria-label="Saída do terminal"
          className="flex-1 overflow-y-auto px-[14px] py-4 font-mono text-term leading-[1.75]"
        >
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex gap-2 whitespace-pre-wrap [overflow-wrap:anywhere]"
            >
              <span className="shrink-0 text-line-2">{line.prefix}</span>
              <span style={{ color: line.color }}>{line.text}</span>
            </div>
          ))}
          {typing && (
            <span className="inline-block h-[14px] w-[7px] animate-blink bg-accent align-[-2px]" />
          )}
        </div>

        {/* prompt */}
        <div className="flex shrink-0 items-center gap-2 border-t border-line px-[14px] py-3 font-mono text-term">
          <label htmlFor="term-input" className="shrink-0 text-accent">
            $
          </label>
          <input
            id="term-input"
            ref={inputRef}
            type="text"
            autoComplete="off"
            spellCheck={false}
            aria-label="Digite um comando. Tente help."
            placeholder="help"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              const v = input;
              setInput("");
              run(v);
            }}
            className="min-w-0 flex-1 border-0 bg-transparent font-mono text-term text-fg caret-accent outline-none"
          />
        </div>
      </div>

      <p className="font-mono text-[10.5px] tracking-[0.08em] text-dim-3">
        {"// terminal interativo — "}
        <span className="text-dim-2">help</span>,{" "}
        <span className="text-dim-2">ls projects</span>,{" "}
        <span className="text-dim-2">whoami</span>
      </p>
    </div>
  );
}
