define(["jquery", "q"], function($, Q) {
    return function() {
    var deferred = Q.defer();

    $.ajax({
      url: "https://sizzling-inferno-3854.firebaseio.com/.json"
    })
    .done(function(data) {
      deferred.resolve(data);
    })
    .fail(function(xhr, status, error){
      deferred.reject(error);
    });
      return deferred.promise;
  };

});




// define(function() {
 
//  return {
//     songs: function(callback) {
//       $.ajax({
//         url: "https://sizzling-inferno-3854.firebaseio.com/.json"
//       }).done(function(data) {
//         callback.call(this, data);
//       });
//     }
//   };
// });

