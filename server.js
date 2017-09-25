var fs = require('fs');
var data = fs.readFileSync('words.json');
var words = JSON.parse(data);
console.log(words);

/*var words = {
	"rainbow": 5,
	"unicorn": 3,
	"doom": -3,
	"gloom": 5
}*/

//console.log("server is running");

var express = require ('express');

var app = express();

var server = app.listen(3000, listening);

function listening() {
	console.log('listening...');
}

/*localhost:3000*/

app.use(express.static('public'));

//request from a route
//-- first -- app.get('/flower', sendFlower);
//app.get('/search/:flower/:num', sendFlower);
app.get('/add/:word/:score?', addWord);

function addWord(request, response) {
	var data = request.params;
	var word = data.word;
	var score = Number(data.score);
	var reply;
	if(!score) {
		var reply = {
			msg: "Score is required."
		}
		response.send(reply);
	} 
	else {
		words[word] = score;
		var data = JSON.stringify(words, null, 2);
		fs.writeFile('words.json', data, finished);

		function finished(err) {
			console.log('all set.');
			reply = {
				word: word,
				score: score,
				status: "success"
			}
			response.send(reply);
		}
	}

	
}

/*function sendFlower(request, response) {
	var data = request.params;
	var num = data.num;
	var reply = "";
	for (var i = 0; i < num; i++) {
		reply += "I love " + data.flower + " too" + "</br>";
	}

	//response.send("I love "+ data.flower +" too");
	response.send(reply);
}*/

app.get('/all', sendAll);

function sendAll(request, response) {
	response.send(words);
}

app.get('/search/:word/', searchWord);

function searchWord(request, response) {
	var word = request.params.word;
	var reply;
	if(words[word]) {
		reply = {
			status: "found",
			word: word,
			score: words[word]
		}
	} else {
		reply = {
			status: "not found",
			word: word
		}
	}
	response.send(reply);
}