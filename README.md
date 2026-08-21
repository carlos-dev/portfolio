# carlosandre.dev — portfólio

Portfólio pessoal com conceito de **"sistema vivo"**: a interface se comporta como
um sistema em execução — dá boot, digita sozinha, exibe dados vivos e responde.

Stack: **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4**. Dark minimal
com um único acento lime (`#a3e635`), tipografia Inter Tight + JetBrains Mono.

## Rodar

```bash
npm run dev     # desenvolvimento (http://localhost:3000)
npm run build   # build de produção
npm run start   # servir o build
npm run lint    # eslint
```

## Estrutura

```
src/
  app/
    layout.tsx           # fontes (next/font), metadata, skip-link
    page.tsx             # compõe as seções + build stamp + JSON-LD
    globals.css          # tema Tailwind v4 (@theme: cores, fontes, escala tipográfica, animações) + keyframes
    robots.ts            # robots.txt gerado
    sitemap.ts           # sitemap.xml gerado
    opengraph-image.tsx  # card social 1200x630, renderizado no build
  components/
    site-header.tsx   # header fixo + relógio vivo   (client)
    hero.tsx          # boot section + nome + metadados
    terminal.tsx      # terminal que digita sozinho e aceita comandos (client)
    selected-work.tsx # cards de projeto + vizualizações vivas + stats
    stack.tsx         # árvore de dependências + inspector (client)
    about.tsx         # texto sobre
    site-footer.tsx   # contato estilo terminal + heatmap em canvas (client)
    site-effects.tsx  # reveal on-scroll, count-up, matrix, sparklines (client)
  lib/
    content.ts        # TODO O CONTEÚDO editável: perfil, projetos, deps, comandos
```

## Como editar o conteúdo

Quase tudo vive em **`src/lib/content.ts`**:

- `profile` — nome, papel, localização, e-mail, GitHub, produto.
- `projects` — os cards de "Selected Work" (título, tag, stack, descrição, viz, status).
- `deps` — a árvore de dependências e os textos do inspector.
- `SCRIPT` / `COMMANDS` / `SECRET_COMMAND` — o boot e os comandos do terminal.
- `about` — os parágrafos da seção sobre.

## Formulário de contato (Resend)

O footer tem um formulário em estilo terminal que envia e-mail via **server action**
(`src/app/actions/contact.ts`) usando [Resend](https://resend.com). Sem configuração
ele mostra um erro tratado e os canais diretos continuam funcionando.

Para ativar:

1. Crie uma API key gratuita em https://resend.com/api-keys.
2. `cp .env.example .env.local` e preencha `RESEND_API_KEY`.
3. (Opcional) `CONTACT_TO_EMAIL` e `CONTACT_FROM_EMAIL`. Enquanto não verificar um
   domínio próprio na Resend, deixe o remetente `onboarding@resend.dev`.
4. Na Vercel, adicione as mesmas variáveis em Project → Settings → Environment Variables.

Proteções: validação no servidor, honeypot anti-bot e limites de tamanho por campo.

## Notas de implementação

- O design original foi gerado no Claude Design e **portado** para React idiomático:
  as animações imperativas viraram hooks/efeitos, o styling é todo Tailwind v4 com
  tokens de tema, o responsivo virou utilities e o hover dos cards virou `group`.
- Acessibilidade: respeita `prefers-reduced-motion` (sem auto-typing/glitch), foco
  visível, skip-link, `aria-live` no terminal (ligado só depois do boot, para não
  anunciar caractere por caractere) e navegação por teclado na árvore de dependências.
- SEO: canonical, Open Graph + Twitter card com imagem gerada no build, `robots.txt`,
  `sitemap.xml` e JSON-LD (`Person`). O domínio canônico é `profile.siteUrl`
  em `src/lib/content.ts` — trocar lá reflete em todos eles.
- O terminal aceita: `help`, `whoami`, `ls projects`, `cat about`, `contact`,
  `theme`, `clear` — e tem um comando escondido.
