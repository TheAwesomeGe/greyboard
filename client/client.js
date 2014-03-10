Meteor.startup(function() {
	var boardCanvas = $('#board');
	var boardContext = boardCanvas[0].getContext('2d');
	var lineStart;

	boardCanvas.attr('width', $(window).width());
	boardCanvas.attr('height', $(window).height());

	boardContext.strokeStyle = '#FFFFFF';
	boardContext.fillStyle = '#333333';

	boardCanvas.hammer().on('dragstart', function(event) {
		lineStart = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};
	});

	boardCanvas.hammer().on('drag', function(event) {
		var lineEnd = {x: parseInt(event.gesture.center.pageX), y: parseInt(event.gesture.center.pageY)};

		Lines.insert({channel: window.location.pathname, start: lineStart, end: lineEnd});

		lineStart = lineEnd;
	});

	function drawLine(line) {
		boardContext.beginPath();
		boardContext.moveTo(line.start.x, line.start.y);
		boardContext.lineTo(line.end.x, line.end.y);
		boardContext.closePath();
		boardContext.stroke();
	}

	function clearBoard() {
		boardContext.fillRect(0, 0, boardCanvas.width(), boardCanvas.height());
	}

	Meteor.autorun(function() {
		clearBoard();

		Lines.find({channel: window.location.pathname}).forEach(function(line) {
			drawLine(line);
		});
	});

	$('#reset').click(function() {
		Meteor.call('reset', window.location.pathname);
	});

	document.ontouchmove = function(event){
		event.preventDefault();
	}
});



