# Projeto Pokédex

## 🎯 Descrição
Bem-vindo ao projeto **Pokédex**! Este é um aplicativo web interativo que utiliza a poderosa [PokeAPI](https://pokeapi.co) para exibir informações detalhadas sobre os Pokémons. A aplicação permite explorar uma lista de Pokémons, ver detalhes específicos de cada um e gerenciar uma lista de favoritos com facilidade.

## 🚀 Funcionalidades

### 🔍 Visualização de Pokémons
- **Lista Dinâmica**: Exibe uma lista de Pokémons atualizada em tempo real a partir da PokeAPI.
- **Cards Informativos**: Cada Pokémon é representado por um card contendo imagem, nome e tipo.

### 🧐 Detalhes do Pokémon
- **Modal Informativo**: Ao clicar em um card, um modal exibe informações detalhadas do Pokémon selecionado, como status, evoluções e habilidades.
- **Gerenciamento de Favoritos**: Adicione ou remova Pokémons dos favoritos diretamente do modal.

### ⭐ Gerenciamento de Favoritos
- **Persistência de Dados**: Os Pokémons favoritos são armazenados no `localStorage`, garantindo que suas preferências sejam mantidas entre sessões.
- **Visualização e Remoção**: O modal de favoritos exibe todos os Pokémons adicionados e permite a remoção direta.

## 🛠️ Tecnologias Utilizadas
- **HTML**: Estrutura sólida para a aplicação.
- **CSS (Tailwind CSS)**: Design moderno e responsivo, facilitando a criação de uma interface intuitiva.
- **JavaScript**: Manipulação dinâmica do DOM e interações com a PokeAPI.
- **PokeAPI**: Fonte confiável e rica em dados sobre Pokémons.

## 📁 Estrutura do Projeto
- **`index.html`**: Página principal que mostra a lista de Pokémons e a estrutura do modal de favoritos.
- **`app.js`**: Contém a lógica da aplicação, incluindo chamadas à API e gerenciamento de eventos.
- **`tailwind.min.css`**: Biblioteca para estilização responsiva e moderna.

## 🔍 Funcionalidades Detalhadas

### Visualização de Pokémons
- Requisição à API para obter a lista de Pokémons.
- Cada Pokémon é exibido com imagem e nome.

### Detalhes do Pokémon
- Obtenção de detalhes completos ao clicar em um card.
- Exibição de status, evoluções e habilidades no modal.
- Botão para adicionar/remover do favoritos.

### Modal de Favoritos
- Visualização dos Pokémons favoritos com opção de remoção.

## 🎉 Conclusão
Este projeto oferece uma experiência rica e interativa para explorar o mundo dos Pokémons. Utilizando as tecnologias modernas como HTML, CSS (Tailwind CSS) e JavaScript, a aplicação demonstra uma integração eficaz com a PokeAPI para criar uma experiência de usuário envolvente e funcional.
