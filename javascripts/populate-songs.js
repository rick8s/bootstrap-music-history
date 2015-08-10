define(function() {
 
 return {
    songs: function(callback) {
      $.ajax({
        url: "https://sizzling-inferno-3854.firebaseio.com/.json"
      }).done(function(data) {
        callback.call(this, data);
      });
    }
  };
});

