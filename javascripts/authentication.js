define(function(require){
  var uid = null;

  return {
    getUid: function(){
      console.log("returning", uid);
      return uid;
    },
    setUid: function(newId) {
      console.log("setting usef id to", newId);
      uid = newId;
    }
  };
});