// ---------------------------------------------------------------------------
// Fonte única de verdade do conteúdo. Edite aqui para atualizar o site.
// ---------------------------------------------------------------------------

// A cor de cada linha do terminal é dado, então referencia o tema via CSS var.
const col = {
  fg: "var(--color-fg)",
  dim: "var(--color-dim)",
  dim2: "var(--color-dim-2)",
  accent: "var(--color-accent)",
} as const;

export const profile = {
  name: "Carlos André",
  role: "Full-Stack Engineer",
  // Domínio canônico. Usado em metadata, sitemap, robots e JSON-LD.
  siteUrl: "https://carlosandre.dev",
  location: "Rio de Janeiro · BR",
  coords: "-22.91, -43.17",
  years: "08 anos",
  availability: "open · freelance",
  email: "carlosandre1572@gmail.com",
  github: "carlos-dev",
  githubUrl: "https://github.com/carlos-dev",
  product: "cutcast.com.br",
  productUrl: "https://cutcast.com.br",
  tagline:
    "Construo sistemas de dados que precisam ficar de pé sozinhos. Este site é um deles.",
} as const;

export type TermLine = { prefix: string; text: string; color: string };

// A sequência de boot, que se digita sozinha no load.
export const SCRIPT: TermLine[] = [
  { prefix: "$", text: "./intro.sh", color: col.fg },
  { prefix: ">", text: "booting carlosandre.dev...", color: col.dim2 },
  { prefix: ">", text: "role: full-stack engineer · 8 anos", color: col.fg },
  {
    prefix: ">",
    text: "stack: [TypeScript, Next.js, Node, PostgreSQL]",
    color: col.fg,
  },
  {
    prefix: ">",
    text: "systems: 4 · own product: cutcast.com.br",
    color: col.accent,
  },
  {
    prefix: ">",
    text: "status: aberto para freelance e conversa",
    color: col.dim2,
  },
  { prefix: ">", text: "type 'help' to explore", color: col.fg },
];

export const TYPING_SPEED = 18; // ms per char
export const SECRET_COMMAND = "sudo hire-me";

const out = (text: string): TermLine => ({ prefix: " ", text, color: col.dim });
const hi = (text: string): TermLine => ({ prefix: " ", text, color: col.accent });

// Saída dos comandos interativos. O `run()` do terminal mapeia entrada para cá.
export const COMMANDS: Record<string, TermLine[]> = {
  help: [
    out("comandos disponíveis:"),
    out("  whoami        quem está do outro lado"),
    out("  ls projects   sistemas em produção"),
    out("  cat about     versão longa"),
    out("  contact       como me achar"),
    out("  theme         tentar trocar o tema"),
    out("  clear         limpar a tela"),
    out("  // tem um comando escondido aqui. você é dev, você acha."),
  ],
  whoami: [
    out("carlos andré · full-stack engineer · rio de janeiro, br"),
    out("8 anos · produto próprio + freelance"),
    hi("foco: sistemas de dados que ficam de pé sozinhos"),
  ],
  "ls projects": [
    out("drwxr-xr-x  cutcast/               live     next · node · postgres"),
    out("drwxr-xr-x  fumasil/               beta     react · ts · supabase"),
    out("drwxr-xr-x  radar-congresso/       syncing  next · python · postgres"),
    out("drwxr-xr-x  claude-investimentos/  private  python · ts · docker"),
  ],
  "cat about": [
    out("Oito anos escrevendo software e, no fundo, sempre o mesmo"),
    out("trabalho: pegar um sistema confuso e deixar ele legível."),
    out("Prefiro o projeto pequeno que funciona de verdade ao grande"),
    out("que só existe no slide."),
  ],
  contact: [
    hi("--email   carlosandre1572@gmail.com"),
    out("--github  github.com/carlos-dev"),
    out("--product cutcast.com.br"),
  ],
  theme: [
    out("theme: dark. only dark."),
    out("as luzes ficam apagadas — é assim que a gente lê melhor."),
  ],
};

export const SECRET_OUTPUT: TermLine[] = [
  hi("permission granted."),
  out("carlos@rj:~$ está montando o ambiente..."),
  hi("→ carlosandre1572@gmail.com · resposta em <24h"),
];

// ---------------------------------------------------------------------------

export type Viz =
  | { kind: "bars" }
  | { kind: "spark"; d: string; cy: number }
  | { kind: "matrix" };

export type Project = {
  idx: string;
  title: string;
  tag: string;
  tagAccent?: boolean;
  href?: string;
  desc: string;
  stack: string[];
  viz: Viz;
  metaLabel: string;
  status: string;
  live?: boolean;
};

export const projects: Project[] = [
  {
    idx: "01",
    title: "cutcast",
    tag: "OWN PRODUCT",
    tagAccent: true,
    href: "https://cutcast.com.br",
    desc: "Produto próprio: transforma vídeo longo em cortes prontos para publicar, sem passar por edição manual.",
    stack: ["Next.js", "Node", "PostgreSQL", "Supabase"],
    viz: { kind: "bars" },
    metaLabel: "cutcast.com.br",
    status: "LIVE",
    live: true,
  },
  {
    idx: "02",
    title: "Fumasil",
    tag: "APP",
    desc: "Acompanha quem está parando de fumar dia a dia — registro, recaída sem culpa e progresso visível.",
    stack: ["React", "TypeScript", "Supabase"],
    viz: {
      kind: "spark",
      d: "M0 40 L20 39 L40 36 L60 37 L80 31 L100 26 L120 27 L140 20 L160 15 L180 16 L200 9 L220 5 L240 3",
      cy: 3,
    },
    metaLabel: "// dias sem fumar, por usuário",
    status: "BETA",
  },
  {
    idx: "03",
    title: "radar-congresso",
    tag: "OPEN SOURCE",
    desc: "Fiscalização de parlamentares federais em cima de dados públicos vivos: gastos, votos e presença, atualizados na fonte.",
    stack: ["Next.js", "Python", "PostgreSQL"],
    viz: { kind: "matrix" },
    metaLabel: "// ingest de dados abertos",
    status: "SYNCING",
    live: true,
  },
  {
    idx: "04",
    title: "claude-investimentos",
    tag: "TOOLING",
    desc: "Suíte de análise de ativos para investidor pessoa física: consolida carteira, cruza indicadores e explica o porquê.",
    stack: ["Python", "TypeScript", "Docker"],
    viz: {
      kind: "spark",
      d: "M0 24 L20 30 L40 18 L60 22 L80 12 L100 20 L120 8 L140 16 L160 6 L180 14 L200 10 L220 18 L240 11",
      cy: 11,
    },
    metaLabel: "// série de preços, normalizada",
    status: "PRIVATE",
  },
];

export type Stat = {
  value: number;
  label: string;
  count: boolean;
  accent?: boolean;
};

export const stats: Stat[] = [
  { value: 8, label: "ANOS DE OFÍCIO", count: true, accent: true },
  { value: 4, label: "SISTEMAS EM PÉ", count: true },
  { value: 9, label: "TECNOLOGIAS EM USO", count: true },
  { value: 1, label: "PRODUTO PRÓPRIO", count: false },
];

// ---------------------------------------------------------------------------

export type Dep = {
  key: string;
  name: string;
  version: string;
  group: "dependencies" | "infrastructure";
  desc: string;
  used: string;
};

export const deps: Dep[] = [
  {
    key: "typescript",
    name: "typescript",
    version: "^5.6",
    group: "dependencies",
    desc: "Contrato antes do código. Se o tipo não fecha, o desenho está errado — não é o compilador que está sendo chato.",
    used: "cutcast · Fumasil · claude-investimentos",
  },
  {
    key: "next",
    name: "next",
    version: "^15.3",
    group: "dependencies",
    desc: "App router, server actions e cache como parte da arquitetura, não como detalhe de deploy.",
    used: "cutcast · radar-congresso",
  },
  {
    key: "react",
    name: "react",
    version: "^19.0",
    group: "dependencies",
    desc: "Estado explícito, componente burro na borda. A UI é uma função do dado, e o dado vem de um lugar só.",
    used: "cutcast · Fumasil · radar-congresso",
  },
  {
    key: "node",
    name: "node",
    version: "^22 lts",
    group: "dependencies",
    desc: "Onde vive o trabalho sujo: filas, jobs de vídeo, integrações que falham e precisam tentar de novo.",
    used: "cutcast · Fumasil",
  },
  {
    key: "tailwindcss",
    name: "tailwindcss",
    version: "^4.0",
    group: "dependencies",
    desc: "Sistema de restrição, não atalho. Escala fixa evita a decisão de 3px que ninguém revisa.",
    used: "cutcast · Fumasil · radar-congresso",
  },
  {
    key: "python",
    name: "python",
    version: "^3.12",
    group: "dependencies",
    desc: "Ingest, parsing e análise. Onde o dado é bagunçado, o script vence o serviço.",
    used: "radar-congresso · claude-investimentos",
  },
  {
    key: "postgresql",
    name: "postgresql",
    version: "^16",
    group: "infrastructure",
    desc: "A fonte da verdade. Constraint no banco é documentação que o runtime respeita.",
    used: "cutcast · radar-congresso · claude-investimentos",
  },
  {
    key: "supabase",
    name: "supabase",
    version: "latest",
    group: "infrastructure",
    desc: "Auth, storage e realtime resolvidos para poder gastar o tempo no produto.",
    used: "cutcast · Fumasil",
  },
  {
    key: "docker",
    name: "docker",
    version: "latest",
    group: "infrastructure",
    desc: "Mesma caixa na minha máquina e em produção. Encerra a discussão antes dela começar.",
    used: "claude-investimentos · radar-congresso",
  },
];

export const about = [
  "Sou o Carlos. Oito anos escrevendo software e, no fundo, sempre o mesmo trabalho: pegar um sistema confuso e deixar ele legível.",
  "Prefiro o projeto pequeno que funciona de verdade ao grande que só existe no slide. Toco produto próprio porque gosto de estar perto de quem usa a coisa — o elogio e o bug chegam pelo mesmo canal, e isso mantém a régua honesta. O resto é ofício: ler o log inteiro, medir antes de mexer, cortar o que não serve.",
  "Se você chegou até aqui lendo em vez de rolar, a gente provavelmente se entende.",
] as const;
