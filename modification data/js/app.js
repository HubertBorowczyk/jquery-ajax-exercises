$(function () {
	//variables for main ul list
	var movieLists       = $('.repertuar');
	//variables for url
	var movieUrl         = 'http://api.coderslab.pl/movies';
	//forma variables
	var formTitle        = $('.get_title');
	var formDescription  = $('.get_description');

	// ------------------------ load movie function ------------------

	function insertResponse(movies) {
		$.each(movies, function (index, movie) {
			var li         = $('<li>');
			var title      = $('<h4>').text(movie.title);
			var deleteBtn  = $('<button>', {class: 'delete-btn'}).text('usuń');
			var editBtn    = $('<button>', {class:'edit-btn'}).text('zmodyfikuj');

			li.attr('data-id', movie.id);
			li.append(title, deleteBtn, editBtn);
			movieLists.append(li);
		});
	}
	function loadMovies() {
		$.get({
			url: movieUrl
		}).done(function (response) {
			insertResponse(response);
		}).fail(function (error) {
			console.log(error);
		});
	}

	// ------------------ add movie function -------------------------

	function addMovie() {
		var addBtn = $('#addMovie');

		addBtn.on('click', function () {
			var movieTitle       = formTitle.val();
			var movieDescription = formDescription.val();
			var newMovie         =  {
					"title": movieTitle,
					"description": movieDescription,
					"screenings": [
						{"screening_date": "Foo screening 1"},
						{"screening_date": "Foo screening 2"}
  				]};
			$.post({
				url: movieUrl,
				dataType: 'json',
				data: JSON.stringify(newMovie)
			}).done(function () {
				console.log('udało się');
			}).fail(function (error) {
				console.log(error);
			});
		});
	}
	// ----------------------- delete movie function ----------------

	function deleteMovie(){

		movieLists.on('click','.delete-btn', function(){

			var thisLi = $(this).parent();
			var id = thisLi.attr('data-id');

			$.ajax({
				url: movieUrl+'/'+id,
				type:'delete'
			}).done(function(response){
				console.log(response);
				thisLi.remove();
			}).fail(function(error){
				console.log(error);
			});
		});
	}

	// -------------- edit movie function -----------------

	function updateMovie(){
		movieLists.on('click', '.edit-btn', function(){
			var thisBtn          = $(this);
			var thisLi           = thisBtn.parent();
			var id               = thisLi.attr('data-id');
			var editTitle        = $('<input type = "text" class="edit-title">');
			var editDescription  = $('<textarea class="edit-description">');

			if(!thisLi.hasClass('editable')){
				thisLi.addClass('editable');
				$.get({
					url: movieUrl+'/'+id
				}).done(function(response){
					editDescription.text(response.description);
					editTitle.val(response.title);
					thisLi.prepend(editTitle, editDescription);
					thisLi.find('h4').text('');
					thisBtn.text('Zatwierdź');
				}).fail(function(error){
					console.log(error);
				});
			} else {
				var editedTitle       = thisLi.find('.edit-title');
				var editedDescription = thisLi.find('.edit-description');
				var newMovie          =  {
					"title": editedTitle.val(),
					"description": editedDescription.val(),
					"screenings": [
						{"screening_date": "Foo screening 1"},
						{"screening_date": "Foo screening 2"}
  				]};
				$.ajax({
					type:'put',
					url: movieUrl+'/'+id,
					dataType: 'json',
					data: JSON.stringify(newMovie)
				}).done(function (response) {
					thisLi.removeClass('editable');
					thisBtn.text('zmodyfikuj');
					thisLi.find('h4').text(editedTitle.val());
					editedDescription.remove();
					editedTitle.remove();
				}).fail(function (error) {
					console.log(error);
				});
			}
		});
	}

	loadMovies();
	addMovie();
	deleteMovie();
	updateMovie();
});
