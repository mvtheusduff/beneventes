---
name: Beneventes Tattoo
description: Vitrine digital do tatuador Beneventes — dark, luxuosa e urbana, focada em converter visitantes em conversas no WhatsApp.
colors:
  void-black: "#0a0a0a"
  true-black: "#000000"
  charcoal-surface: "#141414"
  graphite-line: "#2a2a2a"
  warm-off-white: "#f5f5f3"
  warm-ash: "#a8a8a4"
  soot: "#7c7b73"
  bone-white: "#ededea"
  bone-glow: "#EDEDEA4D"
typography:
  display:
    fontFamily: "Archivo Black, Arial Black, sans-serif"
    fontSize: "clamp(3.2rem, 11vw, 7.6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Archivo Black, Arial Black, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  title:
    fontFamily: "Archivo Black, Arial Black, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.1rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.01em"
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.28em"
rounded:
  pill: "999px"
  circle: "50%"
  lg: "8px"
  md: "6px"
  sm: "4px"
  xs: "3px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "40px"
  xl: "56px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "rgba(20, 16, 10, 0.5)"
    textColor: "{colors.warm-off-white}"
    rounded: "{rounded.pill}"
    padding: "16px 30px"
  button-primary-hover:
    backgroundColor: "{colors.bone-white}"
    textColor: "{colors.true-black}"
    rounded: "{rounded.pill}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.warm-off-white}"
    rounded: "{rounded.pill}"
    padding: "16px 30px"
  button-outline-hover:
    backgroundColor: "{colors.warm-off-white}"
    textColor: "{colors.true-black}"
    rounded: "{rounded.pill}"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.warm-ash}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  filter-pill-active:
    backgroundColor: "{colors.warm-off-white}"
    textColor: "{colors.true-black}"
    rounded: "{rounded.pill}"
---

# Design System: Beneventes Tattoo

## 1. Overview

**Creative North Star: "The Signed Original"**

Cada tatuagem que sai daqui é tratada como peça única e assinada — nunca uma cópia de catálogo. O sistema visual carrega essa ideia: fundo quase preto (void-black), texto em off-white quente, e um único acento (bone-white) usado com moderação cirúrgica. Não há paleta colorida, gradientes ou textura decorativa competindo com o trabalho — o traço do tatuador é o protagonista, a interface é a moldura.

A personalidade é **luxuosa, autoral, urbana**: elegância séria de tipografia bold em caixa alta (Archivo Black) equilibrada por Inter no corpo do texto. O peso urbano vem do contraste alto e da tipografia — nunca de sujeira visual, textura rasgada ou efeito barato. Isso é deliberado: o sistema rejeita explicitamente a estética "gangsta" clichê de tatuaria old-school (grunge pesado, tipografia rasgada, texturas sujas) e rejeita com igual força qualquer coisa que pareça salão de beleza ou clínica estética genérica — visual clean-corporativo, pastel ou "wellness" não tem lugar aqui.

Profundidade é rara e com propósito: a superfície é flat por padrão; um brilho suave em bone-white marca só os pontos de conversão (botão primário, botão flutuante do WhatsApp), nunca decoração.

**Key Characteristics:**
- Monocromático por decisão — preto, off-white e cinzas, sem cor de marca saturada.
- Tipografia bold em caixa alta carrega o peso "urbano"; nunca textura ou sujeira.
- Flat por padrão; brilho off-white reservado só para CTAs primários.
- Cantos em pílula (999px) em toda ação clicável; cards de imagem com cantos suaves (6–8px); círculos (50%) só em botões-ícone.
- Fotografia (o portfólio) é o elemento de cor real do site — a UI existe pra emoldurá-la, não competir com ela.

## 2. Colors

Paleta estritamente neutra: um preto quase puro, uma escala de cinzas mornos, e um único acento off-white que faz o trabalho de "cor de marca".

### Primary
- **Bone White** (#ededea): o único acento do sistema. Usado em bordas de botão primário, ícones de destaque (assinatura da marca, marcadores de estilo/filtro), a linha do kicker, o anel de foco de inputs, e no hover de links secundários. Nunca usado como preenchimento grande de área — sua raridade é o ponto.
- **Bone Glow** (#EDEDEA4D — bone-white a 30% de opacidade): a versão translúcida do acento, usada exclusivamente em `box-shadow` pra criar o brilho seletivo em CTAs (ver Elevação).

### Neutral
- **Void Black** (#0a0a0a): fundo padrão de toda a página — não é preto puro, tem leve profundidade.
- **True Black** (#000000): reservado pra texto invertido sobre elementos claros (botão no estado hover, chip de filtro ativo) e pra `::selection`.
- **Charcoal Surface** (#141414): fundo de seções elevadas sobre o void-black (marquee, seção de processo, cards de estilo/galeria).
- **Graphite Line** (#2a2a2a): toda borda e divisor discreto — filtros, cards, listas de FAQ e contato, header com scroll.
- **Warm Off-White** (#f5f5f3): cor de texto primário — títulos, corpo, ícones ativos. Não é branco puro; carrega leve calor.
- **Warm Ash** (#a8a8a4): texto secundário/muted — parágrafos de apoio, subtítulos, texto de filtro inativo.
- **Soot** (#7c7b73): texto terciário — só em rótulos pequenos (kicker, labels de contato tipo "WhatsApp"/"Email"), nunca em corpo de texto longo.

### Named Rules
**The One Accent Rule.** Bone White é o único acento do sistema inteiro. Se um segundo tom de destaque parecer necessário, a resposta certa é ajustar peso tipográfico ou espaçamento — não introduzir uma segunda cor.

**The Inversion Rule.** Estados de hover em elementos escuros não escurecem mais — eles invertem pra Bone White com texto True Black. É o único "flash" de contraste permitido na interface, reservado pra confirmar que uma ação foi reconhecida.

## 3. Typography

**Display Font:** Archivo Black (fallback Arial Black, sans-serif)
**Body Font:** Inter (fallback -apple-system, BlinkMacSystemFont, sans-serif)

**Character:** Um par de contraste clássico — display geométrico e pesado em caixa alta contra um corpo humanista e legível. O peso todo do sistema mora no display; o body existe pra ficar invisível e deixar o texto ser lido, não notado.

### Hierarchy
- **Display** (400, `clamp(3.2rem, 11vw, 7.6rem)`, line-height 0.98, letter-spacing -0.01em, caixa alta): reservado ao H1 do hero. Aparece uma única vez por página.
- **Headline** (400, `clamp(2.2rem, 5vw, 3.4rem)`, line-height 1.05, letter-spacing 0.01em, caixa alta): título de cada seção (H2) — Sobre, Estilos, Portfólio, FAQ, Contato, Agendamento.
- **Title** (400, `clamp(1.5rem, 3vw, 2.1rem)`, line-height 1.05, caixa alta): título de card (H3) — nome do estilo de tatuagem nos cards da seção Estilos.
- **Body** (400, 16px, line-height 1.6, cor warm-off-white ou warm-ash): parágrafos e descrições. Limitado a ~56–65ch de largura máxima pra manter a leitura confortável.
- **Label** (600, 12px, letter-spacing 0.28em, caixa alta, cor warm-ash): o kicker que abre cada seção, sempre ladeado por duas réguas de 22px em bone-white.
- **Nav Label** (variante do Label, 13px, letter-spacing 0.08em): links de navegação e chips de filtro — mesma lógica do Label, tamanho ligeiramente maior pra alvo de toque.

### Named Rules
**The Shout Once Rule.** Archivo Black em tamanho Display aparece uma única vez por página, no H1 do hero. Todo o resto da hierarquia de título usa a mesma fonte em escala menor — a página não grita duas vezes.

**The Kicker Rule.** Toda seção principal (exceto o hero) abre com um Label ladeado por réguas de 22px em bone-white antes do headline — é a assinatura estrutural do sistema, não decoração pontual.

## 4. Elevation

O sistema é flat por padrão — cards, listas e seções não têm `box-shadow` de repouso. Profundidade aparece só em dois lugares deliberados: o botão primário e o botão flutuante de WhatsApp. No primário, a sombra carrega o acento Bone Glow como um anel translúcido, então lê como brilho, não como peso. No flutuante, que precisa se destacar fisicamente sobre qualquer conteúdo atrás dele, entra um pouco de peso preto real.

### Shadow Vocabulary
- **Bone Glow — repouso** (`box-shadow: 0 0 0 1px #EDEDEA4D, 0 10px 28px -12px #EDEDEA4D`): estado padrão do botão primário.
- **Bone Glow — hover** (`box-shadow: 0 0 0 1px #ededea, 0 12px 32px -10px #EDEDEA4D`): botão primário e botão flutuante de WhatsApp ao passar o mouse — o anel fecha de translúcido pra sólido.
- **Deep Drop** (`box-shadow: 0 12px 30px -8px rgba(0,0,0,0.8), 0 0 0 1px #EDEDEA4D`): o botão flutuante de WhatsApp — a única sombra do sistema com componente preto forte, porque ele precisa se destacar fisicamente sobre qualquer conteúdo atrás dele.
- **Soft Lift** (`box-shadow: 0 14px 28px -14px rgba(0,0,0,0.7)`): fotos da fita de miniaturas do hero — sombra suave e neutra, sem tingimento de acento.
- **Pulse Ring** (animação `border: 1px solid bone-white` expandindo e sumindo em loop): anel pulsante ao redor do botão flutuante de WhatsApp, sinalizando "isso é clicável" sem precisar de texto.

### Named Rules
**The Bone Glow Rule.** Toda sombra intencional (não decorativa) carrega o acento bone-white como anel, nunca preto puro sozinho. Preto puro em sombra é reservado só pro botão flutuante de WhatsApp, o único elemento que precisa de peso físico real pra se descolar do conteúdo atrás dele.

## 5. Components

### Buttons
- **Shape:** pílula total (`border-radius: 999px`). Nunca cantos quadrados ou levemente arredondados — é pílula ou não é botão de ação.
- **Primary:** fundo `rgba(20,16,10,0.5)` (quase transparente sobre o fundo escuro), borda 1px bone-white, texto warm-off-white, com o anel Bone Glow de repouso. Hover inverte pra fundo bone-white sólido, texto true-black, e sobe 2px (`translateY(-2px)`).
- **Outline:** fundo transparente, borda e texto warm-off-white, sem brilho de repouso. Hover preenche com warm-off-white sólido e texto true-black, mesma subida de 2px do primary.
- **Tamanhos:** o botão do header é compacto (12px/22px padding, texto some em telas pequenas — só o ícone fica); o CTA final de Agendamento é o maior (18px/34px padding, 15px de fonte). O padrão do resto do site fica no meio (16px/30px, 14px).

### Navigation
- **Desktop:** links em Nav Label (13px, warm-ash), sem sublinhado, viram warm-off-white no hover. Header é transparente sobre o hero e ganha fundo `rgba(10,10,10,0.88)` com blur(10px) e borda graphite-line assim que a página rola — nunca opaco sólido.
- **Mobile:** menu cheio-de-tela com fundo void-black, links em Archivo Black 34px, animado via `translateY` (desliza de cima).
- **Toggle:** ícone hambúrguer que vira X girando as duas barras externas 45°/-45° e escondendo a barra do meio.

### Filter Pills
- **Style:** pílula com borda graphite-line, texto warm-ash. Hover clareia borda e texto pra warm-off-white sem preencher fundo.
- **Active:** fundo warm-off-white sólido, texto true-black, borda combinando — mesma linguagem de "inversão" dos botões.

### Image Cards (Style Card / Gallery Item)
- **Corner Style:** 8px (card de estilo, maior) ou 6px (item de galeria, menor).
- **Estado de repouso:** imagem levemente dessaturada (`grayscale(0.1–0.15)`), sem sombra.
- **Hover:** a imagem satura totalmente (`grayscale(0)`), dá zoom sutil (`scale(1.07–1.1)`) e, no card de estilo, um gradiente escuro sobe de baixo revelando o título — a cor "acontece" só na interação, reforçando que a foto é o elemento colorido do sistema.
- **Tag flutuante** (só na galeria): pílula pequena com fundo `rgba(10,10,10,0.7)` e blur, aparece só no hover pra não competir com a imagem em repouso.

### FAQ Accordion (componente de assinatura)
Sem card, sem fundo, sem sombra — é uma lista flat separada por linhas graphite-line, no espírito de um índice editorial, não de um widget de app. Cada pergunta é um `<summary>` nativo com um ícone de "+" feito de duas barras sobrepostas (`::before`/`::after`); ao abrir, a barra vertical gira 90° e some, virando um "–" visual. O hover da pergunta muda a cor do texto pra bone-white, nunca adiciona fundo.

### Floating WhatsApp Button (componente de assinatura)
Círculo fixo no canto inferior direito, fundo warm-off-white, ícone true-black — a única superfície solid-light que existe fora de um estado de hover. Tem sombra Deep Drop e um anel Pulse Ring animado em loop contínuo, sinalizando "sempre disponível" sem depender de nenhum texto. Desaparece (`opacity: 0`, leve scale down) quando o rodapé entra na tela, pra não sobrepor os links de contato do footer.

### Named Rules
**The Pill Rule.** Toda ação clicável — botão, filtro, o CTA do header — é uma pílula (999px). Cards de imagem usam cantos suaves (6–8px). Círculo perfeito (50%) é reservado só a botões-ícone (fechar, setas de carrossel, redes sociais). Não existe meio-termo.

## 6. Do's and Don'ts

### Do:
- **Do** manter o acento limitado ao bone-white (#ededea) — é a única cor de marca do sistema, e sua raridade é o que a torna notável.
- **Do** usar sombra com anel Bone Glow (`#EDEDEA4D`) em vez de preto puro sempre que um elemento precisar de brilho — reservado a CTAs primários e ao botão flutuante.
- **Do** deixar a foto (portfólio, hero) carregar a cor real da página — dessaturar levemente em repouso e saturar no hover, nunca aplicar filtro de cor à UI em si.
- **Do** usar pílula (999px) em qualquer novo botão ou chip; cantos suaves (6–8px) em qualquer novo card de imagem.
- **Do** abrir cada nova seção principal com o Label/kicker ladeado por réguas de 22px, mantendo a assinatura estrutural do site.

### Don't:
- **Don't** introduzir uma segunda cor de acento (dourado, vermelho, qualquer saturação) — o sistema é deliberadamente monocromático.
- **Don't** deixar o site parecer "site genérico de salão de beleza ou clínica estética" — sem pastel, sem visual clean-corporativo, sem linguagem de "wellness" (isso é um anti-referência explícito do PRODUCT.md).
- **Don't** usar a estética "gangsta" clichê de tatuaria old-school — sem tipografia rasgada, sem textura suja/grunge, sem pichação exagerada (outro anti-referência explícito do PRODUCT.md). O peso urbano vem da tipografia bold e do contraste, não de sujeira visual.
- **Don't** usar Soot (#7c7b73) em corpo de texto longo — é reservado a rótulos pequenos; em texto corrido a leitura fica pesada demais.
- **Don't** dar sombra preta pura (`rgba(0,0,0,...)` sozinha) a um elemento interativo — se precisa de profundidade, é Bone Glow; peso preto real é reservado ao botão flutuante de WhatsApp.
- **Don't** usar Archivo Black em tamanho Display mais de uma vez por página — é o grito do H1 do hero, não um recurso repetível.
