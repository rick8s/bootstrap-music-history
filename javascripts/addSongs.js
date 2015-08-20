define(["jquery", "q", "authentication"], function($, Q, auth){
  return function() {
    var deferred = Q.defer();

    var newSong = {
        "title": $("#songTitle").val(),
        "artist": $("#artistName").val(),
        "album": $("#albumTitle").val(),
        "genre": $("#genre").val(),
        "year": $("#year").val(),
        "uid": auth.getUid()
      };

    $.ajax({
      url: "https://sizzling-inferno-3854.firebaseio.com/songs.json",
      method: "POST",
      data: JSON.stringify(newSong)
    }).done(function(newSong) {
      console.log("newSong", newSong);
      deferred.resolve(newSong);
    }); 

    return deferred.promise;
  };
});