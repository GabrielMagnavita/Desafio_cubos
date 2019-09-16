$(document).ready(() => {
  $("#searchForm").on('input', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

function getMovies(searchText){
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=b1567cf3a82500590d32e57497ea3d1a&language=pt-br&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
            <h3>${movie.title}</h3> 
            <p><img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" align="left" > ${movie.overview} </p>
            
            <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="movie.html">Detalhes</a>
            </div>
          </div>
          
                 
        `;
      });

      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=b1567cf3a82500590d32e57497ea3d1a&language=pt-br")
    .then(function (response) {
    let movie = response.data;
    console.log(movie);
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Status:</strong> ${movie.release_date} </li>
              <li class="list-group-item"><strong>Idioma:</strong> ${movie.spoken_languages[0].name}  </li>
              <li class="list-group-item"><strong>Duração:</strong> ${movie.runtime} min.</li>
              <li class="list-group-item"><strong>Orçamento:</strong> $ ${movie.budget}</li>
              <li class="list-group-item"><strong>Receita:</strong> $ ${movie.revenue} </li>
              <li class="list-group-item"><strong>Categorias:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}, ${movie.genres[2].name}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Sinopse:</h3>
            <h4>${movie.overview}</h4>
            <hr>
            <a href="index.html" class="btn btn-default">Voltar</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}
