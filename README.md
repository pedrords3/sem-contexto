# Sem Contexto — site oficial

Site publicado em **https://pedrords3.github.io/sem-contexto/** (GitHub Pages, branch `main`).

HTML, CSS e JavaScript puros: sem build, sem dependências além de Google Fonts e Bootstrap Icons (CDN).
Mesmo esquema do [portfólio](https://github.com/pedrords3/meuPortfolio).

## Estrutura

```
index.html                     página única (PT/EN)
assets/
  css/main.css                 identidade visual e layout
  js/main.js                   animações, idioma, baralho do topo, abas e galeria
  js/midias.js                 itens das galerias (modal) e cartas do baralho do topo
  img/icone.svg                ícone (o mesmo logo da versão Web)
  midias/
    telas/                     prints da versão 3D 1.0
    web/                       prints da versão Web
    evolucao/                  prints do protótipo e do desenvolvimento
    video/                     vídeo dos bastidores no editor + capa
    expressoes/                close-ups das expressões (bolinhas da seção "A turma")
```

Os prints originais em alta resolução ficam fora do repositório (em `portfolio/SemContexto Midias/`).
O site usa cópias em JPG reduzidas, com no máximo 1600 px de largura.

## Textos e idioma

O texto em português fica no próprio HTML; a versão em inglês vai no atributo `data-en`
do mesmo elemento. O botão PT/EN troca um pelo outro e lembra a escolha no navegador.
As cartas do baralho do topo ficam em `deckCards`, em `assets/js/midias.js`.

## Galerias

Edite `assets/js/midias.js`. Cada galeria (`pc`, `web`, `bastidores`) é uma lista de itens com
`type` (`'video'` ou `'image'`), `title` e `description` em `{ pt, en }`, `path` e, para vídeos,
`thumbnail`. Os botões que abrem a galeria usam `data-project="<chave>"` e `data-index="<posição>"`,
então ao mudar a ordem confira os `data-index` do `index.html`.

## Links do jogo

- **Versão Web:** https://sem-contexto.onrender.com/
- **Versão 3D (Windows):** o zip (~109 MB) é publicado como **GitHub Release** no repositório do
  portfólio, e todos os botões de download apontam para
  `https://github.com/pedrords3/meuPortfolio/releases/latest/download/SemContexto3D-Windows.zip`,
  que sempre baixa a release mais recente. Para publicar uma versão nova, siga o passo a passo do
  README do portfólio e, se o tamanho mudar, atualize o "109 MB" no `index.html`.
- **Steam:** quando a página da loja existir, troque os selos "Em breve na Steam" e o bloco
  `.cta__soon` da seção de download por links para ela.
