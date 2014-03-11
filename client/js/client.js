Meteor.subscribe("lines", {channel: window.location.pathname});

Template.toolbar.events({
  "click #reset": reset,
  /*"keypress #colorCode": function(event) {
  	if(event.which == 13 && $('#colorCode').val().length == 7) {
  		event.preventDefault();
    	setColor();
    }*/
  "keyup #colorCode": setColor  
});

function reset() {
	Meteor.call('reset', window.location.pathname);
}

function setColor() {
	$('#colorCode').css('background-color', $('#colorCode').val());
}

function drawLine(line) {
	var boardContext = $('#board')[0].getContext('2d');

	boardContext.beginPath();
	boardContext.moveTo(line.start.x, line.start.y);
	boardContext.lineTo(line.end.x, line.end.y);
	boardContext.closePath();
	boardContext.strokeStyle = line.color;
	boardContext.stroke();
}

function clearBoard() {
	$('#board')[0].getContext('2d').fillRect(0, 0, $('#board').width(), $('#board').height());
}

function setUpCanvas() {
	var boardCanvas = $('#board');
	var boardContext = boardCanvas[0].getContext('2d');
	var lineStart;

	boardCanvas.attr('width', $(window).width());
	boardCanvas.attr('height', $(window).height());

	boardContext.fillStyle = '#333333';

	boardCanvas.hammer().on('dragstart', function(event) {
		lineStart = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
	});

	boardCanvas.hammer().on('drag', function(event) {
		var lineEnd = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};

		Lines.insert({channel: window.location.pathname, start: lineStart, end: lineEnd, color: $('#colorCode').val()});

		lineStart = lineEnd;
	});

	document.ontouchmove = function(event){
		event.preventDefault();
	}
}

Meteor.startup(function() {

	setUpCanvas();

	Meteor.autorun(function() {
		clearBoard();

		Lines.find({channel: window.location.pathname}).forEach(function(line) {
			drawLine(line);
		});
	});
});



