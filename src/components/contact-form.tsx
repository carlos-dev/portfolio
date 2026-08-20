"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle", message: "" };

const labelClass =
  "mb-1.5 block font-mono text-[10px] tracking-[0.14em] text-dim-3";
const fieldClass =
  "w-full border border-line bg-surface-2 px-3 py-2.5 font-mono text-[13px] leading-[1.5] text-fg caret-accent outline-none";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initial);

  return (
    <div className="relative mb-[clamp(40px,5vw,64px)] max-w-[640px] border border-line bg-surface">
      {/* barra de título */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-surface-2 px-[14px] py-2.5 font-mono text-[10.5px] tracking-[0.1em] text-dim-2">
        <span className="flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <span key={index} className="size-[7px] border border-line-2" />
          ))}
        </span>
        <span>contact.sh — compose</span>
        <span className="text-dim-3">msg</span>
      </div>

      {state.status === "success" ? (
        <div
          role="status"
          aria-live="polite"
          className="px-4 py-7 font-mono text-[13px] leading-[1.9]"
        >
          <div className="text-fg">
            <span className="text-accent">$</span> ./send.sh
          </div>
          <div className="text-accent">{"> message delivered ✓"}</div>
          <div className="text-dim-2">
            {"> respondo em <24h. valeu por escrever."}
          </div>
        </div>
      ) : (
        <form action={formAction} className="p-4">
          {/* honeypot — invisível para humanos, pega bot */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] h-px w-px overflow-hidden"
          >
            <label htmlFor="company">Company</label>
            <input
              id="company"
              name="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className={labelClass} htmlFor="name">
                  NAME
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  placeholder="seu nome"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor="email">
                  EMAIL
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  autoComplete="email"
                  placeholder="voce@dominio.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass} htmlFor="message">
                MESSAGE
              </label>
              <textarea
                id="message"
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                placeholder="o que você quer colocar de pé?"
                className={`${fieldClass} resize-y`}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[12.5px]">
              <button
                type="submit"
                disabled={pending}
                className="cursor-pointer border border-accent bg-accent px-[18px] py-2.5 font-mono text-[12.5px] tracking-[0.04em] text-bg transition-opacity duration-[140ms] disabled:cursor-wait disabled:opacity-70"
              >
                {pending ? "$ sending..." : "$ send --message"}
              </button>

              <span aria-live="polite" className="min-h-[1.2em]">
                {pending && (
                  <span className="text-dim-2">{"> transmitindo..."}</span>
                )}
                {!pending && state.status === "error" && (
                  <span className="text-dim">
                    <span className="text-accent">!</span> {state.message}
                  </span>
                )}
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
