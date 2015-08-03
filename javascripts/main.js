requirejs(
  ["dom-access", "populate-songs", "get-more-songs"], 
  function(dom, pop, getMore) {
    console.log("dom", dom);
    console.log("pop", pop.songs);
    console.log("getMore", getMore.songs);

    pop.songs(function(data) {
      console.log("data", data);
      addSongs(data, dom);
    });
    
   $("#more").click(function() { 
    getMore.songs(function(data){
      console.log("data", data);
      addSongs(data, dom);
      });
    });

  }
 
);

function addSongs(data, domElementFromDomAccess) {

  for (var i=0;i<data.length;i++) {
    
    var outputStr = "";

    outputStr += "<div class='song'><p>" + data[i].title + "</p><ul>";
    outputStr += "<li>" + data[i].artist + "</li>" ;
    outputStr += "<li>" + data[i].album + "</li>" ;
    outputStr += "<li>" + data[i].genre + "</li></ul>"; 
    outputStr += "<button id='deleteButton' class='remove'>Delete Song</button></div>";


    domElementFromDomAccess.getOutputElement().append(outputStr);
    console.log("#newSongs");
  }
}

$( document ).on( "click", "#deleteButton", function() {
  $( this ).parent().remove();
});



