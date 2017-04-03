

$(document).ready(function() {
  discoverMovies(render);
});



var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "977cbf097794e504151920363b0861ae" // TODO 0 add your api key
}


/**
 * Makes an AJAX request to /discover/movie endpoint of the API
 *
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */


function discoverMovies(callback) {
  $.ajax({
    url: api.root + "/discover/movie",
    data: {
      api_key: api.token
    },
    success: function(response) {
      model.browseItems = response.results;
      callback();
    }
  });
}


/**
 * Makes an AJAX request to the /search/movie endpoint of the API, using the
 * query string that was passed in
 *
 * if successful, updates model.browseItems appropriately and then invokes
 * the callback function that was passed in
 */
$("#form-search").on("submit", function() {
    event.preventDefault();
    var input = $("input[type=text]");
    var searchTerm = $(input).val();
    console.log("You searched for " + searchTerm);
    searchMovies(searchTerm, render());
});

    function searchMovies(searchTerm, callback) {
      console.log("searching for movies with '" + searchTerm + "' in their title...");
      $.ajax({
        url: api.root + "/search/movie/",
        data: {
          api_key: api.token,
          query: searchTerm,
          dataType: 'jsonp'
        },
        success: function(response) {
          model.browseItems = response.results;
          callback(response);
        }

    });
    }





  // TODO 9 -- NEED HELP
  // implement this function as described in the comment above
  // you can use the body of discoverMovies as a jumping off point



/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {

  // clear everything
  $("#section-watchlist ul").empty();
  $("#section-browse ul").empty();

  // insert watchlist items
  model.watchlistItems.forEach(function(movie) {
    var title = $("<p></p>").text(movie.original_title);
    var itemView = $("<li></li>")
      .append(title)
      .addClass("item-watchlist")
      // TODO 3 -- COMPLETED (I don't understand this part)
      // give itemView a class attribute of "item-watchlist"

    $("#section-watchlist ul").append(itemView);
  });

  // insert browse items
  model.browseItems.forEach(function(movie) {
    var title = $("<h4></h4>").text(movie.original_title);
    var description = $("<p></p>").text(movie.overview);
    var button = $("<button></button>")
      .text("Add to Watchlist")
      .addClass("item-watchlist")
      .click(function() {
        model.watchlistItems.push(movie);
        render();
      });

      // TODO 2 -- COMPLETED
      // the button should be disabled if this movie is already in
      // the user's watchlist
      // see jQuery .prop() and Array.indexOf()
      if (model.watchlistItems.indexOf(movie) != -1) {
          button.prop("disabled", true)
      }


    // TODO 1 -- COMPLETED
    // create a paragraph containing the movie object's .overview value
    // then, in the code block below,
    // append the paragraph in between the title and the button


    // append everything to itemView, along with an <hr/>
    var itemView = $("<li></li>")
      .append($("<hr/>"))
      .append(title)
      .append(description)
      .append(button);

    // append the itemView to the list
    $("#section-browse ul").append(itemView);
  });

}
