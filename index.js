// OMDb API http://www.omdbapi.com/?i=tt3896198&apikey=1d08b643
// key: 1d08b643


// async function renderMovies(filter) {
//   const moviesWrapper = document.querySelector(".movies");

//   moviesWrapper.classList.add("movies__loading")

//   if (!movies) {
//     movies = await getMovies();
//   }

//   moviesWrapper.classList.remove("movies__loading");

//   if (filter === "LOW_TO_HIGH") {
//     movies.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice));
//   }
//   else if (filter === "HIGH_TO_LOW") {
//     movies.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice));
//   }
//   else if (filter === "RATING") {
//     movies.sort((a, b) => b.rating - a.rating);
//   }

 

//   const moviesHtml = movies.map((movie) => {
//     return `<div class="movie__title">
            // Title
            // </div>
            // <div class="movie__released">
            //     Aug 06 1998
            // </div>
            // <div class="movie__runtime">
            //     107 min
            // </div>
            // <div class="movie__tomatoes">
            //     95%
            // </div>
//   </div>`;
//   })
//   .join("");

//   moviesWrapper.innerHTML = moviesHtml
// }

// function ratingsHTML(rating) {
//    let ratingHTML = "";
//   for (let i = 0; i < Math.floor(rating); ++i) {
//     ratingHTML += '<i class="fas fa-star"></i>\n'
//   }
//   if (!Number.isInteger(rating)) {
//     ratingHTML += '<i class="fas fa-star-half-stroke"></i>\n'
//   }
//   return ratingHTML;
// }

// function priceHTML(originalPrice, salePrice) {
//   if (!salePrice) {
//     return `$${originalPrice.toFixed(2)}`
//   }
//   return `<span class="movie__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
// }

// function filterMovies(event) {
//   renderMovies(event.target.value);
// }



// setTimeout(() => {
//   renderMovies();
// });