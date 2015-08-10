define(["jquery"], function($) {
  var $outputEl = $("#newSongs");

  return {
    getOutputElement: function() {
      return $outputEl;
    }
  };
});