$(function() {

  //variables for main ul list
  var movieLists = $('.repertuar');
  //variables for url
  var movieUrl = 'http://swapi.co/api/films/';


  /* Insert Movies to DOM  */
  function insertContent(movies) {
    $.each(movies, function(indexMovie, movie) {
        var li = $('<li>', {class: "movie"});
        var h3 = $('<h3>').text(movie.title);

        li.append(h3);

        movieLists.append(li);
    });
  }

  /* Load movies and insert them into the DOM
  */
  function loadMovies() {
        $.ajax({
            	url: movieUrl
        }).done(function(response){
     		    insertContent(response.results);
    	 }).fail(function(error) {
           console.log(error);
       })
  }

  loadMovies();

});
