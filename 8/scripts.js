// Html elements used
const pokemonListHtml = document.getElementById("pokemon__list");
const detailsHeaderHtml = document.getElementById("details__header");
const detailsImgHtml = document.getElementById("details__image");
const typesListHtml = document.getElementById("types__list");
const detailsDescHtml = document.getElementById("details__description");
const detailsErrorHtml = document.getElementById("details__error");
const listErrorHtml = document.getElementById("list__error");

let pokemonList = [];
let getPokemonDataOk = true;
let getPokemonListOk = true;

/**
 * Returns pokemon data object from API.
 * @param {string} url - Url.
 * @returns {Object} Dtails.
 */
async function getPokemonData(url) {
    let response;
    try {
        response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getPokemonDataOk = response.ok;
    } catch (error) {
        getPokemonDataOk = false;
    }

    if(!getPokemonDataOk) return;

    const data = await response.json();
    return data;
}

/**
 * Updates html details.
 * @param {string} pokemonUrl - Pokemon url. 
 */
async function updateDetails(pokemonUrl) {
    let pokemonDetails = await getPokemonData(pokemonUrl);

    if(getPokemonDataOk) {
        let pokemonSpecies = await getPokemonData(pokemonDetails.species.url);

        detailsErrorHtml.classList.add("hidden");
        detailsHeaderHtml.classList.remove("hidden");
        detailsImgHtml.classList.remove("hidden");
        typesListHtml.classList.remove("hidden");
        detailsDescHtml.classList.remove("hidden");

        detailsHeaderHtml.innerText = pokemonDetails.name;
        detailsImgHtml.src = pokemonDetails.sprites.front_default;
        typesListHtml.innerHTML = '';
        typesListHtml.innerHTML = pokemonDetails.types.map(function (type) {
            return `<li class="types__element">${type.type.name}</li>`;
        }).join('');
        detailsDescHtml.innerHTML = pokemonSpecies.flavor_text_entries[0].flavor_text;
    } else {
        detailsErrorHtml.classList.remove("hidden");

        detailsHeaderHtml.classList.add("hidden");
        detailsImgHtml.classList.add("hidden");
        typesListHtml.classList.add("hidden");
        detailsDescHtml.classList.add("hidden");
    }
}

/**
 * Returns html pokemon list element.
 * @param {string} name - Pokemon name.
 * @param {string} url - Pokemon url.
 */
function createPokemon(name, url) {
    // Pokemon list element created
    const pokemon = document.createElement("li");
    pokemon.innerHTML = `<h4 class="pokemon__name">${name}</h4>`;
    pokemon.classList.add("pokemon__element");

    // Pokemon details button created
    const detailsButton = document.createElement("button");
    detailsButton.id = "details__button";
    detailsButton.classList.add("button", "details__button");
    detailsButton.innerText = "Details";
    // On click task status is changed
    detailsButton.addEventListener("click", function (e) {
        updateDetails(url);
    })

    // Button added to details element
    pokemon.append(detailsButton);
    return pokemon;
}

/**
 * Download pokemon list from API.
 * @param {string} url - Url.
 */
async function getPokemonList() {
    let response;
    try {
        response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getPokemonListOk = response.ok;
    } catch (error) {
        getPokemonListOk = false;
    }

    if(!getPokemonListOk) return;

    const data = await response.json();
    pokemonList = data.results;
}

/**
 * Renders html pokemon list.
 */
function renderList() {
    // Reset HTML pokemon list content
    pokemonListHtml.innerHTML = '';
    // Add pokemons from pokemons list to HTML pokemon list
    pokemonList.forEach(function (pokemon) {
        pokemonListHtml.append(createPokemon(pokemon.name, pokemon.url));
    });
}


/**
 * When window is loaded pokemon list is rendered.
 */
window.addEventListener("load", async function(e) {
    await getPokemonList();
    if(getPokemonListOk) {
        listErrorHtml.classList.add("hidden");
        pokemonListHtml.classList.remove("hidden");
        renderList();
    } else {
        listErrorHtml.classList.remove("hidden");
        pokemonListHtml.classList.add("hidden");
    }
})