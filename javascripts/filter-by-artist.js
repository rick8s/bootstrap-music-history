define(function() {
 
  return {
    byArtist: function(songs, chosenArtist) {
// console.log(songs);
// console.log(chosenArtist);
      
      
      var tmpSongList = [];
      var filteredSongs = {songs:tmpSongList}; console.log(filteredSongs);
console.log(songs);
      for (var i = 0; i < songs.length; i++){
        if (chosenArtist === songs[i].artist) {
          tmpSongList.push(songs[i]);
        }
      }
    require(['hbs!../templates/songs'], function(songTemplate) {
      $("#newSongs").html(songTemplate(filteredSongs));
      });
    }
  };
});

