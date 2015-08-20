requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
    'firebase': '../bower_components/firebase/firebase',
    'lodash': '../bower_components/lodash/lodash.min',
    'q': '../bower_components/q/q'
  },
  shim: {
    'bootstrap': ['jquery'],
    'firebase': {
      exports: 'Firebase'
    }
  }
});

requirejs(
  ["jquery", "lodash", "firebase", "hbs", "bootstrap", "dom-access", "authentication", "check-for-authentication", "get-songs", "get-more-songs", "populate-songs", "filter-by-artist", "filter-by-album", "song-entry-form"], 
  function($, lodash,  _firebase, Handlebars, bootstrap, dom, auth, checkAuth, getSongs, getMoreSongs, pop, filter, filterAlb, songEntry) {

    

// The following is using q-promisses to retrieve songs from get-songs and get-more-songs 
   
    var first_list_of_songs = getSongs();
      var all_songs = [];
      first_list_of_songs.then(function(first_songs) {
        for (var i = 0; i < first_songs.songs.length; i++) {
          all_songs.push(first_songs.songs[i]);
        }
        return getMoreSongs();
      })
      .then(function(second_songs) {
        for (var i = 0; i < second_songs.songs.length; i++) {
          all_songs.push(second_songs.songs[i]);
        }
      })
      .fail(function(xhr, status, error){
        deferred.reject(error);
      })
      .done(function(){
        // 
      }); //console.log("all_songs", all_songs);

      // Create a referance to your Firebase database
    var myFirebaseRef = new Firebase("https://sizzling-inferno-3854.firebaseio.com/");

      // Listen for when any changes occur to the "songs" key
    myFirebaseRef.child("songs").orderByChild("uid").equalTo(auth.getUid()).on("value", function(snapshot) {
      // console.log(snapshot.val()); 




        //Store the entire songs key in a local variable
      var songs = snapshot.val();
      var allSongsArray = [];

      for (var key in songs) {
        allSongsArray[allSongsArray.length] = songs[key];
      }
      // console.log(allSongsArray);

       // Uniquely store each artist
       var uniqueArtist = _.chain(allSongsArray)
                           .sortBy('artist')
                           .unique('artist')
                           .pluck('artist')
                           .value();
      // console.log(uniqueArtist);
      var artistObj = { artists: uniqueArtist };
        // populate the artist dropdown menu to select an artist
      require(['hbs!../templates/artists'], function(artistTemplate) {
        $("#pickArtist").html(artistTemplate(artistObj)); //was (data)
      });

      var uniqueAlbum = _.chain(allSongsArray)
                         .sortBy('album')
                         .unique('album')
                         .pluck('album')
                         .value();
      // console.log(uniqueAlbum);
        // populate the album dropdown menu to select an album
      var albumObj = { albums: uniqueAlbum };
      require(['hbs!../templates/albums'], function(albumTemplate) {
          $("#pickAlbum").html(albumTemplate(albumObj)); //was (data)
          // console.log(Handlebars)
      });

      $("#pickArtist").on("click", ".artist a", function(){
        var chosenArtist = $(this).parent().attr('value');
        
          filter.byArtist(allSongsArray, chosenArtist);
      });

      $("#pickAlbum").on("click", ".album a", function(){
        var chosenAlbum = $(this).parent().attr('value');
        
          filterAlb.byAlbum(allSongsArray, chosenAlbum);
      });

      // pop(function(songs) { //was (data)
      //   // console.log("data", data);
    
      //     // populate the song list on the view music page
      //   require(['hbs!../templates/songs'], function(songTemplate) {
      //     $("#newSongs").html(songTemplate(songs)); //was data
      //   });
      // });
      pop()
        .then(function(songs) {
          require(['hbs!../templates/songs'], function(songTemplate) {
            $("#newSongs").html(songTemplate(songs)); //was data
          });
        }); 
                          
    }); // from line 28

        // deletes a song and its related information from the view music page
      $( document ).on( "click", "#deleteButton", function() {
        $( this ).parent().remove();
      });

      // refresh music list to full
      // $( document).on("click", "resetBtn", function(){
      //   document.reload(true);
      // });
  });










