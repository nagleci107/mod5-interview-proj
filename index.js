// OMDb API http://www.omdbapi.com/?i=tt3896198&apikey=1d08b643
// key: 1d08b643

const movieListEl = document.querySelector(".movies");

const t = localStorage.getItem("title");

const searchInput = document.querySelector("#search-input");

let currentMovies = [];


async function getMovies(t) {
    
    const movies = await fetch(`http://www.omdbapi.com/?s=${t}&apikey=1d08b643`);
    const moviesData = await movies.json();
    
    if (moviesData.Response === "True") {
            currentMovies = moviesData.Search; // Store the current movie results
            await renderMovies(currentMovies);
        } else {
            movieListEl.innerHTML = `<div>No results found for "${t}"</div>`;
        }
}

async function renderMovies(movies) {

    movieListEl.classList.add("movies__loading")

    if (!currentMovies) {
        currentMovies = await getMovies();
    }

    movieListEl.classList.remove("movies__loading");

    movieListEl.innerHTML = ""; // Clear previous results

    const movieDetailsPromises = movies.map(async (movie) => {
        const detailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1d08b643`);
        return await detailResponse.json();
    });
        const detailedMovies = await Promise.all(movieDetailsPromises);
        detailedMovies.forEach(movie => {
        movieListEl.innerHTML += movieHTML(movie);
    });
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
            <div class="movie__tomatoes">
              ${rottenTomatoes ? rottenTomatoes.Value : 'No rating available'}
            </div>
            </div>
            </div>
            </div>
  </div>`;
}

async function filterMovies(event) {
    function parseReleaseDate(releaseDate) {
    const [day, month, year] = releaseDate.split(' ');
    const monthIndex = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    }[month];
    return new Date(year, monthIndex, day);
    }


    if (event === "ALPH_TO_Z") {
    currentMovies.sort((a, b) => a.Title.localeCompare(b.Title));
  } 
  else if (event === "ALPH_TO_A") {
    currentMovies.sort((a, b) => b.Title.localeCompare(a.Title));
  }
  else if (event === "NEWEST") {
    currentMovies.sort((a, b) => parseReleaseDate(b.Released) - parseReleaseDate(a.Released));
  }
  else if (event === "OLDEST") {
    currentMovies.sort((a, b) => parseReleaseDate(a.Released) - parseReleaseDate(b.Released));
  }

  await renderMovies(currentMovies);
};

// waits for search query to be entered to re-render
searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") { 
        const t = searchInput.value; 
        await getMovies(t);
    }
});



setTimeout(() => {
    const initialTitle = localStorage.getItem("title") || "";
    getMovies(initialTitle);
}, 1000);