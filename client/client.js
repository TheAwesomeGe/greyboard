Meteor.startup(function() {
	var boardCanvas = $('#board');
	var boardContext = boardCanvas[0].getContext('2d');

	boardContext.fillStyle = '#000000';
	boardContext.strokeStyle = '#FFFFFF';

	function clearBoard() {
		boardContext.fillRect(0, 0, boardCanvas.width(), boardCanvas.height());
	}

	Meteor.autorun(function() {
		clearBoard();
	});

	$('#reset').click(function() {
		Meteor.call('reset');
	});
});