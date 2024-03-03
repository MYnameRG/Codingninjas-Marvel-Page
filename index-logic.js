// Initialize all the variables
const publicKey = "45bf6af7eb8c3857dd3bb83565cff23b";
const privateKey = "b16f7510a53a3d9925a2684e91a5c95815c63034";
const baseURL = "https://gateway.marvel.com:443/v1/public/characters";
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const mainContent = document.getElementById("mainContent");
const searchInput = document.getElementById("searchInput");

// Function to fetch superheroes from Marvel API
async function fetchSuperheroes(query) {
  const response = await fetch(
    `${baseURL}?ts=${ts}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${query}`
  );
  const data = await response.json();
  return data.data.results;
}

// Function to display superheroes
function displaySuperheroes(superheroes) {
  mainContent.innerHTML = "";
  superheroes.forEach((superhero) => {
    const superheroElement = document.createElement("div");
    superheroElement.classList.add("superhero");
    superheroElement.innerHTML = `
            <a href="superhero-info.html?id=${superhero.id}">
                <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
            </a>
            <h2>${superhero.name}</h2>
            <p>${superhero.description}</p>
            <button class="favoriteBtn">Add to Favorites</button>
        `;
    const favoriteBtn = superheroElement.querySelector(".favoriteBtn");
    favoriteBtn.addEventListener("click", () => addToFavorites(superhero));
    mainContent.appendChild(superheroElement);
  });
}

// Function to add superhero to favorites
function addToFavorites(superhero) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const isExistInFavorite = favorites.find((data) => data.id === superhero.id);
  if (isExistInFavorite == null) {
    favorites.push(superhero);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Added to the Favorite list");
  } else {
    alert("Already Added to the Favorite list");
  }
}

// Function to handle search
async function handleSearch() {
  const query = searchInput.value.trim();
  if (query !== "" && query !== null) {
    localStorage.setItem("searchedHero", JSON.stringify(query));
    const superheroes = await fetchSuperheroes(query);
    displaySuperheroes(superheroes);
  } else {
    localStorage.setItem("searchedHero", JSON.stringify(query));
    mainContent.innerHTML = "<p>Please enter a superhero name to search.</p>";
  }
}

// Function to handle previous - searched data
async function handlePreviousSearch() {
  if (query !== "" && query !== null) {
    searchInput.value = query.toString();
    const superheroes = await fetchSuperheroes(query);
    displaySuperheroes(superheroes);
  }
}

// Event listener for search input
searchInput.addEventListener("input", handleSearch);

// Initialize the previous data or new data
const query = JSON.parse(localStorage.getItem("searchedHero"));
if (query !== "" && query !== null) {
  // Initialize the previous data for search input
  handlePreviousSearch();
} else {
  // Initial display on page load
  handleSearch();
}
