
define(function() {
 
return {
    songs: function(callback) {
      $.ajax({
        url: "songs2.json"
      }).done(function(data) {
        callback.call(this, data.songs);
      });
    }
  };
});



