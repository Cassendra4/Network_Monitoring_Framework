/* global index */

//Express is required for creating Node.js based web apps
var express = require('express');

//Importing the required mongodb driver
var MongoClient = require('mongodb').MongoClient;

//MongoDB connection URL
var dbHost = 'mongodb://localhost:27017/test';

//Name of the collection
var myCollection = "players";

//DB Object
var dbObject;
//
var upperLim;
var lowerLim;
var upper=190;
  var lower=2;
var bodyParser =  require("body-parser");

//Connecting to the Mongodb instance.
//Make sure your mongodb daemon mongod is running on port 27017 on localhost
MongoClient.connect(dbHost, function(err, db){
  if ( err ) throw err;
  dbObject = db;
});
var url = require('url');
var app = express();
//var multer = require('multer');
app.set('port', 3300);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(multer());

var qs = require('querystring');
//Starting up the server on the port: 3300
app.listen(app.get('port'), function(){
  console.log('Server up: http://localhost:' + app.get('port'));
  
});
// routes will go here
app.post("/", function(req, res) {
       console.log(req.body);
  res.json(req.body);
        res.end("done");
});


function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  //Query Mongodb and iterate through the results
   //console.log(upperLim);
  dbObject.collection(myCollection).find({"runs": {$lt: 150}}).toArray(
    function(err, docs){
      var playerArr = [];
      var runsArr =[];
      //var playerId =[];
      for(index in docs){
        var doc = docs[index];
       //category array
         var player = doc.player;
      //series 1 values array
      var runs = doc.runs;
      
      playerArr.push({"label": player});
      runsArr.push({"value" : runs});
     
      }
      var dataset = [
      {
        "seriesname" : "Runs",
        "data" : runsArr
      }
    ];

    var result = {
      "dataset" : dataset,
      "categories" : playerArr
  
    };
      responseObj.json(result);
    }
            
  );
 
   }
//NPM Module to integrate Handlerbars UI template engine with Express
var exphbs  = require('express-handlebars');

//Declaring Express to use Handlerbars template engine with main.handlebars as
//the default layout
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Defining middleware to serve static files
app.use('/public', express.static('public'));
app.get("/scores", function(req, res){
  getData(res);
});
app.get("/", function(req, res){
  res.render("chart");
});

