requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "populate-songs", "get-more-songs", "song-entry-form"], 
  function($, lodash,  _firebase, Handlebars, bootstrap, dom, pop, getMore) {



      // Create a referance to your Firebase database
    var myFirebaseRef = new Firebase("https://sizzling-inferno-3854.firebaseio.com/");

      // Listen for when any changes occur to the "songs" key
    myFirebaseRef.child("songs").on("value", function(snapshot) {
      console.log(snapshot.val()); 

        //Store the entire songs key in a local variable
      var songs = snapshot.val();
      var allSongsArray = [];

      for (var key in songs) {
        allSongsArray[allSongsArray.length] = songs[key];
      }
      console.log(allSongsArray);

       // Uniquely store each artist
       var uniqueArtist = _.chain(allSongsArray)
                           .sortBy('artist')
                           .unique('artist')
                           .pluck('artist')
                           .value();
      console.log(uniqueArtist);

      var uniqueAlbum = _.chain(allSongsArray)
                         .sortBy('album')
                         .unique('album')
                         .pluck('album')
                         .value();

      console.log(uniqueAlbum);

      pop.songs(function(songs) { //was (data)
        // console.log("data", data);
    
          // populate the song list on the view music page
        require(['hbs!../templates/songs'], function(songTemplate) {
          $("#newSongs").html(songTemplate(songs)); //was data
        });
      });

      pop.songs(function(uniqueArtist) { 

        // populate the artist dropdown menu to select an artist
        require(['hbs!../templates/artists'], function(artistTemplate) {
          $("#pickArtist").html(artistTemplate(uniqueArtist)); //was (data)
        });
      });

      pop.songs(function(data) { 

          // populate the album dropdown menu to select an album
        require(['hbs!../templates/albums'], function(albumTemplate) {
          $("#pickAlbum").html(albumTemplate(data)); //was (data)
        });
      });
      
                          
    }); // from line 28



    // console.log("dom", dom);
    // console.log("pop", pop.songs);
       
  
     

        // deletes a song and its related information from the view music page
      $( document ).on( "click", "#deleteButton", function() {
        $( this ).parent().remove();
      });
  });






