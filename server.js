//Lets require/import the HTTP module
var fs = require('fs');
var express = require("express");
var app = express();
var http = require('http').Server(app);


//Lets define a port we want to listen to
var port=8080;

// static files
app.use("/js", express.static(__dirname+"/js"));
app.use("/css", express.static(__dirname+"/css"));
app.use("/pic", express.static(__dirname+"/pic"));
app.use("/emotions", express.static(__dirname+"/emotions"));
app.use("/actions", express.static(__dirname+"/actions"));
app.use("/things", express.static(__dirname+"/things"));

// http routing
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/category.html", function(req,res) {
	res.sendFile(__dirname + "/category.html");
});

app.get("/emotions.html", function(req,res) {
	res.sendFile(__dirname + "/emotions.html");
});

app.get("/actions.html", function(req,res) {
	res.sendFile(__dirname + "/actions.html");
});

app.get("/things.html", function(req,res) {
	res.sendFile(__dirname + "/things.html");
});

app.get("/sentence.html", function(req,res) {
	res.sendFile(__dirname + "/sentence.html");
});

app.get("/vocabulary.html", function(req,res) {
	res.sendFile(__dirname + "/vocabulary.html");
});

app.get("/getting", function(req,res) {
	getPeople();
	console.log("in");
});

app.post('/', function (req, res) {
  res.send('working');
});

app.post('/searchedWords', function (req, res) {
	console.log("in function");
	var username = "";
	var text = "";
	var body = "";
		req.on('data',function(chunk) {
			body += chunk.toString('utf8');
		});
		req.on('end',function() {
			console.log(body);
			username = body.substring(10,body.indexOf(',')-1);
			temp1 = body.substring(0, body.length-2);
			index = temp1.lastIndexOf('"')
			console.log(index);
			text = body.substring(index+1, temp1.length);
 			if((db.collection("people").find({name:username})).size > 0)
			{
				console.log("updating" + username);
				db.collection("people").update({"name" :username }, {$push : {words : text}});
			}
			else
			{
				console.log("inserting" + text);
				addToPeople({"name" :username, "words" : text});
			}
			res.end();
		});
});

http.listen(port, function() {
  console.log("Listening at port 8080");
});

// Mongo

var mongo = require('mongoskin');
var db = mongo.db("mongodb://dino:dino@ds059375.mongolab.com:59375/strongvoices", {native_parser:true});
//db.bind('people');
//db.people.find().toArray(function(err, items) {
//        db.close();
//});

function addToPeople (r) {
	db.collection('people').insert(r, function(err, res) { 
		if (err) throw err; 
		if (res) console.log('Added: '+r);
	} );
}

function getPeople (r) {
	//val arr = db.collection('people').find({"name":r});
	db.collection('people').find().each(function (key,val) {
		console.log(val);
	})
}


//addToPeople({"name" : "brenda", "words" : ""});

