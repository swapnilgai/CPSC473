var express = require("express"),
    http = require("http"),
    socketIo = require("socket.io"),
    mongoose = require("mongoose"),
    app = express();
    
var socket;
app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

// connect to the amazeriffic 
mongoose.connect("mongodb://localhost/amazeriffic");

var ToDoSchema = mongoose.Schema({
    description: String,
    tags: [ String ]
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

var server = http.createServer(app);
var io = socketIo(server);
server.listen(3000);

io.on("connection",function(skt){
   "use strict";
   
   console.log("connected to server");
   socket = skt;
});


app.get("/todos.json", function (req, res) {
    "use strict";

    ToDo.find({}, function (err, toDos) {
        res.json(toDos);
    });
});

function sendAll(result){
     "use strict";

     socket.emit("newToDO",result);
}


app.post("/todos", function (req, res) {
    "use strict";

    console.log(req.body);
    var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
    newToDo.save(function (err) {
        if (err !== null) {
            console.log(err);
            res.send("ERROR");
        } else {
            ToDo.find({}, function (err, result) {
                if (err !== null) {
                    res.send("ERROR");
                }
                //Update to all
                sendAll(result);
                res.json(result);
            });
        }
    });
});






