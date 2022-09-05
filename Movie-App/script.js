const APIURL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMAGEPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.getElementById("form");
const search = document.getElementById("search");

//get trending movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    diplayMovies(respData.results);

}
function diplayMovies(movies){

    main.innerHTML= '';
    movies.forEach(movie =>{
        const { poster_path, title, vote_average, overview} = movie;

        const movieEl = document.createElement ('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
     
            <img
                src="${IMAGEPATH + poster_path}"
                alt="${title}"
            />
            <div class="movie-info">
                <h3>${title}</h3>
                <span class= "${getClassbyVote(vote_average)}">${vote_average}</span>
            </div>
            <div class = "overview">
                <h4> Overview:</h4>
                ${overview}
            </div>
     
        `;

        main.appendChild(movieEl);
    });
}

function getClassbyVote(vote){
    if(vote > 8){
        return 'green';
    } else if (vote >= 5){
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchVal = search.value;

    if(searchVal){
        getMovies(SEARCHAPI + searchVal);

        search.value = '';
    }
});