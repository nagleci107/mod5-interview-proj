// OMDb API http://www.omdbapi.com/?i=tt3896198&apikey=1d08b643
// key: 1d08b643

const movieListEl = document.querySelector(".movies");

const t = localStorage.getItem("title");

const searchInput = document.querySelector("#search-input");

let movies;

async function filterMovies(filter) {
  const movieListEl = document.querySelector(".movies");

  movieListEl.classList.add("movies__loading")

  if (!movies) {
    movies = await getMovies();
  }

  movieListEl.classList.remove("movies__loading");

  if (filter === "ALPH_TO_Z") {
    movies.sort((a, b) => a.title.localeCompare(b));
  } 
  else if (filter === "ALPH_TO_A") {
    movies.sort((a, b) => b.title.localeCompare(a));
  }
  else if (filter === "NEWEST") {
    movies.sort((a, b) => a.released.getTime() - b.released.getTime());
  }
  else if (filter === "OLDEST") {
    movies.sort((a, b) => b.released.getTime() - a.released.getTime());
  }
};
  


async function getMovies(t) {
    const movies = await fetch(`http://www.omdbapi.com/?s=${t}&apikey=1d08b643`);
    const moviesData = await movies.json();

    movieListEl.innerHTML = ""; // Clear previous results

    // Check if the 'Search' array exists
    if (moviesData.Response === "True") {
        const movieDetailsPromises = moviesData.Search.map(async (movie) => {
            const detailResponse = await fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=1d08b643`);
            return await detailResponse.json();

            console.log(detailResponse)
        });

        const detailedMovies = await Promise.all(movieDetailsPromises);
        movieListEl.innerHTML = detailedMovies.map(movieHTML).join("");
    } 
    else if (moviesData.Response === "False") {
        movieListEl.innerHTML = `<div>No results found for "${t}"</div>`;
        return;
    }
    else {
        movieListEl.innerHTML = `<p>No movies found.</p>`;
    }

    moviesData.Search.forEach(movie => {
        movieListEl.innerHTML += movieHTML(movie);
    });
}

// waits for search query to be entered to re-render
searchInput.addEventListener("input", async () => {
    const t = searchInput.value;
    await getMovies(t);
});


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

// function filterRatings() {
//     const allSources = ["Internet Movie Database", "Rotten Tomatoes", "Metacritic"]
//     const targetSource = "RottenTomatoes"

// }

// function filterMovies(event) {
//   renderMovies(event.target.value);
// }



setTimeout(() => {
  getMovies();
});