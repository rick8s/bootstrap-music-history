requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});


requirejs(
  ["jquery", "hbs", "bootstrap"],
  function($, Handlebars, bootstrap) {
   
    $("#addYourSong").click(function() { 
      var newSong = {
        "title": $("#songTitle").val(),
        "artist": $("#artistName").val(),
        "album": $("#albumTitle").val(),
        "genre": $("#genre").val(),
        "year": $("#year").val()
      };

    $.ajax({
      url: "https://sizzling-inferno-3854.firebaseio.com/songs.json",
      method: "POST",
      data: JSON.stringify(newSong)
    }).done(function(newSong) {
      console.log("newSong", newSong);
      }); 
    });
  });