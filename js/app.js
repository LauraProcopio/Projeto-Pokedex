document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemon-list');
    const detailsContainer = document.getElementById('pokemon-details');
    const favoritesModal = document.getElementById('favorites-modal');
    const closeDetailsBtn = document.getElementById('close-details');
    const closeFavoritesBtn = document.getElementById('close-favorites');
    const favoriteBtnDetails = document.getElementById('favorite-btn-details');
    const showFavoritesBtn = document.getElementById('show-favorites');
    const favoritesList = document.getElementById('favorites-list');
  
    const favorites = new Set(JSON.parse(localStorage.getItem('favorites')) || []);
  
    const typeColors = {
      fire: 'bg-red-400',
      water: 'bg-blue-400',
      grass: 'bg-green-400',
      electric: 'bg-yellow-400',
      normal: 'bg-yellow-400',
      ice: 'bg-teal-400',
      fighting: 'bg-red-600',
      poison: 'bg-purple-400',
      ground: 'bg-brown-400',
      flying: 'bg-indigo-400',
      psychic: 'bg-pink-400',
      bug: 'bg-green-400',
      rock: 'bg-stone-400',
      ghost: 'bg-gray-400',
      dragon: 'bg-orange-400',
      dark: 'bg-gray-700',
      steel: 'bg-gray-600',
      fairy: 'bg-pink-300'
    };
  
    async function fetchPokemon() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
        const data = await response.json();
        const pokemonDetails = await Promise.all(data.results.map(pokemon => fetchPokemonDetails(pokemon.url)));
        displayPokemons(pokemonDetails);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
  
    async function fetchPokemonDetails(url) {
      const response = await fetch(url);
      return await response.json();
    }
  
    function displayPokemons(pokemons) {
      pokemonList.innerHTML = pokemons.map(pokemon => {
        const typeClass = pokemon.types.map(type => type.type.name).map(type => typeColors[type] || 'bg-gray-300').join(' ');
  
        return `
          <div class="pokemon-card p-4 rounded-lg shadow-md flex items-center ${typeClass} text-white relative cursor-pointer" data-name="${pokemon.name}">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-24 h-24 mr-4">
            <div class="flex-grow">
              <h3 class="text-xl font-semibold capitalize">${pokemon.name}</h3>
              <p class="text-white">Class: ${pokemon.types.map(type => type.type.name).join(', ')}</p>
            </div>
          </div>
        `;
      }).join('');
  
      // Adiciona eventos aos cards
      document.querySelectorAll('.pokemon-card').forEach(card => {
        card.addEventListener('click', (event) => {
          const pokemonName = event.currentTarget.dataset.name;
          showDetails(pokemonName);
        });
      });
    }
  
    function showDetails(pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then(response => response.json())
        .then(data => {
          const type = data.types[0].type.name;
          const backgroundColor = typeColors[type] || 'bg-gray-300';
  
          document.getElementById('pokemon-name').textContent = data.name;
          document.getElementById('pokemon-image').querySelector('img').src = data.sprites.front_default;
          document.getElementById('pokemon-image').style.backgroundColor = backgroundColor;
  
          document.getElementById('status').innerHTML = `
            <h2 class="text-xl font-semibold mb-2">Status</h2>
            <p>HP: ${data.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
            <p>Attack: ${data.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
            <p>Defense: ${data.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
            <p>Speed: ${data.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
          `;
          document.getElementById('evolutions').innerHTML = `
            <h2 class="text-xl font-semibold mb-2">Evoluções</h2>
            <p>Details of evolutions if available...</p>
          `;
          document.getElementById('abilities').innerHTML = `
            <h2 class="text-xl font-semibold mb-2">Habilidades</h2>
            <p>${data.abilities.map(ability => ability.ability.name).join(', ')}</p>
          `;
  
          // Atualizar o estado do botão de favorito
          favoriteBtnDetails.classList.toggle('text-red-400', favorites.has(pokemonName));
  
          // Mostrar o modal de detalhes
          detailsContainer.classList.remove('hidden');
        })
        .catch(error => console.error('Error fetching Pokémon details:', error));
    }
  
    function closeDetails() {
      detailsContainer.classList.add('hidden');
    }
  
    function toggleFavorite(pokemonName) {
      if (favorites.has(pokemonName)) {
        favorites.delete(pokemonName);
      } else {
        favorites.add(pokemonName);
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
      updateFavoritesList();
    }
  
    function updateFavoritesList() {
        const promises = Array.from(favorites).map(pokemonName => {
          return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
            .then(response => response.json())
            .then(data => {
              const type = data.types[0].type.name;
              const typeClass = typeColors[type] || 'bg-gray-300';
      
              return `
                <div class="pokemon-card p-4 rounded-lg shadow-md flex items-center ${typeClass} text-white relative cursor-pointer mb-4">
                  <img src="${data.sprites.front_default}" alt="${pokemonName}" class="w-24 h-24 mr-4">
                  <div class="flex-grow">
                    <h3 class="text-xl font-semibold capitalize">${pokemonName}</h3>
                    <p class="text-white">Class: ${data.types.map(type => type.type.name).join(', ')}</p>
                  </div>
                  <button class="remove-favorite absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl" data-name="${pokemonName}">
                    &times;
                  </button>
                </div>
              `;
            });
        });
      
        Promise.all(promises)
          .then(cardsHtml => {
            favoritesList.innerHTML = cardsHtml.join('');
            addRemoveFavoriteListeners();
          })
          .catch(error => console.error('Error fetching favorite Pokémon details:', error));
      }
      
      function addRemoveFavoriteListeners() {
        document.querySelectorAll('.remove-favorite').forEach(button => {
          button.addEventListener('click', (event) => {
            const pokemonName = event.currentTarget.dataset.name;
            removeFavorite(pokemonName);
          });
        });
      }
      
      function removeFavorite(pokemonName) {
        favorites.delete(pokemonName);
        localStorage.setItem('favorites', JSON.stringify([...favorites]));
        updateFavoritesList(); // Atualiza a lista de favoritos no modal
      }
      
  
    function closeFavorites() {
      favoritesModal.classList.add('hidden');
    }
  
    document.getElementById('close-details').addEventListener('click', closeDetails);
    document.getElementById('close-favorites').addEventListener('click', closeFavorites);
    document.getElementById('show-favorites').addEventListener('click', (event) => {
      event.preventDefault();
      updateFavoritesList();
      favoritesModal.classList.remove('hidden');
    });
  
    favoriteBtnDetails.addEventListener('click', () => {
      const pokemonName = document.getElementById('pokemon-name').textContent.toLowerCase();
      toggleFavorite(pokemonName);
      favoriteBtnDetails.classList.toggle('text-red-400', favorites.has(pokemonName));
    });
  
    fetchPokemon();
  });
