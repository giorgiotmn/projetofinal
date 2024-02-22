const pokemonListElement = document.querySelectorAll(".section-pokemons-div");

const inputSearch = document.getElementById("input-search");
const btnSearch = document.getElementById("button-search");

const pokemonImg = document.querySelector(".pokemon-img-search");
const pokemonId = document.querySelector(".pokemon-id-search");
const pokemonName = document.querySelector(".pokemon-name-search");
const pokemonType = document.querySelector(".pokemon-type-search");
const pokemonAbilities = document.querySelector(".pokemon-abilities-search");
const pokemonHeight = document.querySelector(".pokemon-height-search");
const pokemonWeight = document.querySelector(".pokemon-weight-search");

const btnBack = document.getElementById("button-back");
const btnForward = document.getElementById("button-forward");

let currentIndex = 0;

btnSearch.addEventListener("click", () => {
  searchPokemon();
});

const searchPokemon = () => {
  if (inputSearch.value.trim()) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputSearch.value.trim().toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        pokemonImg.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`), (pokemonId.textContent = data.id), (pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1));
        pokemonType.textContent = data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        pokemonAbilities.textContent = data.abilities.map((element) => " " + element.ability.name.charAt(0).toUpperCase() + element.ability.name.slice(1));
        pokemonHeight.textContent = data.height + "cm";
        pokemonWeight.textContent = data.weight + "g";
      })
      .catch(() => {
        alert(`Ocorreu um erro com a sua busca.`);
      });
  } else {
    alert("Nome inválido!");
    return;
  }
  inputSearch.value = "";
};

const updatePokemonElement = (element, pokemon) => {
  const imgElement = element.querySelector("img");
  imgElement.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`);

  const pElement = element.querySelector(".pokemon-id");
  pElement.textContent = pokemon.id;

  const h4Element = element.querySelector(".pokemon-name");
  h4Element.textContent = pokemon.name;
};

const fetchPokemonList = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=1025")
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
                name: pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1),
              });
            });
        }
      }
    });
};

fetchPokemonList();

btnBack.addEventListener("click", () => {
  currentIndex -= 8;
  fetchPokemonList();
});

btnForward.addEventListener("click", () => {
  currentIndex += 8;
  fetchPokemonList();
});
