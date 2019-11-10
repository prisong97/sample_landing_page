var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var app = express();

//configuration
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'join_us'
	
});

// Find count of users in db + send it as a response

app.get('/', function(req, res){
	var q = "Select count(*) as count from users"
	connection.query(q, function(error, results){
		if (error) throw error; 
		var count = results[0].count;
		//res.send("There are " + result + " users!");
		res.render('home', {count: count});
	});
})

app.post('/register', function(req, res){
	
	var person = {email: req.body.email};
	// var q = 'insert into users (email) values (' + req.body.email + ')';
	connection.query('insert into users set ?', person, function(error, results){
		console.log(error);
		console.log(results);
		// if want to redirect to homepage
		res.redirect('/');
		//res.send('Thanks for joining our waitlist!');
	});
});

app.listen(3000, function(){
	console.log('Server running on 3000!');
})
