function setup() {
	drawData();
	var button = $("#submit");
	button.on("click", submitWord)
}

function drawData() {
	$.getJSON('/all', gotData);
}

function submitWord() {
	var word = $("#word").val();
	var score = $("#score").val();
	//console.log(word,score);

	$.getJSON('add/'+ word + '/' + score, finished);

	function finished(data) {
		console.log(data);
		drawData();
	}
}

function gotData(data) {
	//console.log(data);
	$('#list li').remove();
	var keys = Object.keys(data);

	for (var i = 0; i <keys.length; i++) {
		var word = keys[i];
		var score = data[word];
		$('#list').append("<li>"+word+"</li>");
	}

	//console.log(keys);
	//console.log(Object.values(data));
}