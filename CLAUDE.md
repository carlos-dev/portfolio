@AGENTS.md

# carlosandre.dev

Portfólio de página única. A interface imita um sistema em execução: dá boot,
digita sozinha, anima dados vivos. Uma rota, sem banco, sem auth.

## Comandos

```bash
npm run dev     # http://localhost:3000
npm run build   # produção
npm run lint    # eslint
```

**Não existe suíte de testes.** A verificação antes de commitar é:

```bash
npx tsc --noEmit && npm run lint && npm run build
```

O `build` é o que mais pega coisa: todas as rotas precisam sair como
`○ (Static)`. Se alguma virar dinâmica, algo passou a ler request em runtime.

## Conteúdo: uma fonte só

IMPORTANT: todo texto do site vive em `src/lib/content.ts`. Componentes leem de
lá e nunca embutem string de conteúdo — vale para copy, projetos, stack,
comandos do terminal e os textos do inspector.

`profile.siteUrl` alimenta metadata, canonical, sitemap, robots e JSON-LD ao
mesmo tempo. Trocar de domínio é uma linha, e só ali.

## Design tokens

Os tokens vivem em `@theme` no `src/app/globals.css`: cores, escala tipográfica
fluida (`--text-display`, `--text-body`, …) e animações. Use as utilities
(`bg-bg`, `text-dim`, `text-project`, `animate-bars`) em vez de valores soltos.

Tema é dark-only com um único acento (`--color-accent`, lime). Não introduza uma
segunda cor de destaque.

Contraste: mínimo AA contra o fundo mais claro em que a cor aparece
(`--color-surface-2`, não o `--color-bg`). `--color-dim-3` é usado em texto de
10px e já está perto do limite.

## Movimento

O `globals.css` mata animação CSS sob `prefers-reduced-motion`. Isso **não**
cobre animação feita em JS.

IMPORTANT: toda animação em JS checa
`matchMedia("(prefers-reduced-motion: reduce)")` por conta própria — veja
`terminal.tsx`, `site-effects.tsx` e `site-footer.tsx`. Animação nova em JS
precisa da mesma checagem.

O loop de canvas usa `requestAnimationFrame` com throttle e pausa fora da
viewport via `IntersectionObserver`. Não volte para `setInterval`, e não
redimensione o buffer do canvas dentro do loop.

## Estrutura acessível

Regras que já foram quebradas uma vez e que nenhum lint pega:

- `<header>` e `<footer>` ficam **fora** de `<main>`. Como descendentes dele
  perdem os papéis `banner` e `contentinfo`.
- Cada rótulo de seção (`01 / SELECTED WORK`, …) é um `<h2>` com `id`, e a
  `<section>` aponta para ele via `aria-labelledby`. Isso mantém a hierarquia
  h1 → h2 → h3 e dá nome acessível às regiões.
- Links externos levam `<span className="sr-only">(abre em nova aba)</span>`.
- O terminal só liga `aria-live` depois do boot: durante a digitação o texto
  muda a cada caractere e um leitor de tela reanunciaria a linha inteira.
- IMPORTANT: nunca defina um componente dentro de outro. Definido lá dentro,
  ele vira um tipo novo a cada render e o React remonta a subárvore — em
  `stack.tsx` isso destruía o botão que acabara de receber foco e derrubava o
  foco no `<body>`, quebrando a navegação por teclado da árvore. Passe props.

Antes de dar por pronta uma mudança de layout, rode uma auditoria Lighthouse de
acessibilidade contra o build de produção. O baseline é 100.

## Nomeação

IMPORTANT: nada de identificador de uma letra — vale para prop, parâmetro de
callback, variável local, contador de laço, chave de objeto e constante
exportada. A única exceção é `_`, marcador de parâmetro não usado. Prop e
constante exportada são os piores casos, porque são superfície pública:
`<Card p={project} />` e `C.accent` obrigam o leitor a abrir outro arquivo.

Identificadores em inglês; comentários e texto de UI em pt-BR.

`npm run lint` reprova: `id-length` está ligado no `eslint.config.mjs`. A tabela
de substituições e a armadilha da renomeação em lote estão na skill `naming`,
em `.agents/skills/naming/`.

## Server action

`src/app/actions/contact.ts` é a única coisa que roda em runtime. Valida tudo no
servidor (o cliente não é fonte de verdade), tem honeypot e limite de tamanho
por campo. Sem `RESEND_API_KEY` ele degrada para uma mensagem de erro tratada e
os canais diretos continuam na página — não troque isso por um throw.

## Skills

`.agents/skills/` tem skills versionadas no repo: `accessibility`,
`core-web-vitals`, `seo`, `vercel-react-best-practices` e
`vercel-composition-patterns`. Consulte a skill correspondente antes de mexer no
assunto — elas pegam coisa que passa batido.

`.claude/skills/` é espelho de symlinks gerado pelo CLI de skills. É gitignored;
não edite por lá.
