var mongo = require('mongoskin');
var db = mongo.db("mongodb://dino:dino@ds059375.mongolab.com:59375/strongvoices", {native_parser:true});
//db.bind('people');
//db.people.find().toArray(function(err, items) {
//        db.close();
//});

function addToPeople (r) {
	db.collection('people').insert(r, function(err, res) { 
		if (err) throw err; 
		if (res) console.log('Added!');
	} );
}

function addCheck() {
	console.log("working");
	addToPeople({"name":"Brenda"});
}

addToPeople({"name":"Andrew", "insulting":true,"age":20});
addToPeople({"name":"Prachis", "insulting":false,"age":40, "alist":[1,2,3], "aNumber":4.35234, "cat":{"a":1,"b":2}});
addToPeople({"name":"Alice", "dinosaur":false,"age":30});


db.collection('people').find({"insulting":false}).toArray(function(err, result) {
    console.log('People Not Insulting!');
    console.log(result[0]);
});