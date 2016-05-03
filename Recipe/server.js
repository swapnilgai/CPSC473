/**
 * Created by swapnil on 4/28/16.
 */

const Hapi = require("hapi");
const Inert = require('inert');
const Path = require('path');
const port = 5000;
 
 
const server = new Hapi.Server({
   connections: {
       routes: {
           files: {
               relativeTo: Path.join(__dirname)
           }
       }
   }
});

server.connection({ port: port })

server.start(function() {
    console.log("Server started at " + server.info.uri);
});
 
server.register(Inert, () => { });



server.route({
    method: 'GET',
    path: '/',
    handler: {
        file: __dirname + '/index.html'
    }
});

server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: __dirname
        }
    }
});

var dbOpts = {
    "url": "mongodb://localhost:27017/test",
    "settings": {
        "db": {
            "native_parser": false
        }
    }
};


server.register({
    register: require('hapi-mongodb'),
    options: dbOpts
}, function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

server.route({
    method : "POST",
    path : "/addRecipe",
    handler : function (request, reply){
        var recipe = request.payload.recipe;
        
        var db = request.server.plugins['hapi-mongodb'].db;

        var ObjectID = request.server.plugins['hapi-mongodb'].ObjectID;

        var id =   db.collection('recipe').insert(recipe, { w: 1 }, function (err, result){
            if (err) return reply(Boom.internal('Internal MongoDB error', err));
            console.log("result is ::    "+result["ops"]);
            console.log("result data ::    "+result);
            reply(JSON.stringify(result.ops[0]));
        });

        console.log(id);


    }
    });


server.route({
    method : "GET",
    path: "/getRecipe",
    handler : function(request, reply) {
        var db = request.server.plugins['hapi-mongodb'].db;
        var collection = db.collection('recipe');
        collection.find().toArray(function (err, items) {
             reply(JSON.stringify(items));

        });
    }
    });


 
