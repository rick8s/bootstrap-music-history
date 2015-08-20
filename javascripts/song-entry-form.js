requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery']
  }
});


requirejs(
  ["jquery", "hbs", "bootstrap", "firebase", "addSongs", "check-for-authentication"],
  function($, Handlebars, bootstrap, _firebase, addSongs, checkAuth) {
 
 
   
    $(document).on('click', '#addToMyList', function(e) {
      e.preventDefault(); 
      addSongs()
      .then(function(e) {
        $("#addNewSong")[0].reset();
        $("#addNewSong").prepend('<h1>Song Added!</h1>');
      })
      .fail(function(xhr, status, error) {
        deferred.reject(error);
      });
    });

    // $("#addNewSong")[0].reset(); // resets the form 
  });
 