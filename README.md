# 🧪 Divinity: Original Sin 2 - Companion App

> Um projeto construído de ponta a ponta: desde o estudo de UX ao desenvolvimento Front-End Mobile.

## 📖 Sobre o Projeto
Como jogadora assídua de *Divinity: Original Sin 2*, deparei-me com um problema real de usabilidade no jogo: o sistema de *crafting* (criação de itens) exige que o jogador pause constantemente a partida para consultar receitas numa Wiki externa, quebrando a imersão. 

Para resolver esta dor, desenvolvi esta aplicação companheira. O objetivo é servir como um guia rápido, interativo e offline, permitindo gerir o inventário e descobrir receitas com poucos toques no ecrã.

## 🚀 Stack Tecnológica
- **React Native** (Interface fluida e navegação mobile)
- **TypeScript** (Tipagem estática para maior segurança e previsibilidade do código)
- **Tailwind CSS** (Estilização ágil e consistente)
- **AsyncStorage** (Persistência de dados locais para inventário e favoritos)

## ✨ Funcionalidades Principais
- **Filtros Avançados:** Categorização em tempo real (Poções, Granadas, Flechas, etc.).
- **Inventário Interativo:** O utilizador pode marcar o que tem na mochila diretamente no ecrã da receita, e o sistema calcula automaticamente os itens em falta.
- **Sistema de Favoritos:** Guardar as receitas mais utilizadas para acesso rápido.
- **Internacionalização (i18n):** Suporte para múltiplos idiomas (Inglês, Espanhol, Português, etc.).

## 🛠️ Processo de Design e Engenharia
O meu fluxo de trabalho para este produto seguiu as seguintes etapas:
1. **Identificação do Problema:** Tempo excessivo gasto fora do jogo à procura de combinações de itens.
2. **Estudo de UI/UX:** Mapeamento da jornada do utilizador e criação de uma interface em *Dark Mode*, com foco no minimalismo e na redução de ruído visual.
3. **Desenvolvimento (Code):** Transformação do design em componentes funcionais e modulares.

## ⚠️ Nota Técnica sobre o Repositório
Por questões de direitos de autor das imagens do jogo e pelo enorme esforço manual de mapeamento de centenas de itens, o banco de dados completo (`recipes.ts`, `ingredients.ts`) e a pasta de imagens (`assets/potions`, etc.) foram adicionados ao `.gitignore` e não estão públicos neste repositório. O foco deste repositório é demonstrar a arquitetura, o código front-end e a lógica da interface.
