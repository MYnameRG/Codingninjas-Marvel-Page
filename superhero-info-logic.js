// Initialize all the variables
const publicKey = "45bf6af7eb8c3857dd3bb83565cff23b";
const privateKey = "b16f7510a53a3d9925a2684e91a5c95815c63034";
const baseURL = "https://gateway.marvel.com:443/v1/public/characters";
const ts = Date.now();
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

const mainContent = document.getElementById("mainContent");
const searchParams = new URLSearchParams(window.location.search);

// Function to fetch superheroes from Marvel API
async function fetchSuperhero(id) {
  const response = await fetch(
    `${baseURL}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
  );
  const data = await response.json();
  return data.data.results;
}

// Function to display superheroes
async function displaySuperhero() {
  mainContent.innerHTML = "";
  const superheroes = await fetchSuperhero(searchParams.get("id"));
  superheroes.forEach((superhero) => {
    console.log(superhero);
    const superheroElement = document.createElement("div");
    superheroElement.innerHTML = `
        <div class="superhero">
            <img src="${superhero.thumbnail.path}.${superhero.thumbnail.extension}" alt="${superhero.name}" />
            <h2>${superhero.name}</h2>
            <p>${superhero.description}</p>
            <div class="superhero-info">
                <span class="stories">
                    <h4>Stories:</h4>
                    ${(superhero.stories.items != null && superhero.stories.items.length > 0)  ? superhero.stories.items.map((x) => {
                        return "<p style='display: inline;'>" + x.name + "</p>";
                    }) : 'No items'}
                </span>

                <span class="events">
                    <h4>Events:</h4>
                    ${(superhero.events.items != null && superhero.events.items.length > 0)  ? superhero.events.items.map((x) => {
                        return "<p style='display: inline;'>" + x.name + "</p>";
                    }) : 'No items'}
                </span>

                <span class="series">
                    <h4>Series:</h4>
                    ${(superhero.series.items != null && superhero.series.items.length > 0)  ? superhero.series.items.map((x) => {
                        return "<p style='display: inline;'>" + x.name + "</p>";
                    }) : 'No items'}
                </span>

                <span class="comics">
                    <h4>Comics:</h4>
                    ${(superhero.comics.items != null && superhero.comics.items.length > 0)  ? superhero.comics.items.map((x) => {
                        return "<p style='display: inline;'>" + x.name + "</p>";
                    }) : 'No items'}
                </span>
            </div>
        </div>
        `;
    mainContent.appendChild(superheroElement);
  });
}

// Initial display on page load
displaySuperhero();
