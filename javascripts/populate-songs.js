define(function() {
 
 return {
    songs: function(callback) {
      $.ajax({
        url: "songs.json"
      }).done(function(data) {
        callback.call(this, data.songs);
      });
    }
  };
});
