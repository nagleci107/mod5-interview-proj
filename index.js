// OMDb API http://www.omdbapi.com/?i=tt3896198&apikey=1d08b643
// key: 1d08b643

const movieListEl = document.querySelector(".movies");
const resultsEl = document.querySelector(".results")

const t = localStorage.getItem("title");

const searchInput = document.querySelector("#search-input");

let currentMovies = [];


async function getMovies(t) {

    const movies = await fetch(`http://www.omdbapi.com/?s=${t}&apikey=1d08b643`);
    const moviesData = await movies.json();
    
    if (moviesData.Response === "True") {
            currentMovies = moviesData.Search; // Store the current movie results
            await renderMovies(currentMovies);
        } 
        else if (t === "") {
            resultsEl.classList.remove("movies__loading");
            movieListEl.innerHTML = `<div>Start your search.</div>`;
            return;
        }
        else {
            resultsEl.classList.remove("movies__loading");
            movieListEl.innerHTML = `<div>No results found for "${t}"</div>`;
        }
}

async function renderMovies(movies) {

    resultsEl.classList.add("movies__loading");

    if (!currentMovies) {
        currentMovies = await getMovies();
    };
    
    movieListEl.innerHTML = ""; // Clear previous results

    const movieDetailsPromises = movies.map(async (movie) => {
        const detailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1d08b643`);
        return await detailResponse.json();
    });
        const detailedMovies = await Promise.all(movieDetailsPromises);
        detailedMovies.forEach(movie => {
        movieListEl.innerHTML += movieHTML(movie);
    });

    resultsEl.classList.remove("movies__loading");
    
}

function movieHTML(movie) {
    const rottenTomatoes = movie.Ratings.find(rating => rating.Source === "Rotten Tomatoes");

    return `<div class="movie">
            <div class="movie__info">
            <figure class="movie__img--wrapper">
            <img class="movie__img" src="${movie.Poster}" alt="${movie.Title} Poster">
            </figure>
            <div class="movie__title">
            ${movie.Title}
            </div>
            <div class="movie__released">
             ${movie.Released}
            </div>
            <div class="movie__details">
            <div class="movie__runtime">
              ${movie.Runtime}
            </div>
            <div class="movie__tomatoes">RT: 
              ${rottenTomatoes ? rottenTomatoes.Value : 'No rating available'}
            </div>
            </div>
            </div>
            </div>
  </div>`;
}

async function filterMovies(event) {
    const filter = event.target.value;
    const movieDetailsPromises = currentMovies.map(async (movie) => {
        const detailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1d08b643`);
        return await detailResponse.json();
    }); // for the release date data

    const detailedMovies = await Promise.all(movieDetailsPromises);

    function parseReleaseDate(releaseDate) { // reformats the release date data to be sortable
        if (!releaseDate) return new Date();
        const [day, month, year] = releaseDate.split(' ');
        const monthIndex = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        }[month];
        return new Date(year, monthIndex, day);
    }


    if (filter === "ALPH_TO_Z") {
    detailedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
    console.log(detailedMovies);
  } 
  else if (filter === "ALPH_TO_A") {
    detailedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
    console.log(detailedMovies);
  }
  else if (filter === "NEWEST") {
    detailedMovies.sort((a, b) => {
        return parseReleaseDate(b.Released) - parseReleaseDate(a.Released)});
    console.log(detailedMovies);
  }
  else if (filter === "OLDEST") {
    detailedMovies.sort((a, b) => {
        return parseReleaseDate(a.Released) - parseReleaseDate(b.Released)});
    console.log(detailedMovies);
  }

  await renderMovies(detailedMovies);
};

// waits for search query to be entered to re-render
searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") { 
        const t = searchInput.value; 
        await getMovies(t);
    }
});


resultsEl.classList.add("movies__loading");
setTimeout(() => {
    const initialTitle = localStorage.getItem("title") || "";
    getMovies(initialTitle);
}, 1000);