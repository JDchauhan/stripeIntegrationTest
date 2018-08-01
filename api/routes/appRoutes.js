'use strict';
module.exports = function(app) {
  
  app.get("/", function(req, res){
    res.send("home");
  });

  app.get('*', function(req, res) {
    console.log("error_get");
    res.send("no api found");
    //res.render("home");
  });

};  
