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
    out("drwxr-xr-x  fumasil/               beta     react native"),
    out("drwxr-xr-x  radar-congresso/       syncing  next · prisma · supabase"),
    out("drwxr-xr-x  leveme/                live     next · ai agents"),
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
  | { kind: "streak"; runs: number[] }
  | { kind: "grid"; rows: string[] }
  | { kind: "route"; points: string };

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
    stack: ["Next.js", "Node", "PostgreSQL", "Supabase", "n8n"],
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
    href: "https://play.google.com/store/apps/details?id=com.playerum.fumasil&hl=pt_BR",
    desc: "Acompanha quem está parando de fumar dia a dia — registro, recaída sem culpa e progresso visível.",
    stack: ["React Native"],
    viz: {
      kind: "streak",
      // Dias sem fumar por tentativa; a queda entre elas é a recaída. A
      // sequência não é monotônica de propósito: uma tentativa pior no meio é
      // o "sem culpa" aparecendo no desenho, não só no texto.
      runs: [4, 11, 7, 19, 38],
    },
    metaLabel: "Google Play",
    status: "BETA",
  },
  {
    idx: "03",
    title: "Radar do Congresso",
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
    title: "leveme",
    tag: "AI AGENT",
    href: "https://leveme.vercel.app",
    desc: "Gera itinerário de viagem otimizado. A ordem das paradas e o trajeto saem da API de mapas e do cálculo de distância; o agente escreve o roteiro em cima disso. Rota é problema de solver, não de modelo.",
    stack: ["Next.js", "AI Agents"],
    viz: {
      kind: "route",
      // As paradas de um itinerário, na ordem que o agente escolheu.
      points: "8,36 30,14 62,24 96,10 132,30 168,18 200,34 232,20",
    },
    metaLabel: "leveme.vercel.app",
    status: "LIVE",
    live: true,
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
    desc: "TypeScript está presente praticamente em tudo que desenvolvo. Gosto de ter os tipos bem definidos porque muita coisa que seria descoberta só em produção acaba aparecendo enquanto estou desenvolvendo.",
    used: "cutcast",
  },
  {
    key: "next",
    name: "next",
    version: "^15.3",
    group: "dependencies",
    desc: "É minha principal escolha para aplicações web. O App Router, server actions e os recursos do próprio Next resolvem boa parte do que preciso sem transformar tudo em código no client.",
    used: "cutcast · Radar do Congresso · leveme",
  },
  {
    key: "react",
    name: "react",
    version: "^19.0",
    group: "dependencies",
    desc: "É onde passo boa parte do meu tempo no front-end. Prefiro componentes simples e tento manter o estado o mais próximo possível de onde ele realmente é necessário.",
    used: "cutcast · Fumasil · Radar do Congresso",
  },
  {
    key: "react-native",
    name: "react-native",
    version: "^0.76",
    group: "dependencies",
    desc: "A mesma base de React que já conheço, mas aplicada ao mobile. A parte interessante começa quando aparecem as diferenças do mundo nativo: listas grandes, teclado, animações e tudo que o navegador resolve por conta própria.",
    used: "Fumasil",
  },
  {
    key: "node",
    name: "node",
    version: "^22 lts",
    group: "dependencies",
    desc: "É a peça que fica por trás de boa parte das integrações, jobs e automações. Quando alguma coisa precisa rodar fora da interface ou continuar trabalhando depois que o usuário foi embora, normalmente é aqui que ela termina.",
    used: "cutcast · Fumasil",
  },
  {
    key: "tailwindcss",
    name: "tailwindcss",
    version: "^4.0",
    group: "dependencies",
    desc: "Gosto da velocidade que ele traz para construir interfaces sem espalhar CSS pelo projeto inteiro. Também facilita manter espaçamento, tipografia e outros detalhes visuais consistentes.",
    used: "cutcast · Fumasil · Radar do Congresso",
  },
  {
    key: "python",
    name: "python",
    version: "^3.12",
    group: "dependencies",
    desc: "Quando o problema envolve dados, processamento ou algum script específico, Python costuma ser a escolha mais simples. Nem tudo precisa virar um serviço ou uma aplicação completa.",
    used: "fora dos projetos em vitrine",
  },
  {
    key: "n8n",
    name: "n8n",
    version: "^1.7",
    group: "ai",
    desc: "É uma boa ferramenta para ligar serviços e automatizar processos sem precisar transformar cada fluxo em uma aplicação própria. A visualização de cada etapa também ajuda bastante na hora de descobrir onde alguma coisa parou.",
    used: "cutcast",
  },
  {
    key: "mcp",
    name: "mcp",
    version: "latest",
    group: "ai",
    desc: "Uma forma mais estruturada de conectar modelos a ferramentas e dados externos. A parte que mais me interessa é definir exatamente o que o modelo pode fazer — e principalmente o que ele não pode.",
    used: "ferramental próprio",
  },
  {
    key: "langfuse",
    name: "langfuse",
    version: "^3.0",
    group: "ai",
    desc: "Em aplicações com IA, saber apenas a resposta final não é suficiente. Traces, custos e avaliações ajudam a entender o que aconteceu durante a execução e se uma mudança realmente trouxe alguma melhora.",
    used: "ferramental próprio",
  },
  {
    key: "prompt",
    name: "prompt",
    group: "ai",
    desc: "Não trato prompt como uma conversa solta com o modelo. Quando a resposta faz parte de um sistema, defino o formato esperado, valido o que voltou e considero a saída como qualquer outro dado externo.",
  },
  {
    key: "agent",
    name: "agent",
    group: "ai",
    desc: "Faz sentido quando uma tarefa precisa tomar decisões e usar ferramentas no caminho. Prefiro agentes mais específicos, com poucas ferramentas e responsabilidades claras, porque fica muito mais fácil acompanhar e corrigir o que aconteceu.",
  },
  {
    key: "rag",
    name: "rag",
    group: "ai",
    desc: "Quando o modelo precisa consultar informações externas, a qualidade da recuperação passa a ser tão importante quanto a geração da resposta. Grande parte do trabalho está em encontrar o contexto certo antes de pedir qualquer coisa ao modelo.",
  },
  {
    key: "eval",
    name: "eval",
    group: "ai",
    desc: "Uma mudança em prompt ou modelo pode parecer melhor simplesmente porque testamos um caso que deu certo. Ter um conjunto de avaliações ajuda a comparar essas mudanças de forma mais objetiva.",
  },
  {
    key: "postgresql",
    name: "postgresql",
    version: "^16",
    group: "infrastructure",
    desc: "É o banco que mais aparece nos meus projetos. Constraints, relacionamentos e validações ficam no próprio banco quando fazem sentido, porque os dados precisam continuar consistentes independentemente de quem estiver acessando.",
    used: "cutcast · Radar do Congresso",
  },
  {
    key: "supabase",
    name: "supabase",
    version: "latest",
    group: "infrastructure",
    desc: "Resolve uma boa parte da infraestrutura que normalmente eu teria que montar sozinho: autenticação, banco, storage e realtime. O cuidado maior fica nas regras de acesso, principalmente quando entra RLS.",
    used: "cutcast · Fumasil",
  },
  {
    key: "docker",
    name: "docker",
    version: "latest",
    group: "infrastructure",
    desc: "Ajuda a manter o ambiente previsível entre desenvolvimento e produção. Também facilita bastante quando um projeto começa a depender de banco, serviços auxiliares e outras peças além da própria aplicação.",
    used: "Radar do Congresso",
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
