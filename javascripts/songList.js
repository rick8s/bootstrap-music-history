function addSongs(data) {
  
  for (var i=0;i<data.songs.length;i++) {
    
  var outputStr = "";

    outputStr += "<div class='song'><p>" + data.songs[i].title + "</p><ul>";
    outputStr += "<li>" + data.songs[i].artist + "</li>" ;
    outputStr += "<li>" + data.songs[i].album + "</li>" ;
    outputStr += "<li>" + data.songs[i].genre + "</li></ul>"; 
    outputStr += "<button id='deleteButton' class='remove'>Delete Song</button></div>";


    $("#newSongs").append(outputStr);
    console.log("#newSongs");
  }
}

$( document ).on( "click", "#deleteButton", function() {
  $( this ).parent().remove();
});




