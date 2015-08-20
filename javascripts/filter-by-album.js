define(function() {
 
  return {
    byAlbum: function(songs, chosenAlbum) {
console.log(songs);
console.log(chosenAlbum);
      
      
      var tmpSongList = [];
      var filteredSongs = {songs:tmpSongList}; console.log(filteredSongs);
console.log(songs);
      for (var i = 0; i < songs.length; i++){
        if (chosenAlbum === songs[i].album) {
          tmpSongList.push(songs[i]);
        }
      }
    require(['hbs!../templates/songs'], function(songTemplate) {
      $("#newSongs").html(songTemplate(filteredSongs));
      });
    }
  };
});

