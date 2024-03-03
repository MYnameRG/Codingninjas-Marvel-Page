
// Initialize all the variables
const publicKey = '45bf6af7eb8c3857dd3bb83565cff23b';
const privateKey = 'b16f7510a53a3d9925a2684e91a5c95815c63034';
const baseURL = 'https://gateway.marvel.com:443/v1/public/characters';
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const mainContent = document.getElementById('mainContent');

// Function to display favourite superheroes
function displayFavSuperheroes() {
    mainContent.innerHTML = '';
    const favoriteSuperheroes = JSON.parse(localStorage.getItem('favorites')) || [];
    favoriteSuperheroes.forEach(superhero => {
        const superheroElement = document.createElement('div');
        superheroElement.classList.add('superhero');
        superheroElement.innerHTML = `
            <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}">
            <h2>${superhero.name}</h2>
            <p>${superhero.description}</p>
            <button class="favoriteBtn" onclick="removeFromFavorites(${superhero.id})">Remove from Favorites</button>
        `;
        mainContent.insertAdjacentElement('beforeEnd', superheroElement);
    });
}

// Function to remove superhero to favorites
function removeFromFavorites(superheroId) {
    const favoriteSuperheroes = JSON.parse(localStorage.getItem('favorites')) || [];
    const updatedFavoriteSuperheroes = favoriteSuperheroes.filter(superhero => superhero.id !== superheroId);
    localStorage.setItem('favorites', JSON.stringify(updatedFavoriteSuperheroes));
    displayFavSuperheroes();
}

// Initial display on page load
displayFavSuperheroes();