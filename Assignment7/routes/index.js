var express = require("express");
var mongoose = require("mongoose");

var router = express.Router();
var DB = mongoose.model("Links");



router.post("/links", function(req, res, next) {
  "use strict";

  var db = new DB();

  db.title = req.body.title;
  db.links = req.body.link;
  
  db.save(function(err, db){
    if(err){ return next(err); }
    res.json(db);
  });

});


router.get("/links", function(req, res, next) {
 "use strict";

 DB.find(function(err, links){
    if(err){ 
      return next(err);
    }
    res.json(links);
  });

});


router.get("/click/:title", function(req, res){
  "use strict";

  var title = decodeURI(req.params.title);
  //res.json(title);

  var query = DB.find({title: title});
  

  query.exec(function(err, items) {
      if (!items) { res.status(404).send("Title does not exist ");}
      else {
          var clicks = Number(items[0].clicks);
          DB.collection.update({"title": title}, {$set: {"title":title  ,"clicks": clicks + 1}}, { w: 0 });
          res.status(301);
          res.setHeader("Cache-Control", "no-cache");
          res.set("Location", items[0].links);
          res.send();
      }
  });

});


module.exports = router;
