"use client";

import { useEffect, useState } from "react";
import {
  notes,
  NOTE_MAX_LINES,
  NOTE_PAUSE_MS,
  NOTE_TYPING_SPEED,
} from "@/lib/content";

type Line = { time: string; text: string; accent: boolean };

const stamp = () => {
  const now = new Date();
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

export function NoteLog() {
  const [lines, setLines] = useState<Line[]>([]);
  const [typing, setTyping] = useState(false);

  // As linhas nascem no cliente porque carregam a hora: gerar no servidor
  // daria um horário e hidratar daria outro.
  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((res) => timers.push(setTimeout(res, ms)));

    // Mesmo padrão do terminal: o efeito só liga a animação movida a timer
    // (um sistema externo) e toda transição de estado vive na rotina async.
    const loop = async () => {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const toLine = (note: (typeof notes)[number]): Line => ({
        time: stamp(),
        text: note.text,
        accent: Boolean(note.accent),
      });

      if (reduced) {
        setLines(notes.slice(0, NOTE_MAX_LINES).map(toLine));
        return;
      }

      // Começa com duas prontas para a caixa não abrir vazia.
      setLines(notes.slice(0, 2).map(toLine));

      let index = 2;
      await wait(900);
      while (!cancelled) {
        const note = notes[index % notes.length];
        index += 1;
        const time = stamp();
        const accent = Boolean(note.accent);

        setTyping(true);
        setLines((prev) =>
          prev.concat([{ time, text: "", accent }]).slice(-NOTE_MAX_LINES),
        );

        for (let chars = 1; chars <= note.text.length; chars++) {
          await wait(NOTE_TYPING_SPEED + Math.random() * 26);
          if (cancelled) return;
          setLines((prev) => {
            const next = prev.slice();
            next[next.length - 1] = {
              time,
              text: note.text.slice(0, chars),
              accent,
            };
            return next;
          });
        }

        setTyping(false);
        await wait(NOTE_PAUSE_MS);
      }
    };

    void loop();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div
      data-reveal="1"
      // Altura própria, não a da coluna de texto: acompanhar o texto levava o
      // painel a 610px e, como o log é alinhado embaixo, virava um vazio. O
      // teto aqui é o número de frases — mais altura só rende espaço vago.
      className="flex min-w-0 flex-col border border-line bg-surface-3"
    >
      <div className="flex flex-none items-center justify-between gap-3 border-b border-line px-4 py-3 font-mono text-[10px] tracking-[0.14em] text-dim-3">
        <span>~/notes.log · tail -f</span>
        <span className="flex items-center gap-1.5 text-accent">
          <span className="size-[5px] animate-dot rounded-full bg-accent" />
          LIVE
        </span>
      </div>

      <div
        role="log"
        // aria-live fica DESLIGADO de propósito. O texto muda a cada caractere
        // e o laço não termina nunca: um leitor de tela ficaria narrando isto
        // para sempre. Com `role="log"` o conteúdo segue navegável sob demanda,
        // só não se anuncia sozinho. Difere do terminal, onde o aria-live liga
        // depois do boot porque lá as respostas de comando são pedidas.
        aria-live="off"
        aria-label="Notas pessoais"
        className="flex min-h-[clamp(250px,33vh,360px)] flex-1 flex-col justify-end gap-0.5 overflow-hidden p-4 font-mono text-term leading-[1.9]"
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className="flex gap-2.5 whitespace-pre-wrap [overflow-wrap:anywhere]"
          >
            <span className="flex-none text-line-2">{line.time}</span>
            <span className={line.accent ? "text-accent" : "text-dim"}>
              {line.text}
            </span>
          </div>
        ))}
        {typing ? (
          <span className="ml-[62px] inline-block h-[13px] w-[7px] animate-blink self-start bg-accent" />
        ) : null}
      </div>
    </div>
  );
}
