// ---------------------------------------------------------------------------
// Fonte única de verdade do conteúdo. Edite aqui para atualizar o site.
// ---------------------------------------------------------------------------

// A cor de cada linha do terminal é dado, então referencia o tema via CSS var.
const colors = {
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
  { prefix: "$", text: "./intro.sh", color: colors.fg },
  { prefix: ">", text: "booting carlosandre.dev...", color: colors.dim2 },
  { prefix: ">", text: "role: full-stack engineer · 8 anos", color: colors.fg },
  {
    prefix: ">",
    text: "stack: [TypeScript, Next.js, Node, PostgreSQL]",
    color: colors.fg,
  },
  {
    prefix: ">",
    text: "systems: 4 · own product: cutcast.com.br",
    color: colors.accent,
  },
  {
    prefix: ">",
    text: "status: aberto para freelance e conversa",
    color: colors.dim2,
  },
  { prefix: ">", text: "type 'help' to explore", color: colors.fg },
];

export const TYPING_SPEED = 18; // ms per char
export const SECRET_COMMAND = "sudo hire-me";

const out = (text: string): TermLine => ({ prefix: " ", text, color: colors.dim });
const hi = (text: string): TermLine => ({ prefix: " ", text, color: colors.accent });

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
    out("drwxr-xr-x  radar-congresso/       syncing  next · prisma · supabase"),
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
  // A forma tem que ser o dado do projeto, não enfeite que pulsa.
  | { kind: "wave"; heights: string; cuts: string }
  | { kind: "spark"; path: string; cy: number }
  | { kind: "grid"; rows: string[] };

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
    viz: {
      kind: "wave",
      // O sinal do vídeo longo (altura 0-9 por amostra) e, na mesma régua,
      // quais amostras entram num corte. As duas strings têm o mesmo tamanho.
      heights: "1122334578998654323467899876543223578997654321",
      cuts: "......#####........#######........#####.......",
    },
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
      path: "M0 40 L20 39 L40 36 L60 37 L80 31 L100 26 L120 27 L140 20 L160 15 L180 16 L200 9 L220 5 L240 3",
      cy: 3,
    },
    metaLabel: "// dias sem fumar, por usuário",
    status: "BETA",
  },
  {
    idx: "03",
    title: "radar-congresso",
    tag: "OPEN SOURCE",
    href: "https://radar-congresso.vercel.app",
    desc: "Fiscalização de parlamentares federais em cima de dados públicos vivos: gastos, votos e presença, atualizados na fonte.",
    stack: ["Next.js", "Prisma", "Supabase"],
    viz: {
      kind: "grid",
      // Painel de votação nominal: # presente/sim, . ausente/não.
      rows: ["##.###.##.####.##.###.###.", "###.##.###.##.####.##.##.#"],
    },
    metaLabel: "radar-congresso.vercel.app",
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
      path: "M0 24 L20 30 L40 18 L60 22 L80 12 L100 20 L120 8 L140 16 L160 6 L180 14 L200 10 L220 18 L240 11",
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

// ---------------------------------------------------------------------------

export type Dep = {
  key: string;
  name: string;
  // Ferramenta tem versão e lugar onde roda; método não tem nem um nem outro.
  version?: string;
  group: "dependencies" | "ai" | "infrastructure";
  desc: string;
  used?: string;
};

export const deps: Dep[] = [
  {
    key: "typescript",
    name: "typescript",
    version: "^5.6",
    group: "dependencies",
    desc: "Escrevo o tipo antes da função. Se ele não fecha, o desenho está errado e o compilador só foi o primeiro a perceber. Aqui o strict fica ligado e o build roda tsc junto: tipo torto não vira deploy.",
    used: "cutcast · Fumasil · claude-investimentos",
  },
  {
    key: "next",
    name: "next",
    version: "^15.3",
    group: "dependencies",
    desc: "App Router e server action entram no desenho, não no fim como detalhe de deploy. Neste site isso quer dizer que todas as rotas saem estáticas e só o formulário de contato existe em runtime.",
    used: "cutcast · radar-congresso",
  },
  {
    key: "react",
    name: "react",
    version: "^19.0",
    group: "dependencies",
    desc: "UI é função do dado. Quando o estado mora em três lugares você não tem bug de render, tem bug de arquitetura fantasiado de bug de render. Aqui todo texto vem de um arquivo só.",
    used: "cutcast · Fumasil · radar-congresso",
  },
  {
    key: "node",
    name: "node",
    version: "^22 lts",
    group: "dependencies",
    desc: "Onde vive o trabalho sujo: fila, job que demora, integração que devolve 200 com o corpo errado. Nada disso é difícil. Difícil é escrever já sabendo que vai falhar na metade e vai precisar continuar de onde parou.",
    used: "cutcast · Fumasil",
  },
  {
    key: "tailwindcss",
    name: "tailwindcss",
    version: "^4.0",
    group: "dependencies",
    desc: "Restrição, não atalho. Escala fixa mata a decisão de 3px que ninguém revisa e todo mundo repete diferente. Cor, tipografia e animação deste site saem de 31 tokens no @theme.",
    used: "cutcast · Fumasil · radar-congresso",
  },
  {
    key: "python",
    name: "python",
    version: "^3.12",
    group: "dependencies",
    desc: "Para dado bagunçado, script vence serviço. Ingest, parsing, análise que roda três vezes e vai fora — nessa faixa, montar arquitetura é procrastinação com nome bonito.",
    used: "radar-congresso · claude-investimentos",
  },
  {
    key: "n8n",
    name: "n8n",
    version: "^1.7",
    group: "ai",
    desc: "Orquestração que dá para enxergar. O ganho não é escrever menos código: é o retry, o passo que quebrou e a ordem das coisas ficarem visíveis para quem não escreveu o pipeline.",
    used: "cutcast",
  },
  {
    key: "mcp",
    name: "mcp",
    version: "latest",
    group: "ai",
    desc: "Dar ferramenta de verdade para o modelo, com contrato e limite. A parte difícil não é expor a função — é decidir o que ele não pode chamar.",
    used: "ferramental próprio",
  },
  {
    key: "langfuse",
    name: "langfuse",
    version: "^3.0",
    group: "ai",
    desc: "Trace, custo por chamada, avaliação. Sem isso você não sabe se melhorou ou se teve sorte, e não vai descobrir por que piorou quando o provedor atualizar o modelo por baixo de você.",
    used: "ferramental próprio",
  },
  {
    key: "prompt",
    name: "prompt",
    group: "ai",
    desc: "Contrato, não conversa. Peço saída com schema, valido, e trato o que voltou como input não confiável. Prompt bonito que devolve texto livre é passo manual disfarçado de automação.",
  },
  {
    key: "agent",
    name: "agent",
    group: "ai",
    desc: "Ferramenta estreita e log de tudo. Agente genérico erra bonito e você não consegue refazer o caminho; com três tools e trilha de execução, dá para abrir e ver onde foi.",
  },
  {
    key: "rag",
    name: "rag",
    group: "ai",
    desc: "Recuperar é ranquear. Quase todo RAG ruim é busca ruim: se o trecho certo não entra no top-k, o modelo preenche o vazio com confiança e a culpa sobra para ele.",
  },
  {
    key: "eval",
    name: "eval",
    group: "ai",
    desc: "Medir antes de trocar. Sem conjunto de avaliação, \"melhorou\" é impressão — e impressão não sobrevive ao próximo release do provedor.",
  },
  {
    key: "postgresql",
    name: "postgresql",
    version: "^16",
    group: "infrastructure",
    desc: "A fonte da verdade, e levo ao pé da letra: constraint, check e foreign key no banco. Regra que só existe na aplicação é regra que a próxima aplicação vai ignorar.",
    used: "cutcast · radar-congresso · claude-investimentos",
  },
  {
    key: "supabase",
    name: "supabase",
    version: "latest",
    group: "infrastructure",
    desc: "Auth, storage e realtime resolvidos para o tempo ir para o produto. Também sei onde encosta: RLS mal escrita é buraco de segurança com cara de configuração pronta.",
    used: "cutcast · Fumasil",
  },
  {
    key: "docker",
    name: "docker",
    version: "latest",
    group: "infrastructure",
    desc: "Mesma caixa na minha máquina e em produção. Não é elegância — é encerrar a conversa \"aqui funciona\" antes que ela custe uma tarde.",
    used: "claude-investimentos · radar-congresso",
  },
];

// Definida depois de `deps` de propósito: o número sai de lá, para não
// envelhecer sozinho toda vez que a árvore cresce.
export const stats: Stat[] = [
  { value: 8, label: "ANOS DE OFÍCIO", count: true, accent: true },
  { value: 4, label: "SISTEMAS EM PÉ", count: true },
  {
    // Só o que tem versão: método não é tecnologia na caixa.
    value: deps.filter((dep) => dep.version).length,
    label: "TECNOLOGIAS NA CAIXA",
    count: true,
  },
  { value: 1, label: "PRODUTO PRÓPRIO", count: false },
];

// Método, não comando: o galho `scripts` da árvore é uma piada da metáfora do
// package.json. Os dois que o design original trouxe, e que são ofício geral —
// o método de IA vive no galho `ai`, junto das ferramentas.
export type Practice = { name: string; text: string };

export const practices: Practice[] = [
  { name: "build", text: "ship pequeno, cedo, com log" },
  { name: "debug", text: "ler o erro inteiro antes de opinar" },
];

export const about = [
  "Sou o Carlos. Oito anos escrevendo software e, no fundo, sempre o mesmo trabalho: pegar um sistema confuso e deixar ele legível.",
  "Prefiro o projeto pequeno que funciona de verdade ao grande que só existe no slide. Toco produto próprio porque gosto de estar perto de quem usa a coisa — o elogio e o bug chegam pelo mesmo canal, e isso mantém a régua honesta. O resto é ofício: ler o log inteiro, medir antes de mexer, cortar o que não serve.",
  "Se você chegou até aqui lendo em vez de rolar, a gente provavelmente se entende.",
] as const;
