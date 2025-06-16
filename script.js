let page = 1;
const API_KEY = "48c830443c3504d4934ce45a523db659";
const API_URL = () => `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`;
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function updatePage(){
    getMovies(API_URL());
    current.innerHTML = page
}

function nextPage(){
    page++;
    updatePage()
}

function prevPage(){
    if (page>1){
        page--;
        updatePage()
    }
}

next.addEventListener("click", () => {
    nextPage()
})

prev.addEventListener("click", () => {
    prevPage()
})

async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results)
    showMovies(data.results)
}

function showMovies(data){
    moviesElement.innerHTML = ""
    data.forEach(movie => {
        const {title, poster_path, vote_average, overview, release_date} = movie;
        const movieCard = document.createElement("div")
        movieCard.classList.add("movie");
        movieCard.innerHTML = `
        <img src = ${IMG_URL + poster_path} alt = "${title} />
        <div class="details">
            <h3>${title}</h3>
            <p>${overview.length > 100 ? overview.substring(0, 100) + '...' : overview}</p>
            <h5 class="release-date">${release_date ? release_date : 'N/A'}</h5>
            <span class="vote" style="background-color: ${vote_average >= 8 ? 'green' : vote_average >= 5 ? 'orange' : 'red'}">${vote_average}</span>
        </div>
        `
        moviesElement.appendChild(movieCard)
    });
}

SForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const query = searchInp.value
    console.log(query)
    if (query !== ''){
        getMovies(SEARCH_API + query)
        searchInp.value = ''
    } else {
        updatePage()
    }
})
updatePage()
title.addEventListener("click", () => {
    location.reload()
})