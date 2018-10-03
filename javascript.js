$(function(){
	populateButtons(searchArray,'searchButton','#buttonsArea');
	console.log("Page Loaded");
})

var searchArray = ['Jurassic Park', 'Clueless', 'Home Alone', 'Hooked', 'Matilda', 'Ace Ventura: Pet Detective', 'Pretty Woman', 'The Wedding Singer', 'There\'s Something About Mary', 'Office Space', 'Liar Liar', 'Austen Powers: International Man of Mystery', 'Wayne\'s World', 'Mrs. Doubtfire', 'Tommy Boy', 'Big Daddy', 'Jumanji', 'Casper', 'Hocus Pocus'];
var offsetCounter = 0;
var type;

function populateButtons(searchArray,classToAdd,areaToAddTo){
	$(areaToAddTo).empty();
	for(var i=0; i<searchArray.length; i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type',searchArray[i]);
		a.text(searchArray[i]);
		$(areaToAddTo).append(a);
	}
}

$(document).on('click','.searchButton',function(){
	$('#searches').empty();
	type = $(this).data('type');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=ByVBy7806AjU6qJWEfCMtLBuPhGug7XG&limit=10';
	$.ajax({url:queryURL,method:'GET'})
		.done(function(response){
			for(var i=0; i<response.data.length; i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: '+rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src',still);
				image.attr('data-still',still);
				image.attr('data-animated',animated);
				image.attr('data-state','still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);
			}
			var searchMore = $('<span class="searchMore">More...</span>');
			$('#searches').append(searchMore);
		})
})

$(document).on('click', '.searchMore', function(){
	$(this).remove();
	offsetCounter++;
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q='+type+'&api_key=ByVBy7806AjU6qJWEfCMtLBuPhGug7XG&limit=10&offset='+(offsetCounter * 10);
	$.ajax({url:queryURL,method:'GET'})
		.done(function(response){
			for(var i=0; i<response.data.length; i++){
				var searchDiv = $('<div class="search-item">');
				var rating = response.data[i].rating;
				var p = $('<p>').text('Rating: '+rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src',still);
				image.attr('data-still',still);
				image.attr('data-animated',animated);
				image.attr('data-state','still');
				image.addClass('searchImage');
				searchDiv.append(p);
				searchDiv.append(image);
				$('#searches').append(searchDiv);
			}
			var searchMore = $('<span class="searchMore">More...</span>');
			$('#searches').append(searchMore);
		})
})

$(document).on('click','.searchImage',function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src',$(this).data('animated'));
		$(this).attr('data-state','animated');
	} else {
		$(this).attr('src',$(this).data('still'));
		$(this).attr('data-state','still');
	}
})

$('#addSearch').on('click',function(){
	var newSearch = $('input').eq(0).val();
	searchArray.push(newSearch);
	populateButtons(searchArray,'searchButton','#buttonsArea');
	return false; 
})