// OMDb API http://www.omdbapi.com/?i=tt3896198&apikey=1d08b643
// key: 1d08b643


// async function renderMovies(filter) {
//   const moviesWrapper = document.querySelector(".movies");

//   moviesWrapper.classList.add("movies__loading")

//   if (!movies) {
//     movies = await getMovies();
//   }

//   moviesWrapper.classList.remove("movies__loading");

//   if (filter === "ALPH_TO_Z") {
//     movies.sort((a, b) => a.title.localeCompare(b));
//   } 
//   else if (filter === "ALPH_TO_A") {
//     movies.sort((a, b) => b.title.localeCompare(a));
//   }
//   else if (filter === "NEWEST") {
//     movies.sort((a, b) => a.released.getTime() - b.released.getTime());
//   }
//   else if (filter === "OLDEST") {
//     movies.sort((a, b) => b.released.getTime() - a.released.getTime());
//   }

 

//   const moviesHtml = movies.map((movie) => {
//     return `<div class="movie__title">
            // ${movie.title}
            // </div>
            // <div class="movie__released">
            //  ${movie.released}
            // </div>
            // <div class="movie__runtime">
            //   ${movie.runtime}
            // </div>
            // <div class="movie__tomatoes">
            //   ${movie.ratings}
            // </div>
//   </div>`;
//   })
//   .join("");

//   moviesWrapper.innerHTML = moviesHtml
// }

// function filterRatings() {
//     const allSources = ["Internet Movie Database", "Rotten Tomatoes", "Metacritic"]
//     const targetSource = "RottenTomatoes"

// }

// function filterMovies(event) {
//   renderMovies(event.target.value);
// }



// setTimeout(() => {
//   renderMovies();
// });