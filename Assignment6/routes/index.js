var express = require("express");
var router = express.Router();

var redis = require("redis"),
    redisClient,
    // declare a counts objects to store the counts
    counts = {};

redisClient = redis.createClient();



//var wins = 0, losses = 0;
var arrWinLosses = ["heads", "tails"]; 

/* GET home page. */
router.get("/", function(req, res) {
  "use strict";

  res.render("index", { title: "Express" });
});



//post flip
router.post("/flip", function(req, res){
    
    "use strict";
  
	//redis client
	redisClient.mget(["wins", "losses"], function (err, results) {
		if (err !== null) {
		    console.log("ERROR: " + err);
		    return;
		}

		counts.wins = parseInt(results[0], 10) || 0;
		counts.losses = parseInt(results[1], 10) || 0;

		//Below function referred from answred by Jacob Relkin http://stackoverflow.com/questions/4550505/getting-random-value-from-an-array
  
		var rdVal = arrWinLosses[Math.floor(Math.random() * arrWinLosses.length)];
		var call = req.body.call;

		if(call === rdVal){
			redisClient.incr("wins");
			counts.wins = counts.wins + 1;
			return res.json({"result": "win"});
		}else{
			redisClient.incr("losses");
			counts.losses = counts.losses + 1;
			return res.json({"result": "losses"});
		}
	});
  
});


//get stats
router.get("/stats", function(req, res){
    "use strict";

	redisClient.mget(["wins", "losses"], function (err, results) {
		if (err !== null) {
		    console.log("ERROR: " + err);
		    return;
		}

		counts.wins = parseInt(results[0], 10) || 0;
		counts.losses = parseInt(results[1], 10) || 0;

    });
   
   return res.json({"wins": counts.wins, "losses":counts.losses});
});


//delte stats
router.delete("/stats", function(req, res){
    "use strict";

	redisClient.mget(["wins", "losses"], function (err) {
		if (err !== null) {
		    console.log("ERROR: " + err);
		    return;
		}
        counts.wins = 0;
        counts.losses = 0;

        redisClient.set("wins", 0);
		redisClient.set("losses", 0);
    });
   
   return res.json({"result": "deleted"});
});


module.exports = router;
