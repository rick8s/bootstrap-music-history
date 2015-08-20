define(["firebase", "authentication"], function(_firebase, auth){

// Detect if the user is already logged in
  var ref = new Firebase("https://sizzling-inferno-3854.firebaseio.com");
  var authData = ref.getAuth();

  console.log("authData", authData);

  //If there is no token key on the authData object,
  // authenticate with Github OAuth
  if (authData === null){
    ref.authWithOAuthPopup("github", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
        auth.setUid(authData.uid);
      }
    });
  } else {
    console.log("Authenticated successfully with payload:", authData);
    auth.setUid(authData.uid);
  }
});
