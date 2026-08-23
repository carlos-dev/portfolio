"use server";

import { Resend } from "resend";
import { profile } from "@/lib/content";

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clip = (value: string, max: number) => value.trim().slice(0, max);


// Diagnóstico temporário, ligado só com CONTACT_DEBUG=1 no ambiente. Sem a
// variável a mensagem continua genérica — o detalhe do erro é assunto de log,
// não de tela. Serve para descobrir a causa em produção sem caçar log.
function detalharErro(erro: unknown, from: string) {
  if (process.env.CONTACT_DEBUG !== "1") return "";
  const dados = erro as { name?: string; statusCode?: number };
  return ` [${dados.name ?? "erro"} · ${dados.statusCode ?? "?"} · from=${JSON.stringify(from)}]`;
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: usuário de verdade nunca preenche este campo escondido.
  if (typeof formData.get("company") === "string" && formData.get("company")) {
    return { status: "success", message: "message delivered ✓" };
  }

  const name = clip(String(formData.get("name") ?? ""), 120);
  const email = clip(String(formData.get("email") ?? ""), 200);
  const message = clip(String(formData.get("message") ?? ""), 4000);

  if (!name) return { status: "error", message: "name: required" };
  if (!EMAIL_RE.test(email))
    return { status: "error", message: "email: invalid address" };
  if (message.length < 10)
    return { status: "error", message: "message: too short (min 10 chars)" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return {
      status: "error",
      message: "mail service offline — tente pelo e-mail direto",
    };
  }

  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: email,
      subject: `[carlosandre.dev] ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      // O `from` vai junto no log: erro de remetente é a falha mais comum
      // aqui, e ver o valor exato denuncia aspas que vieram no copiar-colar.
      console.error("Resend error:", error, { from, to });
      return {
        status: "error",
        message: `falha no envio${detalharErro(error, from)} — tente novamente ou use o e-mail direto`,
      };
    }

    return { status: "success", message: "message delivered ✓" };
  } catch (err) {
    console.error("Contact action threw:", err);
    return {
      status: "error",
      message: "falha inesperada — tente pelo e-mail direto",
    };
  }
}
