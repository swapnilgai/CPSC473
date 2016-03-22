var express = require("express");
var router = express.Router();

var wins = 0, losses = 0;
var arrWinLosses = ["head", "tails"]; 

/* GET home page. */
router.get("/", function(req, res) {
  "use strict";
  res.render("index", { title: "Express" });
});


router.post("/flip", function(req, res){
  
  //Below function referred from answerd by Jacob Relkin http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
  "use strict";
  var rdVal = arrWinLosses[Math.floor(Math.random() * arrWinLosses.length)];
  var call = req.body.call;
  
  if(call === rdVal){
  	wins = wins + 1;
  	return res.json({"result": "win"});
  }else{
  	losses = losses + 1;
  	return res.json({"result": "losses"});
  }
});


router.get("/stats", function(req, res){
   "use strict";
   return res.json({"wins": wins, "losses":losses});
});




module.exports = router;
