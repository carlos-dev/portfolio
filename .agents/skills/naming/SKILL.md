---
name: naming
description: Regra de nomeação deste projeto — nada de identificador de uma letra. Use ao escrever ou revisar qualquer código, especialmente ao criar props, parâmetros de callback, variáveis locais e chaves de objeto de dados.
---

# Nomeação

## A regra

**Nenhum identificador de uma letra.** Vale para props, parâmetros de callback,
variáveis locais, contadores de laço, chaves de objeto e constantes exportadas.

A única exceção é `_`, que é convenção para "parâmetro que existe mas não se
usa" — não é um nome, é um marcador.

## Por quê

Um nome de uma letra economiza digitação de quem escreve e cobra atenção de
todo mundo que lê depois. Quem lê `p.idx` precisa subir até a assinatura para
descobrir o que é `p`; quem lê `project.idx` já sabe. O custo cai sempre em
quem revisa, debuga ou volta ao arquivo seis meses depois — nunca em quem
digitou.

O caso pior é **prop**, porque prop é superfície pública: `<Card p={project} />`
obriga o leitor a abrir o componente para entender a chamada.

O segundo pior é **constante exportada**: `C.accent` não diz nada no ponto de
uso, num arquivo que nem importou o `C`.

## Como nomear

| Contexto | Ruim | Bom |
| --- | --- | --- |
| Prop de componente | `{ d }`, `{ p }` | `{ dep }`, `{ project }` |
| Callback sobre coleção | `.map((s) => …)` | `.map((stat) => …)` |
| Índice de laço | `(item, i)` | `(item, index)` |
| Evento | `(e) => …` | `(event) => …`, `(entry) => …` |
| Geometria | `w`, `h`, `ox`, `oy` | `width`, `height`, `originX`, `originY` |
| Laço 2D | `c`, `r` | `col`, `row` |
| Constante exportada | `C` | `colors` |
| Chave de dado | `{ k, v }` | `{ label, value }` |
| `setState` funcional | `(s) => …` | `(prev) => …` |

Nome curto e claro vence nome longo: `dep` é melhor que `dependency`, `col`
melhor que `columnIndex`. A régua é **legibilidade**, não contagem de letras.

## Idioma

Identificadores em **inglês**; comentários e texto de UI em **pt-BR**. Não
misture: `paragrafo` no meio de `dep`/`project`/`index` destoa tanto quanto uma
letra solta.

## Como varrer

```bash
grep -rnE "\(\(?[a-z]\)? =>|\(\([a-z], [a-z]\)|\{ [a-z] \}:|\(\{ [a-z],|(const|let) [A-Za-z] =|for \(let [a-z] =|\bkey=\{[a-z]\}" src/ --include="*.ts*"
```

Saída vazia = limpo. O ESLint não pega isso: não existe regra padrão para
comprimento mínimo de identificador nas configs deste projeto, então a varredura
é manual.

## Ao renomear em lote

Substituição textual de nome curto é perigosa porque o padrão curto aparece
dentro do longo. Ordene os pares do **mais específico para o mais genérico** —
troque `{projects.map((p) => <Card key={p.idx} p={p} />` antes de trocar
`{p.idx}`, senão o primeiro padrão já não existe quando chegar a vez dele.

Depois de renomear, rode `npx tsc --noEmit && npm run lint && npm run build` e
confira o comportamento no browser: renomear variável de canvas ou de laço passa
no compilador e ainda assim pode ter trocado a semântica.
