const btnBack = document.getElementById('button-back')
const btnForward = document.getElementById('button-forward')
const pokemonListElement = document.querySelectorAll(".section-pokemons-div");

let currentIndex = 0;

const updatePokemonElement = (element, pokemon) => {
    const imgElement = element.querySelector("img");
    imgElement.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`);

    const pElement = element.querySelector(".pokemon-id");
    pElement.textContent = pokemon.id;

    const h4Element = element.querySelector(".pokemon-name");
    h4Element.textContent = pokemon.name;
}

const fetchAndUpdatePokemonList = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=125")
    .then((response) => response.json())
    .then((data) => {
        const pokemonArray = data.results;
        currentIndex = Math.min(currentIndex, pokemonArray.length - 8);

        for (let i = currentIndex; i < currentIndex + 8; i++) {
            if (pokemonArray[i]) {
                fetch(pokemonArray[i].url)
                .then((res) => res.json())
                .then((pokemonData) => {
                    updatePokemonElement(pokemonListElement[i - currentIndex], {
                        id: pokemonData.id,
                        name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)
                    });
                })
            }
        }
    })
}

fetchAndUpdatePokemonList();

btnBack.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 8);
    fetchAndUpdatePokemonList();
});

btnForward.addEventListener("click", () => {
    currentIndex = Math.min(currentIndex + 8, 125 - 8);
    fetchAndUpdatePokemonList();
});